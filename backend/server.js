const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Your db.js file

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Replaces body-parser

// Student signup
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const [result] = await pool.execute(
      'INSERT INTO student_info (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    res.status(201).json({ message: 'User created', name, email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Student login
app.post('/api/login', async (req, res) => {
  const { password } = req.body;

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM student_info WHERE password = ?',
      [password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all sub-admins
app.get('/api/sub-admins', async (req, res) => {
  try {
    const [admins] = await pool.execute(
      'SELECT id, name, email, role, created_at FROM sub_admins'
    );
    res.json(admins);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch sub-admins' });
  }
});

// Add new sub-admin
app.post('/api/admins/add-sub-admin', async (req, res) => {
  const { name, email, role, password } = req.body;
  try {
    const [result] = await pool.execute(
      'INSERT INTO sub_admins (name, email, role, password) VALUES (?, ?, ?, ?)',
      [name, email, role, password]
    );
    res.status(201).json({ message: 'Sub-admin added' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add sub-admin' });
  }
});

// Get all students
app.get('/api/students', async (req, res) => {
  try {
    const [students] = await pool.execute(
      'SELECT id, name, email FROM student_info'
    );
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch students' });
  }
});

// Post student result
app.post('/api/results', async (req, res) => {
  const { name, subject, score, grade } = req.body;

  if (!name || !subject || score == null || !grade) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const sql = 'INSERT INTO student_results (name, subject, score, grade) VALUES (?, ?, ?, ?)';
    await pool.execute(sql, [name, subject, score, grade]);  // ✅ FIXED: use `pool.execute` instead of `db.query`
    res.status(201).json({ message: 'Result saved' });
  } catch (err) {
    console.error('DB ERROR:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
