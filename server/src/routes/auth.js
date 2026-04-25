import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'originx-secret-key-123';
// Hardcoded admin password for simplicity. In production, use env var or hashed db password
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'originx2026';

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  // Simple check
  if (username === 'admin' && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username: 'admin', role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { username: 'admin', role: 'admin' } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

export default router;
