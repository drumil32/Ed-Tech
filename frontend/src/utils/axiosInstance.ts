// axiosInstance.js
import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_BASE_URL}`, // Replace with your backend API base URL
});

// Request interceptor to add the JWT token to the Authorization header
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosInstance;
