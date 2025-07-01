const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../db');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Tasks');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Create a task
router.post('/', async (req, res) => {
  const { title, status } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('title', sql.NVarChar, title)
      .input('status', sql.NVarChar, status)
      .query('INSERT INTO Tasks (title, status) VALUES (@title, @status)');
    res.send('Task added!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  const { title, status } = req.body;
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, req.params.id)
      .input('title', sql.NVarChar, title)
      .input('status', sql.NVarChar, status)
      .query('UPDATE Tasks SET title = @title, status = @status WHERE id = @id');
    res.send('Task updated!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, req.params.id)
      .query('DELETE FROM Tasks WHERE id = @id');
    res.send('Task deleted!');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
