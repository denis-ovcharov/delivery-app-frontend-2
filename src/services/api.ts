const API_URL = import.meta.env.VITE_API_URL || '/api';

const getHeaders = (includeAuth = false): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  
  if (includeAuth) {
    const token = localStorage.getItem('token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  
  return headers;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = data.error || 'An error occurred';
    throw new Error(error);
  }
  
  return data;
};

export const authAPI = {
  register: async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ name, email, password })
    });
    return handleResponse(response);
  },

  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password })
    });
    return handleResponse(response);
  }
};

export const shopsAPI = {
  getAll: async (params?: { 
    category?: string; 
    minRating?: number; 
    maxRating?: number;
    page?: number;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.category) searchParams.set('category', params.category);
    if (params?.minRating) searchParams.set('minRating', params.minRating.toString());
    if (params?.maxRating) searchParams.set('maxRating', params.maxRating.toString());
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    
    const response = await fetch(`${API_URL}/shops?${searchParams}`, {
      headers: getHeaders()
    });
    return handleResponse(response);
  }
};

export const productsAPI = {
  getAll: async (params?: {
    shopId?: string;
    category?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
  }) => {
    const searchParams = new URLSearchParams();
    if (params?.shopId) searchParams.set('shopId', params.shopId);
    if (params?.category) searchParams.set('category', params.category);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params?.sortOrder) searchParams.set('sortOrder', params.sortOrder);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    
    const response = await fetch(`${API_URL}/products?${searchParams}`, {
      headers: getHeaders()
    });
    return handleResponse(response);
  }
};

export const ordersAPI = {
  create: async (orderData: {
    items: Array<{ product: string; name: string; price: number; quantity: number }>;
    email: string;
    phone: string;
    address: string;
    couponCode?: string;
  }) => {
    const response = await fetch(`${API_URL}/orders`, {
      method: 'POST',
      headers: getHeaders(true),
      body: JSON.stringify(orderData)
    });
    return handleResponse(response);
  },

  getAll: async (params?: { email?: string; phone?: string; page?: number; limit?: number }) => {
    const searchParams = new URLSearchParams();
    if (params?.email) searchParams.set('email', params.email);
    if (params?.phone) searchParams.set('phone', params.phone);
    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    
    const response = await fetch(`${API_URL}/orders?${searchParams}`, {
      headers: getHeaders(true)
    });
    return handleResponse(response);
  },

  reorder: async (orderId: string) => {
    const response = await fetch(`${API_URL}/orders/${orderId}/reorder`, {
      method: 'POST',
      headers: getHeaders(true)
    });
    return handleResponse(response);
  }
};

export const couponsAPI = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/coupons`, {
      headers: getHeaders()
    });
    return handleResponse(response);
  },

  validate: async (code: string) => {
    const response = await fetch(`${API_URL}/coupons/validate`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ code })
    });
    return handleResponse(response);
  }
};
