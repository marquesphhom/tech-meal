import { Router } from 'express';
import jwt from 'jsonwebtoken';
import { users } from '../data/mockData';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Mock authentication
  const user = users.find(u => u.username === username);
  
  if (user && password === 'admin123') { // Hardcoded password for mock
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  }

  res.status(401).json({ message: 'Invalid credentials' });
});

export default router;
