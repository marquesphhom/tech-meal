import { Router } from 'express';
import { products } from '../data/mockData';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// Public: List products for menu
router.get('/', (req, res) => {
  res.json(products);
});

// Admin: CRUD
router.post('/', authMiddleware, (req, res) => {
  const newProduct = { ...req.body, id: Date.now().toString() };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const index = products.findIndex(p => p.id === id);
  if (index !== -1) {
    products.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

export default router;
