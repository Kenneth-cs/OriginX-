import express from 'express';
import { getDb } from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all news (public)
router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    // Default to only return published news for public API
    // If query has ?all=true, return all (requires auth, handled below or inside if needed)
    // For simplicity, we just return all, or filter by status
    const status = req.query.status;
    let query = 'SELECT id, title, summary, cover_image, category, status, publish_date, created_at, updated_at FROM news';
    let params = [];

    if (status) {
      query += ' WHERE status = ?';
      params.push(status);
    }
    
    query += ' ORDER BY publish_date DESC';
    
    const rows = await db.all(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single news article (public)
router.get('/:id', async (req, res) => {
  try {
    const db = await getDb();
    const row = await db.get('SELECT * FROM news WHERE id = ?', [req.params.id]);
    if (!row) {
      return res.status(404).json({ error: 'News not found' });
    }
    res.json(row);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create news (requires auth)
router.post('/', authenticate, async (req, res) => {
  try {
    const { title, summary, content, cover_image, category, status, publish_date } = req.body;
    const db = await getDb();
    
    const now = new Date().toISOString();
    const pDate = publish_date || now;
    const stat = status || 'draft';

    const result = await db.run(
      `INSERT INTO news (title, summary, content, cover_image, category, status, publish_date, created_at, updated_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, summary, content, cover_image, category, stat, pDate, now, now]
    );

    res.status(201).json({ id: result.lastID, message: 'News created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update news (requires auth)
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { title, summary, content, cover_image, category, status, publish_date } = req.body;
    const db = await getDb();
    
    const now = new Date().toISOString();

    const result = await db.run(
      `UPDATE news SET 
        title = COALESCE(?, title),
        summary = COALESCE(?, summary),
        content = COALESCE(?, content),
        cover_image = COALESCE(?, cover_image),
        category = COALESCE(?, category),
        status = COALESCE(?, status),
        publish_date = COALESCE(?, publish_date),
        updated_at = ?
       WHERE id = ?`,
      [title, summary, content, cover_image, category, status, publish_date, now, req.params.id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: 'News not found' });
    }

    res.json({ message: 'News updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete news (requires auth)
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const db = await getDb();
    const result = await db.run('DELETE FROM news WHERE id = ?', [req.params.id]);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'News not found' });
    }

    res.json({ message: 'News deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
