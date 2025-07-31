import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: 'http://localhost:3001/', 
    headers: {
    'Content-Type': 'application/json',
    },
    timeout: 5000, 
});

instance.interceptors.request.use((config) => {
    const token = Cookies.get("token");
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    return config;
  });

export default instance;