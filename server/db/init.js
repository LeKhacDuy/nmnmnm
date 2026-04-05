import 'dotenv/config';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import pg from 'pg';

const __dirname = dirname(fileURLToPath(import.meta.url));
const { Client } = pg;

async function initDB() {
    const client = new Client({
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        database: process.env.DB_NAME || 'nearme',
        user: process.env.DB_USER || 'nearme',
        password: process.env.DB_PASSWORD || 'nearme_secret',
    });

    try {
        await client.connect();
        console.log('✅ Connected to PostgreSQL');

        // Read and execute schema
        const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf-8');
        await client.query(schema);
        console.log('✅ Schema created successfully');

        // Insert default zone if not exists
        const zoneCheck = await client.query('SELECT COUNT(*) FROM zones');
        if (parseInt(zoneCheck.rows[0].count) === 0) {
            await client.query(
                `INSERT INTO zones (name, center_lat, center_lng, radius_km, active) 
                 VALUES ('Hồ Con Rùa — Quận 1', 10.7810, 106.6952, 1.2, true)`
            );
            console.log('✅ Default zone (Hồ Con Rùa) created');
        }

        console.log('🎉 Database initialization complete!');
    } catch (err) {
        console.error('❌ Database initialization failed:', err.message);
        process.exit(1);
    } finally {
        await client.end();
    }
}

initDB();
