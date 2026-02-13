import { Router } from 'express';
import * as ingredientService from '../services/ingredient.service';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const ingredients = await ingredientService.getAllIngredients();
    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ingredients' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const newIngredient = await ingredientService.createIngredient(req.body);
    res.status(201).json(newIngredient);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ingredient' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedIngredient = await ingredientService.updateIngredient(req.params.id, req.body);
    if (updatedIngredient) {
      res.json(updatedIngredient);
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating ingredient' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await ingredientService.deleteIngredient(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Ingredient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting ingredient' });
  }
});

export default router;

