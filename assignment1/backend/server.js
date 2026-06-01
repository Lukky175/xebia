const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'inventory',
  password: process.env.DB_PASSWORD || 'password',
  port: 5432,
});

// Create product
app.post('/api/products', async (req, res) => {
  try {
    const { name, description, quantity, price } = req.body;
    const newProduct = await pool.query(
      'INSERT INTO products (name, description, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, description, quantity, price]
    );
    res.status(201).json(newProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Read all products
app.get('/api/products', async (req, res) => {
  try {
    const allProducts = await pool.query('SELECT * FROM products ORDER BY id ASC');
    res.json(allProducts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Read single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (product.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(product.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, quantity, price } = req.body;
    const updateProduct = await pool.query(
      'UPDATE products SET name = $1, description = $2, quantity = $3, price = $4 WHERE id = $5 RETURNING *',
      [name, description, quantity, price, id]
    );
    if (updateProduct.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json(updateProduct.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await pool.query('DELETE FROM products WHERE id = $1 RETURNING *', [id]);
    if (deleteProduct.rows.length === 0) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
