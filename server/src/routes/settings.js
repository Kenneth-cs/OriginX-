import express from 'express';
import { getDb } from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all settings (public)
router.get('/', async (req, res) => {
  try {
    const db = await getDb();
    const rows = await db.all('SELECT * FROM settings');
    
    // Convert to a dictionary format { key: JSON.parse(value) }
    const settings = {};
    rows.forEach(row => {
      try {
        settings[row.key] = JSON.parse(row.value);
      } catch (e) {
        settings[row.key] = row.value; // fallback to string if not valid JSON
      }
    });
    
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific setting block (public)
router.get('/:key', async (req, res) => {
  try {
    const db = await getDb();
    const row = await db.get('SELECT * FROM settings WHERE key = ?', [req.params.key]);
    
    if (!row) {
      return res.status(404).json({ error: 'Setting not found' });
    }

    let val;
    try {
      val = JSON.parse(row.value);
    } catch (e) {
      val = row.value;
    }

    res.json({ [req.params.key]: val });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create or Update a setting (requires auth)
router.put('/:key', authenticate, async (req, res) => {
  try {
    const { key } = req.params;
    const value = req.body.value; // Expecting a JSON object or string
    const stringValue = typeof value === 'object' ? JSON.stringify(value) : value;
    
    const db = await getDb();
    const now = new Date().toISOString();

    // Upsert
    await db.run(
      `INSERT INTO settings (key, value, updated_at) 
       VALUES (?, ?, ?) 
       ON CONFLICT(key) DO UPDATE SET value=excluded.value, updated_at=excluded.updated_at`,
      [key, stringValue, now]
    );

    res.json({ message: 'Setting saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
