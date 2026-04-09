import { Router } from 'express';
import { query } from '../config/database.js';
import { optionalAuth, requireAuth } from '../middleware/auth.js';

const router = Router();

// =============================================
// Valid event types
// =============================================
const VALID_EVENT_TYPES = [
    'page_view',
    'search',
    'platform_click',
    'redirect_confirm',
    'redirect_cancel',
    'category_click',
    'subcategory_click',
    'nav_mode_click',
    'location_set',
    'favorite_add',
    'favorite_remove',
];

// =============================================
// POST /v1/tracking/events — Receive batch events
// =============================================
router.post('/events', optionalAuth, async (req, res) => {
    try {
        const { events } = req.body;

        if (!Array.isArray(events) || events.length === 0) {
            return res.status(400).json({
                status: 'error',
                error_code: 'INVALID_PAYLOAD',
                message: 'events must be a non-empty array',
            });
        }

        // Cap at 50 events per request to prevent abuse
        if (events.length > 50) {
            return res.status(400).json({
                status: 'error',
                error_code: 'TOO_MANY_EVENTS',
                message: 'Maximum 50 events per request',
            });
        }

        const userAgent = req.headers['user-agent'] || null;
        const ipAddress = req.headers['x-forwarded-for']?.split(',')[0]?.trim()
            || req.socket?.remoteAddress
            || null;
        const userId = req.user?.id || null;

        // Build multi-row INSERT for performance
        const values = [];
        const placeholders = [];
        let paramIndex = 1;

        for (const event of events) {
            // Validate event type
            if (!event.event_type || !VALID_EVENT_TYPES.includes(event.event_type)) {
                continue; // Skip invalid events silently
            }

            if (!event.session_id) {
                continue; // Skip events without session_id
            }

            const eventData = event.event_data || {};
            const pagePath = event.page_path || null;
            const deviceType = event.device_type || null;
            const createdAt = event.timestamp || new Date().toISOString();

            values.push(
                event.session_id,
                userId,
                event.event_type,
                JSON.stringify(eventData),
                pagePath,
                deviceType,
                userAgent,
                ipAddress,
                createdAt
            );

            placeholders.push(
                `($${paramIndex}, $${paramIndex + 1}, $${paramIndex + 2}, $${paramIndex + 3}, $${paramIndex + 4}, $${paramIndex + 5}, $${paramIndex + 6}, $${paramIndex + 7}, $${paramIndex + 8})`
            );
            paramIndex += 9;
        }

        if (placeholders.length === 0) {
            return res.status(400).json({
                status: 'error',
                error_code: 'NO_VALID_EVENTS',
                message: 'No valid events found in payload',
            });
        }

        const sql = `
            INSERT INTO tracking_events 
                (session_id, user_id, event_type, event_data, page_path, device_type, user_agent, ip_address, created_at)
            VALUES ${placeholders.join(', ')}
        `;

        await query(sql, values);

        return res.status(201).json({
            status: 'ok',
            inserted: placeholders.length,
        });

    } catch (err) {
        console.error('❌ Tracking events error:', err.message);
        return res.status(500).json({
            status: 'error',
            error_code: 'INTERNAL_ERROR',
            message: 'Failed to save tracking events',
        });
    }
});

// =============================================
// GET /v1/tracking/analytics — Dashboard data
// =============================================
router.get('/analytics', requireAuth, async (req, res) => {
    try {
        const days = parseInt(req.query.days) || 7;
        const since = new Date();
        since.setDate(since.getDate() - days);

        // Run all analytics queries in parallel
        const [
            topSearches,
            topPlatforms,
            eventCounts,
            dailyTrend,
            totalSessions,
        ] = await Promise.all([
            // Top searched keywords
            query(`
                SELECT event_data->>'keyword' AS keyword, COUNT(*) AS count
                FROM tracking_events
                WHERE event_type = 'search'
                  AND created_at >= $1
                  AND event_data->>'keyword' IS NOT NULL
                GROUP BY event_data->>'keyword'
                ORDER BY count DESC
                LIMIT 20
            `, [since]),

            // Top clicked platforms
            query(`
                SELECT event_data->>'platform_name' AS platform, COUNT(*) AS count
                FROM tracking_events
                WHERE event_type = 'platform_click'
                  AND created_at >= $1
                  AND event_data->>'platform_name' IS NOT NULL
                GROUP BY event_data->>'platform_name'
                ORDER BY count DESC
                LIMIT 20
            `, [since]),

            // Event counts by type
            query(`
                SELECT event_type, COUNT(*) AS count
                FROM tracking_events
                WHERE created_at >= $1
                GROUP BY event_type
                ORDER BY count DESC
            `, [since]),

            // Daily trend
            query(`
                SELECT DATE(created_at) AS date, COUNT(*) AS count
                FROM tracking_events
                WHERE created_at >= $1
                GROUP BY DATE(created_at)
                ORDER BY date ASC
            `, [since]),

            // Unique sessions
            query(`
                SELECT COUNT(DISTINCT session_id) AS total
                FROM tracking_events
                WHERE created_at >= $1
            `, [since]),
        ]);

        return res.json({
            status: 'ok',
            period_days: days,
            data: {
                top_searches: topSearches.rows,
                top_platforms: topPlatforms.rows,
                event_counts: eventCounts.rows,
                daily_trend: dailyTrend.rows,
                total_sessions: parseInt(totalSessions.rows[0]?.total || 0),
            },
        });

    } catch (err) {
        console.error('❌ Tracking analytics error:', err.message);
        return res.status(500).json({
            status: 'error',
            error_code: 'INTERNAL_ERROR',
            message: 'Failed to fetch analytics',
        });
    }
});

export default router;
