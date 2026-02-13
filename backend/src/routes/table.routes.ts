import { Router } from 'express';
import * as tableService from '../services/table.service';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// Public: Get available tables
router.get('/available', async (req, res) => {
  try {
    const tables = await tableService.getAllTables();
    res.json(tables.filter(t => t.isAvailable));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tables' });
  }
});

// Admin: CRUD
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tables = await tableService.getAllTables();
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tables' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const newTable = await tableService.createTable(req.body);
    res.status(201).json(newTable);
  } catch (error) {
    res.status(500).json({ message: 'Error creating table' });
  }
});

router.put('/:number', authMiddleware, async (req, res) => {
  try {
    const updatedTable = await tableService.updateTable(req.params.number, req.body);
    if (updatedTable) {
      res.json(updatedTable);
    } else {
      res.status(404).json({ message: 'Table not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating table' });
  }
});

export default router;

