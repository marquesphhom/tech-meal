import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { AppDataSource } from './data-source';
import { User } from './entities/User';

import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import reservationRoutes from './routes/reservation.routes';
import tableRoutes from './routes/table.routes';
import ingredientRoutes from './routes/ingredient.routes';
import technicalSheetRoutes from './routes/technicalSheet.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/technical-sheets', technicalSheetRoutes);

app.get('/', (req, res) => {
  res.send('Tech Meal API is running');
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Data Source has been initialized!");

    // Seed admin user
    const userRepository = AppDataSource.getRepository(User);
    const adminExists = await userRepository.findOneBy({ username: 'admin' });
    
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const admin = userRepository.create({
        username: 'admin',
        password: hashedPassword,
        role: 'owner'
      });
      await userRepository.save(admin);
      console.log('Admin user seeded: admin / admin123');
    }

    app.listen(Number(PORT), '0.0.0.0', () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
