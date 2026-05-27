import axios from 'axios';
import { LoginRequest, SignupRequest, JwtResponse, ProductPage, Product, Category, OrderRequest, Order } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  login: (credentials: LoginRequest): Promise<JwtResponse> =>
    api.post('/auth/signin', credentials).then(res => res.data),
  
  register: (userData: SignupRequest): Promise<{ message: string }> =>
    api.post('/auth/signup', userData).then(res => res.data),
};

// Products API
export const productsAPI = {
  getAll: (page = 0, size = 12, sortBy = 'id', sortDir = 'asc'): Promise<ProductPage> =>
    api.get(`/products?page=${page}&size=${size}&sortBy=${sortBy}&sortDir=${sortDir}`).then(res => res.data),
  
  getById: (id: number): Promise<Product> =>
    api.get(`/products/${id}`).then(res => res.data),
  
  getByCategory: (categoryId: number, page = 0, size = 12): Promise<ProductPage> =>
    api.get(`/products/category/${categoryId}?page=${page}&size=${size}`).then(res => res.data),
  
  search: (name: string, page = 0, size = 12): Promise<ProductPage> =>
    api.get(`/products/search?name=${name}&page=${page}&size=${size}`).then(res => res.data),
  
  getByPriceRange: (minPrice: number, maxPrice: number, page = 0, size = 12): Promise<ProductPage> =>
    api.get(`/products/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&size=${size}`).then(res => res.data),
  
  getLatest: (): Promise<Product[]> =>
    api.get('/products/latest').then(res => res.data),
  
  getAvailable: (page = 0, size = 12): Promise<ProductPage> =>
    api.get(`/products/available?page=${page}&size=${size}`).then(res => res.data),
};

// Categories API
export const categoriesAPI = {
  getAll: (): Promise<Category[]> =>
    api.get('/categories').then(res => res.data),
  
  getById: (id: number): Promise<Category> =>
    api.get(`/categories/${id}`).then(res => res.data),
};

// Orders API
export const ordersAPI = {
  create: (orderData: OrderRequest): Promise<Order> =>
    api.post('/orders', orderData).then(res => res.data),
  
  getMyOrders: (): Promise<Order[]> =>
    api.get('/orders/my-orders').then(res => res.data),
  
  getById: (id: number): Promise<Order> =>
    api.get(`/orders/${id}`).then(res => res.data),
};

export default api;