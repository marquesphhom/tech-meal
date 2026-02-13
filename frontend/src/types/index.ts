export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  technicalSheet?: TechnicalSheet;
}

export interface TechnicalSheet {
  productId: string;
  ingredients: Ingredient[];
  observations: string;
}

export interface Ingredient {
  name: string;
  quantity: string;
  cost: number;
}

export interface Reservation {
  id: string;
  fullName: string;
  phone: string;
  cpf: string;
  birthDate: string;
  email: string;
  date: string;
  time: string;
  tableNumber: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Table {
  number: string;
  capacity: number;
  isAvailable: boolean;
}

export interface User {
  id: string;
  username: string;
  role: 'owner' | 'employee';
}
