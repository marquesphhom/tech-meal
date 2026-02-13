import { Product, Reservation, Table, User } from '../types';

export let ingredients: Ingredient[] = [
  {
    id: '1',
    name: 'Carne Moída Bov.',
    unit: 'kg',
    cost: 45.0,
    groupLevel1: 'ALIMENTAR',
    groupLevel2: 'PROTEINA',
    groupLevel3: 'BOVINA',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Pão de Hambúrguer',
    unit: 'un',
    cost: 1.2,
    groupLevel1: 'ALIMENTAR',
    groupLevel2: 'PADARIA',
    groupLevel3: 'PAES',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export let technicalSheets: TechnicalSheet[] = [
  {
    id: '1',
    productId: '1',
    name: 'Burger Gourmet - Tradicional',
    ingredients: [
      { ingredientId: '1', quantity: 0.18 },
      { ingredientId: '2', quantity: 1 }
    ],
    observations: 'Padrão da casa',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export let products: Product[] = [
  {
    id: '1',
    name: 'Burger Gourmet',
    description: 'Pão brioche, blend 180g, queijo cheddar, bacon caramelizado.',
    price: 35.0,
    category: 'Main Course'
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
