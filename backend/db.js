// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'webcourse.cs.nuim.ie',
  user: 'p250126',         // from your phpMyAdmin login
  password: 'OhV9vohSeequeuya',     // from your phpMyAdmin login
  database: 'cs230_p250126'
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

module.exports = db;
