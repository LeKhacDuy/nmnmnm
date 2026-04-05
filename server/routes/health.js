import { Router } from 'express';
import { testConnection } from '../config/database.js';
import redis from '../config/redis.js';

const router = Router();

// GET /v1/health
router.get('/', async (_req, res) => {
    const dbOk = await testConnection().catch(() => false);

    let redisOk = false;
    try {
        await redis.ping();
        redisOk = true;
    } catch { /* ignore */ }

    const allOk = dbOk && redisOk;

    res.status(allOk ? 200 : 503).json({
        status: allOk ? 'ok' : 'degraded',
        timestamp: new Date().toISOString(),
        services: {
            database: dbOk ? 'connected' : 'disconnected',
            redis: redisOk ? 'connected' : 'disconnected',
        },
    });
});

export default router;
