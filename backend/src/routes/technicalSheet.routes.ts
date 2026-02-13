import { Router } from 'express';
import * as sheetService from '../services/technicalSheet.service';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const sheets = await sheetService.getAllTechnicalSheets();
    res.json(sheets);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching technical sheets' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { items, ...sheetData } = req.body;
    const newSheet = await sheetService.createTechnicalSheet(sheetData, items);
    res.status(201).json(newSheet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating technical sheet' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { items, ...sheetData } = req.body;
    const updatedSheet = await sheetService.updateTechnicalSheet(req.params.id, sheetData, items);
    if (updatedSheet) {
      res.json(updatedSheet);
    } else {
      res.status(404).json({ message: 'Technical sheet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating technical sheet' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await sheetService.deleteTechnicalSheet(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Technical sheet not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting technical sheet' });
  }
});

export default router;

