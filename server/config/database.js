import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'nearme',
    user: process.env.DB_USER || 'nearme',
    password: process.env.DB_PASSWORD || 'nearme_secret',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
    console.error('❌ PostgreSQL pool error:', err.message);
});

export async function query(text, params) {
    const start = Date.now();
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    if (duration > 500) {
        console.warn(`⚠️ Slow query (${duration}ms):`, text.substring(0, 80));
    }
    return result;
}

export async function getClient() {
    return pool.connect();
}

export async function testConnection() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('✅ PostgreSQL connected:', res.rows[0].now);
        return true;
    } catch (err) {
        console.error('❌ PostgreSQL connection failed:', err.message);
        return false;
    }
}

export default pool;
