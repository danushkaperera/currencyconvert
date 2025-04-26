import axios from 'axios';
import { API_BASE_URL, API_KEY } from '../../env';
import { ScrollView, Alert} from 'react-native';
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // Optional: 10s timeout
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  // Interceptor for request logging (optional)
  apiClient.interceptors.request.use((config) => {
    const fullUrl = `${config.url}?${new URLSearchParams(config.params).toString()}`;

    console.log('Request:', config);
    return config;
  });
  
  // Interceptor for response logging (optional)
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );

  export const getRequest = async (endpoint, parameters) => {
   
    try {
      const response = await apiClient.get(`${endpoint}`, {
        params: {
          app_id: API_KEY,
          ...parameters,
        },
      });
      return response;
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  };
  
  export default apiClient;

