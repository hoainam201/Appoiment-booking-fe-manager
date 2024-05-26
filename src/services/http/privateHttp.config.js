import axios from 'axios';
import {baseUrl} from './baseUrl';
import {toast} from "react-toastify";

const privateHttp = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    validateStatus: (status) => {
        return status <= 500;
    }
});

privateHttp.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

privateHttp.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            toast.error('Session expired, please login again');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
)
export default privateHttp;