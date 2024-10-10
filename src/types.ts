export interface User {
  id: string;
  name: string;
  role: 'admin' | 'user';
  pin: string;
}

export interface Order {
  id: string;
  userId: string;
  location: string;
  items: OrderItem[];
  total: number;
  paymentMethod: 'Cash' | 'Card' | 'Bank Transfer' | 'Voucher' | 'Bitcoin';
  timestamp: Date;
}

export interface OrderItem {
  flavor: string;
  size: 'small' | 'medium' | 'large';
  quantity: number;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: 'flavor' | 'size';
  price: number;
  stock: number;
}

export interface Location {
  id: string;
  name: string;
}

export interface Shift {
  id: string;
  userId: string;
  start: Date;
  end: Date;
  location: string;
}