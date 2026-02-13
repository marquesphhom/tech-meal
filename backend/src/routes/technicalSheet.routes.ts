import { Router } from 'express';
import { technicalSheets } from '../data/mockData';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', authMiddleware, (req, res) => {
  res.json(technicalSheets);
});

router.post('/', authMiddleware, (req, res) => {
  const newSheet = { 
    ...req.body, 
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  technicalSheets.push(newSheet);
  res.status(201).json(newSheet);
});

router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const index = technicalSheets.findIndex(s => s.id === id);
  if (index !== -1) {
    technicalSheets[index] = { 
      ...technicalSheets[index], 
      ...req.body, 
      updatedAt: new Date().toISOString() 
    };
    res.json(technicalSheets[index]);
  } else {
    res.status(404).json({ message: 'Technical sheet not found' });
  }
});

router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const index = technicalSheets.findIndex(s => s.id === id);
  if (index !== -1) {
    technicalSheets.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Technical sheet not found' });
  }
});

export default router;
