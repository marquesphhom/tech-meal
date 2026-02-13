import { Router } from 'express';
import * as authService from '../services/auth.service';

const router = Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await authService.login(username, password);

    if (result) {
      return res.json(result);
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error during login' });
  }
});

router.post('/register', async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

export default router;

