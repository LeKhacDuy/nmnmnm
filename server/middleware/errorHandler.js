/**
 * Global error handler middleware.
 */
export function errorHandler(err, req, res, _next) {
    console.error('❌ Error:', err.message);
    if (process.env.NODE_ENV !== 'production') {
        console.error(err.stack);
    }

    const status = err.statusCode || 500;
    const message = status === 500 ? 'Internal server error' : err.message;

    res.status(status).json({
        status: 'error',
        error_code: err.code || 'INTERNAL_ERROR',
        message,
    });
}

/**
 * 404 handler.
 */
export function notFoundHandler(req, res) {
    res.status(404).json({
        status: 'error',
        error_code: 'NOT_FOUND',
        message: `Route ${req.method} ${req.path} not found`,
    });
}
