import { Router } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { query } from '../config/database.js';
import { generateAccessToken, generateRefreshToken, requireAuth, JWT_SECRET } from '../middleware/auth.js';
import jwt from 'jsonwebtoken';

const router = Router();
const SALT_ROUNDS = 12;

// =============================================
// POST /v1/auth/register — Đăng ký bằng email
// =============================================
router.post('/register', async (req, res, next) => {
    try {
        const { email, password, display_name } = req.body;

        // Validate
        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                error_code: 'MISSING_FIELDS',
                message: 'Email và mật khẩu là bắt buộc',
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                status: 'error',
                error_code: 'WEAK_PASSWORD',
                message: 'Mật khẩu phải có ít nhất 6 ký tự',
            });
        }

        // Check email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 'error',
                error_code: 'INVALID_EMAIL',
                message: 'Email không hợp lệ',
            });
        }

        // Check if email already exists
        const existing = await query('SELECT id FROM users WHERE email = $1', [email.toLowerCase()]);
        if (existing.rows.length > 0) {
            return res.status(409).json({
                status: 'error',
                error_code: 'EMAIL_EXISTS',
                message: 'Email đã được sử dụng',
            });
        }

        // Hash password
        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        // Insert user
        const result = await query(
            `INSERT INTO users (email, password_hash, display_name, provider) 
             VALUES ($1, $2, $3, 'email') 
             RETURNING id, email, display_name, photo_url, phone, provider, created_at`,
            [email.toLowerCase(), passwordHash, display_name || null]
        );

        const user = result.rows[0];

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store refresh token hash
        const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
        await query(
            `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, NOW() + INTERVAL '30 days')`,
            [user.id, tokenHash]
        );

        res.status(201).json({
            status: 'ok',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    display_name: user.display_name,
                    photo_url: user.photo_url,
                    phone: user.phone,
                    provider: user.provider,
                },
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_in: 3600,
            },
        });
    } catch (err) {
        next(err);
    }
});

// =============================================
// POST /v1/auth/login — Đăng nhập bằng email
// =============================================
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                error_code: 'MISSING_FIELDS',
                message: 'Email và mật khẩu là bắt buộc',
            });
        }

        // Find user
        const result = await query(
            `SELECT id, email, password_hash, display_name, photo_url, phone, provider, is_active
             FROM users WHERE email = $1`,
            [email.toLowerCase()]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({
                status: 'error',
                error_code: 'INVALID_CREDENTIALS',
                message: 'Email hoặc mật khẩu không đúng',
            });
        }

        const user = result.rows[0];

        // Check if user is active
        if (!user.is_active) {
            return res.status(403).json({
                status: 'error',
                error_code: 'ACCOUNT_DISABLED',
                message: 'Tài khoản đã bị vô hiệu hóa',
            });
        }

        // Check if user registered with Google only
        if (!user.password_hash) {
            return res.status(400).json({
                status: 'error',
                error_code: 'GOOGLE_ACCOUNT',
                message: 'Tài khoản này đăng ký bằng Google. Vui lòng đăng nhập bằng Google.',
            });
        }

        // Verify password
        const isValid = await bcrypt.compare(password, user.password_hash);
        if (!isValid) {
            return res.status(401).json({
                status: 'error',
                error_code: 'INVALID_CREDENTIALS',
                message: 'Email hoặc mật khẩu không đúng',
            });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // Store refresh token
        const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
        await query(
            `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, NOW() + INTERVAL '30 days')`,
            [user.id, tokenHash]
        );

        // Update last login
        await query('UPDATE users SET updated_at = NOW() WHERE id = $1', [user.id]);

        res.json({
            status: 'ok',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    display_name: user.display_name,
                    photo_url: user.photo_url,
                    phone: user.phone,
                    provider: user.provider,
                },
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_in: 3600,
            },
        });
    } catch (err) {
        next(err);
    }
});

