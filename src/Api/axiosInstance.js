import axios from 'axios';
import { apiKey } from './keys';

const axiosInstance = axios.create({
    baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights', // Replace with your API base URL
    headers: apiKey,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error('API error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;