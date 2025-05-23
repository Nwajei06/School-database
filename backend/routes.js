// backend/routes.js

const express = require('express');
const router = express.Router();
const pool = require('./db'); // Make sure this path is correct

// Student signup
router.post('/api/signup', async (req, res) => {
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
router.post('/api/login', async (req, res) => {
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
router.get('/api/sub-admins', async (req, res) => {
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
router.post('/api/admins/add-sub-admin', async (req, res) => {
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
router.get('/api/students', async (req, res) => {
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

module.exports = router;
