import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: 'localhost',
  database: process.env.DB_NAME,
  port: 5432,
});

const connectToDb = async () => {
  try {
    const db = await pool.connect();
    console.log('Connected to the database.');
    return db;
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};

export default connectToDb