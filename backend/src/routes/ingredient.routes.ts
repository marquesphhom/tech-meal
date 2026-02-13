import { Router } from 'express';
import { ingredients } from '../data/mockData';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/', authMiddleware, (req, res) => {
  res.json(ingredients);
});

router.post('/', authMiddleware, (req, res) => {
  const newIngredient = { 
    ...req.body, 
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  ingredients.push(newIngredient);
  res.status(201).json(newIngredient);
});

router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const index = ingredients.findIndex(i => i.id === id);
  if (index !== -1) {
    ingredients[index] = { 
      ...ingredients[index], 
      ...req.body, 
      updatedAt: new Date().toISOString() 
    };
    res.json(ingredients[index]);
  } else {
    res.status(404).json({ message: 'Ingredient not found' });
  }
});

router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const index = ingredients.findIndex(i => i.id === id);
  if (index !== -1) {
    ingredients.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Ingredient not found' });
  }
});

export default router;
