import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'nearme-dev-secret-change-in-production';

/**
 * Middleware: Verify JWT token from Authorization header.
 * Sets req.user = { id, email, provider }
 */
export function requireAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            status: 'error',
            error_code: 'UNAUTHORIZED',
            message: 'Missing or invalid authorization header',
        });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            provider: decoded.provider,
        };
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                status: 'error',
                error_code: 'TOKEN_EXPIRED',
                message: 'Token expired. Please refresh.',
            });
        }
        return res.status(401).json({
            status: 'error',
            error_code: 'INVALID_TOKEN',
            message: 'Invalid token',
        });
    }
}

/**
 * Optional auth — sets req.user if token present, otherwise continues.
 */
export function optionalAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.user = null;
        return next();
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = {
            id: decoded.id,
            email: decoded.email,
            provider: decoded.provider,
        };
    } catch {
        req.user = null;
    }

    next();
}

/**
 * Generate access token (short-lived)
 */
export function generateAccessToken(user) {
    return jwt.sign(
        { id: user.id, email: user.email, provider: user.provider },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
}

/**
 * Generate refresh token (long-lived)
 */
export function generateRefreshToken(user) {
    return jwt.sign(
        { id: user.id, type: 'refresh' },
        JWT_SECRET,
        { expiresIn: '30d' }
    );
}

export { JWT_SECRET };
