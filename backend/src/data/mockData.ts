import { Product, Reservation, Table, User } from '../types';

export let products: Product[] = [
  {
    id: '1',
    name: 'Burger Gourmet',
    description: 'Pão brioche, blend 180g, queijo cheddar, bacon caramelizado.',
    price: 35.0,
    category: 'Main Course',
    technicalSheet: {
      productId: '1',
      ingredients: [
        { name: 'Pão brioche', quantity: '1 un', cost: 1.5 },
        { name: 'Carne', quantity: '180g', cost: 8.0 },
      ],
      observations: 'Servir mal passado se solicitado.'
    }
  },
  {
    id: '2',
    name: 'Suco de Laranja',
    description: 'Suco natural de laranja 300ml.',
    price: 12.0,
    category: 'Drinks'
  }
];

export let reservations: Reservation[] = [
  {
    id: '1',
    fullName: 'João Silva',
    phone: '11999999999',
    cpf: '123.456.789-00',
    birthDate: '1990-01-01',
    email: 'joao@example.com',
    date: '2026-02-15',
    time: '20:00',
    tableNumber: '5',
    status: 'pending'
  }
];

export let tables: Table[] = [
  { number: '1', capacity: 2, isAvailable: true },
  { number: '2', capacity: 2, isAvailable: true },
  { number: '3', capacity: 4, isAvailable: true },
  { number: '4', capacity: 4, isAvailable: true },
  { number: '5', capacity: 6, isAvailable: true },
];

export const users: User[] = [
  { id: '1', username: 'admin', role: 'owner' },
  { id: '2', username: 'user', role: 'employee' }
];
