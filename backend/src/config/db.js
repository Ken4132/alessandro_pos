const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pos_ia',
  password: 'postgres1',
  port: 5432,
});

module.exports = { pool };