export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  technicalSheet?: TechnicalSheet;
}

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  cost: number;
  groupLevel1: string;
  groupLevel2: string;
  groupLevel3: string;
  createdAt: string;
  updatedAt: string;
}

export interface TechnicalSheet {
  id: string;
  productId: string;
  name: string;
  ingredients: TechnicalSheetItem[];
  observations: string;
  createdAt: string;
  updatedAt: string;
}

export interface TechnicalSheetItem {
  ingredientId: string;
  quantity: number;
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
