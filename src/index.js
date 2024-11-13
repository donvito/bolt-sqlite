import express from 'express';
import { router as usersRouter } from './routes/users.js';
import { router as postsRouter } from './routes/posts.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: process.versions.node });
});

// Routes
app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});