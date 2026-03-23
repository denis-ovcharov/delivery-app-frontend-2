export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Shop {
  _id: string;
  name: string;
  description: string;
  rating: number;
  image: string;
  category: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  shop: Shop | string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  discount: number;
  finalAmount: number;
  email: string;
  phone: string;
  address: string;
  couponCode?: string;
  status: string;
  createdAt: string;
}

export interface Coupon {
  _id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount?: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface ApiError {
  error: string;
  details?: Array<{ field: string; message: string }>;
}
