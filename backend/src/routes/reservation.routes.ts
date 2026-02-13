import { Router } from 'express';
import { reservations } from '../data/mockData';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// Public: Create reservation
router.post('/', (req, res) => {
  const newReservation = { 
    ...req.body, 
    id: Date.now().toString(),
    status: 'pending'
  };
  reservations.push(newReservation);
  res.status(201).json(newReservation);
});

// Admin: CRUD
router.get('/', authMiddleware, (req, res) => {
  res.json(reservations);
});

router.put('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const index = reservations.findIndex(r => r.id === id);
  if (index !== -1) {
    reservations[index] = { ...reservations[index], ...req.body };
    res.json(reservations[index]);
  } else {
    res.status(404).json({ message: 'Reservation not found' });
  }
});

router.delete('/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const index = reservations.findIndex(r => r.id === id);
  if (index !== -1) {
    reservations.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).json({ message: 'Reservation not found' });
  }
});

export default router;
