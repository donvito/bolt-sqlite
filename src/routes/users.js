import express from 'express';
import { getDb } from '../db/db.js';

export const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const users = await db.all('SELECT * FROM users');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const db = await getDb();
    const user = await db.get('SELECT * FROM users WHERE id = ?', req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// Create new user
router.post('/', async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const db = await getDb();
    const result = await db.run(
      'INSERT INTO users (name, email) VALUES (?, ?)',
      [name, email]
    );
    const user = await db.get('SELECT * FROM users WHERE id = ?', result.lastID);
    res.status(201).json(user);
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    const db = await getDb();
    
    // Check if user exists
    const user = await db.get('SELECT id FROM users WHERE id = ?', req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete associated posts first due to foreign key constraint
    await db.run('DELETE FROM posts WHERE userId = ?', req.params.id);
    
    // Delete the user
    await db.run('DELETE FROM users WHERE id = ?', req.params.id);
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
});