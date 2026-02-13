import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userRepository = AppDataSource.getRepository(User);
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

export const login = async (username: string, password: string): Promise<{ token: string; user: User } | null> => {
  const user = await userRepository.findOneBy({ username });

  if (!user) {
    return null;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return null;
  }

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
  return { token, user };
};

export const register = async (userData: Partial<User>): Promise<User> => {
  const hashedPassword = await bcrypt.hash(userData.password!, 10);
  const user = userRepository.create({ ...userData, password: hashedPassword });
  return await userRepository.save(user);
};
