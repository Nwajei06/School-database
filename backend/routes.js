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

// In routes.js or server.js
router.post('/api/subadmin/login', async (req, res) => {

  const { name, email } = req.body;

  try {
    const [rows] = await pool.execute(
      'SELECT * FROM sub_admins WHERE name = ? AND email = ?',
      [name, email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', subadmin: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/api/results', async (req, res) => {
  const results = req.body;

  try {
    for (const result of results) {
      const { name, subject, score, grade } = result;
      await pool.execute(
        'INSERT INTO results (name, subject, score, grade) VALUES (?, ?, ?, ?)',
        [name, subject, score, grade]
      );
    }
    res.status(201).json({ message: 'Results saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to save results' });
  }
});

// Get results by student email
router.get('/api/results', async (req, res) => {
  const { email } = req.query;

  try {
    const [rows] = await pool.execute(
      'SELECT name, subject, score, grade FROM results WHERE name = (SELECT name FROM student_info WHERE email = ?)',
      [email]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch results' });
  }
});


module.exports = router;
