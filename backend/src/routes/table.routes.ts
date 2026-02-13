import { Router } from 'express';
import { tables } from '../data/mockData';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// Public: Get available tables
router.get('/available', (req, res) => {
  res.json(tables.filter(t => t.isAvailable));
});

// Admin: CRUD
router.get('/', authMiddleware, (req, res) => {
  res.json(tables);
});

router.post('/', authMiddleware, (req, res) => {
  const newTable = { ...req.body };
  tables.push(newTable);
  res.status(201).json(newTable);
});

router.put('/:number', authMiddleware, (req, res) => {
  const { number } = req.params;
  const index = tables.findIndex(t => t.number === number);
  if (index !== -1) {
    tables[index] = { ...tables[index], ...req.body };
    res.json(tables[index]);
  } else {
    res.status(404).json({ message: 'Table not found' });
  }
});

export default router;
