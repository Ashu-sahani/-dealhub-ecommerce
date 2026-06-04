const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected');
});

// Product Listing with Filters + Pagination
app.get('/api/products', (req, res) => {
  const { search, category, minPrice, maxPrice, page = 1, limit = 20 } = req.query;
  const offset = (page - 1) * limit;

  let sql = `SELECT p.*, c.name as categoryName, s.name as sellerName 
             FROM products p 
             LEFT JOIN categories c ON p.categoryId = c.id 
             LEFT JOIN sellers s ON p.sellerId = s.id WHERE 1=1`;
  const params = [];

  if (search) { sql += ' AND p.name LIKE ?'; params.push(`%${search}%`); }
  if (category) { sql += ' AND p.categoryId = ?'; params.push(category); }
  if (minPrice) { sql += ' AND p.price >= ?'; params.push(minPrice); }
  if (maxPrice) { sql += ' AND p.price <= ?'; params.push(maxPrice); }

  const countSql = sql.replace('SELECT p.*, c.name as categoryName, s.name as sellerName', 'SELECT COUNT(*) as total');

  sql += ' ORDER BY p.price LIMIT ? OFFSET ?';
  params.push(+limit, offset);

  db.query(countSql, params.slice(0, -2), (err, count) => {
    db.query(sql, params, (err, results) => {
      if (err) return res.status(500).json({error: err.message});
      res.json({
        products: results,
        pagination: { total: count[0].total, page: +page, pages: Math.ceil(count[0].total / limit) }
      });
    });
  });
});

app.listen(process.env.PORT || 5000, () => console.log('Server running on port 5000'));