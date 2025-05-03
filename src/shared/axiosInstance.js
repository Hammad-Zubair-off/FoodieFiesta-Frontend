import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://foodie-fiesta-backend1.vercel.app/api',
});

// Add token to every request automatically
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
