import { getDb } from './db.js';

async function initDb() {
  try {
    const db = await getDb();

    // Create tables
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE
      )
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        userId INTEGER NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id)
      )
    `);

    // Insert initial data
    await db.run(`
      INSERT OR IGNORE INTO users (id, name, email) 
      VALUES (1, 'John Doe', 'john@example.com'),
             (2, 'Jane Smith', 'jane@example.com')
    `);

    await db.run(`
      INSERT OR IGNORE INTO posts (id, title, content, userId) 
      VALUES (1, 'First Post', 'Hello World!', 1),
             (2, 'Express.js', 'Express is awesome!', 2)
    `);

    console.log('Database initialized successfully!');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

initDb();