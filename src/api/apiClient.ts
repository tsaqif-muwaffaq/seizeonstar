// import axios from 'axios';
// import { API_ENDPOINTS } from './endpoints';
// import { LoginResponse } from '../types/User';

// // Create axios instance with base configuration
// const apiClient = axios.create({
//   baseURL: 'https://dummyjson.com',
//   timeout: 10000, // 10 seconds timeout
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add custom headers
// apiClient.interceptors.request.use(
//   (config) => {
//     // Add custom header to every request
//     config.headers['X-Client-Platform'] = 'React-Native';
    
//     // Add timestamp for debugging
//     config.headers['X-Request-Timestamp'] = new Date().toISOString();
    
//     console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
//     return config;
//   },
//   (error) => {
//     console.error('❌ Request interceptor error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for data transformation and error handling
// apiClient.interceptors.response.use(
//   (response) => {
//     console.log(`✅ ${response.status} Response from: ${response.config.url}`);
    
//     // Transform successful login responses
//     if (response.config.url?.includes('/auth/login') && response.status === 200) {
//       const transformedResponse: LoginResponse = {
//         success: true,
//         token: response.data.token || 'simulated_token_xyz',
//         user: response.data,
//       };
//       response.data = transformedResponse;
//     }
    
//     return response;
//   },
//   (error) => {
//     console.error('❌ Response interceptor error:', {
//       url: error.config?.url,
//       method: error.config?.method,
//       status: error.response?.status,
//       data: error.response?.data,
//       message: error.message,
//     });
    
//     if (error.code === 'ECONNABORTED') {
//       error.message = 'Request timeout - Please check your connection';
//     }
    
//     return Promise.reject(error);
//   }
// );

// export { apiClient };
// export default apiClient;

import axios from 'axios';
import { API_ENDPOINTS } from './endpoints';
import { LoginResponse } from '../types/User';

// Create axios instance with base configuration
const apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add custom headers
apiClient.interceptors.request.use(
  (config) => {
    // Add custom header to every request
    config.headers['X-Client-Platform'] = 'React-Native';
    
    // Add timestamp for debugging
    config.headers['X-Request-Timestamp'] = new Date().toISOString();
    
    console.log(`🚀 Making ${config.method?.toUpperCase()} request to: ${config.url}`);
    console.log('📤 Request data:', config.data);
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for data transformation and error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} Response from: ${response.config.url}`);
    console.log('📥 Response data:', response.data);
    
    return response;
  },
  (error) => {
    console.error('❌ Response interceptor error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout - Please check your connection';
    }
    
    return Promise.reject(error);
  }
);

export { apiClient };
export default apiClient;