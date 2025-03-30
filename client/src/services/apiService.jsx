import axios from 'axios';
import ApiUri from '../utils/config';

// Create Axios instance
const apiClient = axios.create({
  baseURL: ApiUri,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('userToken'); // Retrieve token from storage
};

// Axios request interceptor to dynamically add token
apiClient.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers['x-access-token'] = token;
    } else {
      delete config.headers['x-access-token']; // Remove if no token
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API Functions (No Hooks Used)
export const fetchData = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, params);
    return response.data;
  } catch (error) {
    console.error('GET Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const postData = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('POST Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const updateData = async (endpoint, data) => {
  try {
    const response = await apiClient.patch(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('PATCH Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};
