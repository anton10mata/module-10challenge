const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'company_db',
    password: 'leonel',
    port: 5432,
});

module.exports = pool;
