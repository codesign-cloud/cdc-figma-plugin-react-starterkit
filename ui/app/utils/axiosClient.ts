// Axios client for making requests to the API
// Make sure to add new domains to the manifest.json networkAccess.allowedDomains

import axios from 'axios';

const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  // You can add auth tokens or other headers here if needed
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global error responses here
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default axiosClient;