// =============================================
// POST /v1/auth/google — Đăng nhập bằng Google
// (Frontend gửi Firebase ID token, BE verify và tạo/đăng nhập user)
// =============================================
router.post('/google', async (req, res, next) => {
    try {
        const { firebase_uid, email, display_name, photo_url } = req.body;

        if (!email || !firebase_uid) {
            return res.status(400).json({
                status: 'error',
                error_code: 'MISSING_FIELDS',
                message: 'Email và Firebase UID là bắt buộc',
            });
        }

        // Check if user exists by firebase_uid or email
        let result = await query(
            'SELECT id, email, display_name, photo_url, phone, provider, is_active FROM users WHERE firebase_uid = $1 OR email = $2',
            [firebase_uid, email.toLowerCase()]
        );

        let user;

        if (result.rows.length > 0) {
            user = result.rows[0];

            if (!user.is_active) {
                return res.status(403).json({
                    status: 'error',
                    error_code: 'ACCOUNT_DISABLED',
                    message: 'Tài khoản đã bị vô hiệu hóa',
                });
            }

            // Update firebase_uid and profile if needed
            await query(
                `UPDATE users SET 
                    firebase_uid = COALESCE(firebase_uid, $1),
                    display_name = COALESCE(display_name, $2),
                    photo_url = COALESCE(photo_url, $3),
                    updated_at = NOW()
                 WHERE id = $4`,
                [firebase_uid, display_name, photo_url, user.id]
            );

            // Refresh user data
            const refreshed = await query(
                'SELECT id, email, display_name, photo_url, phone, provider FROM users WHERE id = $1',
                [user.id]
            );
            user = refreshed.rows[0];
        } else {
            // Create new user
            const insertResult = await query(
                `INSERT INTO users (email, display_name, photo_url, provider, firebase_uid) 
                 VALUES ($1, $2, $3, 'google', $4) 
                 RETURNING id, email, display_name, photo_url, phone, provider`,
                [email.toLowerCase(), display_name, photo_url, firebase_uid]
            );
            user = insertResult.rows[0];
        }

        // Generate tokens
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        const tokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
        await query(
            `INSERT INTO refresh_tokens (user_id, token_hash, expires_at) VALUES ($1, $2, NOW() + INTERVAL '30 days')`,
            [user.id, tokenHash]
        );

        res.json({
            status: 'ok',
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    display_name: user.display_name,
                    photo_url: user.photo_url,
                    phone: user.phone,
                    provider: user.provider,
                },
                access_token: accessToken,
                refresh_token: refreshToken,
                expires_in: 3600,
            },
        });
    } catch (err) {
        next(err);
    }
});

// =============================================
// POST /v1/auth/refresh — Refresh access token
// =============================================
router.post('/refresh', async (req, res, next) => {
    try {
        const { refresh_token } = req.body;

        if (!refresh_token) {
            return res.status(400).json({
                status: 'error',
                error_code: 'MISSING_TOKEN',
                message: 'Refresh token là bắt buộc',
            });
        }

        // Verify refresh token
        let decoded;
        try {
            decoded = jwt.verify(refresh_token, JWT_SECRET);
        } catch {
            return res.status(401).json({
                status: 'error',
                error_code: 'INVALID_REFRESH_TOKEN',
                message: 'Refresh token không hợp lệ hoặc đã hết hạn',
            });
        }

        if (decoded.type !== 'refresh') {
            return res.status(401).json({
                status: 'error',
                error_code: 'INVALID_TOKEN_TYPE',
                message: 'Token type không hợp lệ',
            });
        }

        // Check if refresh token exists in DB
        const tokenHash = crypto.createHash('sha256').update(refresh_token).digest('hex');
        const tokenResult = await query(
            'SELECT id FROM refresh_tokens WHERE user_id = $1 AND token_hash = $2 AND expires_at > NOW()',
            [decoded.id, tokenHash]
        );

        if (tokenResult.rows.length === 0) {
            return res.status(401).json({
                status: 'error',
                error_code: 'TOKEN_REVOKED',
                message: 'Token đã bị thu hồi',
            });
        }

        // Get user
        const userResult = await query(
            'SELECT id, email, display_name, photo_url, phone, provider FROM users WHERE id = $1 AND is_active = true',
            [decoded.id]
        );

        if (userResult.rows.length === 0) {
            return res.status(401).json({
                status: 'error',
                error_code: 'USER_NOT_FOUND',
                message: 'Người dùng không tồn tại',
            });
        }

        const user = userResult.rows[0];
        const newAccessToken = generateAccessToken(user);

        res.json({
            status: 'ok',
            data: {
                access_token: newAccessToken,
                expires_in: 3600,
            },
        });
    } catch (err) {
        next(err);
    }
});

