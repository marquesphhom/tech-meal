import { Router } from 'express';
import * as reservationService from '../services/reservation.service';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

// Public: Create reservation
router.post('/', async (req, res) => {
  try {
    const newReservation = await reservationService.createReservation({
      ...req.body,
      status: 'pending'
    });
    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ message: 'Error creating reservation' });
  }
});

// Admin: CRUD
router.get('/', authMiddleware, async (req, res) => {
  try {
    const reservations = await reservationService.getAllReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations' });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const updatedReservation = await reservationService.updateReservation(req.params.id, req.body);
    if (updatedReservation) {
      res.json(updatedReservation);
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating reservation' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deleted = await reservationService.deleteReservation(req.params.id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Reservation not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting reservation' });
  }
});

export default router;

