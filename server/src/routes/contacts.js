import express from 'express';
import { getDb } from '../db.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Submit contact form (Public)
router.post('/', async (req, res) => {
  try {
    const { name, company, contact_info, requirement } = req.body;
    
    if (!name || !contact_info || !requirement) {
      return res.status(400).json({ error: '请填写必填项' });
    }

    const db = await getDb();
    const now = new Date().toISOString();

    const result = await db.run(
      `INSERT INTO contacts (name, company, contact_info, requirement, status, created_at) 
       VALUES (?, ?, ?, ?, 'unread', ?)`,
      [name, company || '', contact_info, requirement, now]
    );

    res.status(201).json({ message: '需求提交成功！我们会尽快联系您。' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all contacts (Admin only)
router.get('/', authenticate, async (req, res) => {
  try {
    const db = await getDb();
    const rows = await db.all('SELECT * FROM contacts ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Mark contact as read (Admin only)
router.put('/:id/read', authenticate, async (req, res) => {
  try {
    const db = await getDb();
    await db.run('UPDATE contacts SET status = "read" WHERE id = ?', [req.params.id]);
    res.json({ message: 'Marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