// =============================================
// POST /v1/auth/logout — Đăng xuất (revoke refresh token)
// =============================================
router.post('/logout', requireAuth, async (req, res, next) => {
    try {
        const { refresh_token } = req.body;

        if (refresh_token) {
            const tokenHash = crypto.createHash('sha256').update(refresh_token).digest('hex');
            await query(
                'DELETE FROM refresh_tokens WHERE user_id = $1 AND token_hash = $2',
                [req.user.id, tokenHash]
            );
        } else {
            // Revoke all refresh tokens for this user
            await query('DELETE FROM refresh_tokens WHERE user_id = $1', [req.user.id]);
        }

        res.json({
            status: 'ok',
            message: 'Đăng xuất thành công',
        });
    } catch (err) {
        next(err);
    }
});

// =============================================
// GET /v1/auth/me — Lấy thông tin user hiện tại
// =============================================
router.get('/me', requireAuth, async (req, res, next) => {
    try {
        const result = await query(
            `SELECT id, email, display_name, photo_url, phone, provider, created_at
             FROM users WHERE id = $1`,
            [req.user.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                error_code: 'USER_NOT_FOUND',
                message: 'Người dùng không tồn tại',
            });
        }

        res.json({
            status: 'ok',
            data: { user: result.rows[0] },
        });
    } catch (err) {
        next(err);
    }
});

// =============================================
// PATCH /v1/auth/profile — Cập nhật profile
// =============================================
router.patch('/profile', requireAuth, async (req, res, next) => {
    try {
        const { display_name, phone, photo_url } = req.body;

        const updates = [];
        const values = [];
        let idx = 1;

        if (display_name !== undefined) {
            updates.push(`display_name = $${idx++}`);
            values.push(display_name);
        }
        if (phone !== undefined) {
            updates.push(`phone = $${idx++}`);
            values.push(phone);
        }
        if (photo_url !== undefined) {
            updates.push(`photo_url = $${idx++}`);
            values.push(photo_url);
        }

        if (updates.length === 0) {
            return res.status(400).json({
                status: 'error',
                error_code: 'NO_UPDATES',
                message: 'Không có thông tin nào để cập nhật',
            });
        }

        updates.push(`updated_at = NOW()`);
        values.push(req.user.id);

        const result = await query(
            `UPDATE users SET ${updates.join(', ')} WHERE id = $${idx} 
             RETURNING id, email, display_name, photo_url, phone, provider`,
            values
        );

        res.json({
            status: 'ok',
            data: { user: result.rows[0] },
        });
    } catch (err) {
        next(err);
    }
});

// =============================================
// POST /v1/auth/change-password — Đổi mật khẩu
// =============================================
router.post('/change-password', requireAuth, async (req, res, next) => {
    try {
        const { current_password, new_password } = req.body;

        if (!current_password || !new_password) {
            return res.status(400).json({
                status: 'error',
                error_code: 'MISSING_FIELDS',
                message: 'Mật khẩu hiện tại và mật khẩu mới là bắt buộc',
            });
        }

        if (new_password.length < 6) {
            return res.status(400).json({
                status: 'error',
                error_code: 'WEAK_PASSWORD',
                message: 'Mật khẩu mới phải có ít nhất 6 ký tự',
            });
        }

        // Get user with password
        const result = await query('SELECT password_hash FROM users WHERE id = $1', [req.user.id]);
        const user = result.rows[0];

        if (!user.password_hash) {
            return res.status(400).json({
                status: 'error',
                error_code: 'GOOGLE_ACCOUNT',
                message: 'Tài khoản Google không có mật khẩu để đổi',
            });
        }

        // Verify current password
        const isValid = await bcrypt.compare(current_password, user.password_hash);
        if (!isValid) {
            return res.status(401).json({
                status: 'error',
                error_code: 'WRONG_PASSWORD',
                message: 'Mật khẩu hiện tại không đúng',
            });
        }

        // Hash new password
        const newHash = await bcrypt.hash(new_password, SALT_ROUNDS);
        await query('UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2', [newHash, req.user.id]);

        // Revoke all refresh tokens (force re-login)
        await query('DELETE FROM refresh_tokens WHERE user_id = $1', [req.user.id]);

        res.json({
            status: 'ok',
            message: 'Đổi mật khẩu thành công. Vui lòng đăng nhập lại.',
        });
    } catch (err) {
        next(err);
    }
});

export default router;
