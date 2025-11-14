import axios, { AxiosError, AxiosResponse } from 'axios';
import { ApiError } from '../types/Product';

// Create axios instance with default config
const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor untuk error handling global
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    const apiError: ApiError = {
      message: 'Terjadi kesalahan jaringan',
      status: error.response?.status,
    };

    if (error.response) {
      // Server responded with error status
      const status = error.response.status;
      
      if (status === 400) {
        apiError.message = 'Permintaan tidak valid';
        // Extract field errors from response
        if (error.response.data && typeof error.response.data === 'object') {
          apiError.fieldErrors = (error.response.data as any).errors;
        }
      } else if (status === 401) {
        apiError.message = 'Anda harus login terlebih dahulu';
      } else if (status === 404) {
        apiError.message = 'Data tidak ditemukan';
      } else if (status >= 500) {
        apiError.message = 'Server sedang mengalami masalah';
      }
    } else if (error.request) {
      // Request was made but no response received
      apiError.message = 'Tidak dapat terhubung ke server';
      apiError.code = 'NETWORK_ERROR';
    } else {
      // Something else happened
      apiError.message = error.message || 'Terjadi kesalahan tidak terduga';
    }

    console.error('API Error Details:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
    });

    return Promise.reject(apiError);
  }
);

// Simulated API calls untuk testing error handling
export const productApi = {
  getProducts: async (signal?: AbortSignal): Promise<any> => {
    // Simulate API call dengan kemungkinan error
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Random error untuk testing (hapus di production)
    const random = Math.random();
    if (random < 0.3) {
      throw { 
        response: { 
          status: 500, 
          data: { message: 'Internal Server Error' } 
        } 
      };
    } else if (random < 0.4) {
      throw { 
        response: { 
          status: 404, 
          data: { message: 'Products not found' } 
        } 
      };
    }

    const response = await api.get('https://jsonplaceholder.typicode.com/users', { signal });
    return response.data;
  },

  getProduct: async (id: string, signal?: AbortSignal): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate 404 error untuk product tertentu
    if (id === '999') {
      throw { 
        response: { 
          status: 404, 
          data: { message: 'Product not found' } 
        } 
      };
    }

    const response = await api.get(`https://jsonplaceholder.typicode.com/users/${id}`, { signal });
    return response.data;
  },

  checkout: async (data: any, signal?: AbortSignal): Promise<any> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate validation error
    if (!data.address || data.address.trim().length < 10) {
      throw {
        response: {
          status: 400,
          data: {
            errors: {
              address: 'Alamat wajib diisi dan minimal 10 karakter'
            }
          }
        }
      };
    }

    // Simulate success
    return { success: true, orderId: 'ORD-' + Date.now() };
  },
};

export default api;