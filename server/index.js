import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import { testConnection } from './config/database.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import healthRoutes from './routes/health.js';
import trackingRoutes from './routes/tracking.js';

const app = express();
const PORT = process.env.PORT || 3001;

// =============================================
// MIDDLEWARE
// =============================================

// Security headers
app.use(helmet());

// CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing
app.use(express.json({ limit: '1mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,   // 15 minutes
    max: 100,                     // 100 requests per window
    message: {
        status: 'error',
        error_code: 'RATE_LIMITED',
        message: 'Quá nhiều yêu cầu, vui lòng thử lại sau',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/v1/', limiter);

// Stricter rate limit for auth endpoints
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: {
        status: 'error',
        error_code: 'RATE_LIMITED',
        message: 'Quá nhiều lần thử, vui lòng đợi 15 phút',
    },
});
app.use('/v1/auth/login', authLimiter);
app.use('/v1/auth/register', authLimiter);

// =============================================
// ROUTES
// =============================================
app.use('/v1/auth', authRoutes);
app.use('/v1/health', healthRoutes);
app.use('/v1/tracking', trackingRoutes);

// Root
app.get('/', (_req, res) => {
    res.json({
        name: 'Near Me API',
        version: '1.0.0',
        description: 'Behavior Decision System',
        docs: '/v1/health',
    });
});

// =============================================
// ERROR HANDLING
// =============================================
app.use(notFoundHandler);
app.use(errorHandler);

// =============================================
// START SERVER
// =============================================
async function start() {
    console.log('🚀 Starting Near Me API Server...');
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);

    // Test DB connection
    const dbOk = await testConnection();
    if (!dbOk) {
        console.error('⚠️  Database not available. Server starting anyway...');
    }

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`✅ Server running on http://localhost:${PORT}`);
        console.log(`   Auth:     POST /v1/auth/register, /v1/auth/login, /v1/auth/google`);
        console.log(`   Health:   GET  /v1/health`);
        console.log(`   Tracking: POST /v1/tracking/events, GET /v1/tracking/analytics`);
    });
}

start().catch(console.error);

export default app;
