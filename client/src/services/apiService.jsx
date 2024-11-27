import axios from 'axios';
import ApiUri from '../utils/config';

const apiClient = axios.create({
  baseURL: ApiUri, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Example: GET request
export const fetchData = async (endpoint,data) => {
  try {
    const response = await apiClient.get(endpoint,data);
    return response.data;
  } catch (error) {
    console.error('GET Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Example: POST request
export const postData = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('POST Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};

// Example: PATCH request
export const updateData = async (endpoint, data) => {
  try {
    const response = await apiClient.patch(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('POST Error:', error.response ? error.response.data : error.message);
    throw error;
  }
};
