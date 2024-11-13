import express from 'express';
import { getDb } from '../db/db.js';

export const router = express.Router();

// Get all posts
router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const posts = await db.all(`
      SELECT posts.*, users.name as authorName 
      FROM posts 
      JOIN users ON posts.userId = users.id
    `);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

// Get post by ID
router.get('/:id', async (req, res) => {
  try {
    const db = await getDb();
    const post = await db.get(`
      SELECT posts.*, users.name as authorName 
      FROM posts 
      JOIN users ON posts.userId = users.id 
      WHERE posts.id = ?
    `, req.params.id);
    
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching post' });
  }
});

// Create new post
router.post('/', async (req, res) => {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId) {
    return res.status(400).json({ error: 'Title, content and userId are required' });
  }

  try {
    const db = await getDb();
    const user = await db.get('SELECT id FROM users WHERE id = ?', userId);
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const result = await db.run(
      'INSERT INTO posts (title, content, userId) VALUES (?, ?, ?)',
      [title, content, userId]
    );
    
    const post = await db.get(`
      SELECT posts.*, users.name as authorName 
      FROM posts 
      JOIN users ON posts.userId = users.id 
      WHERE posts.id = ?
    `, result.lastID);
    
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
});