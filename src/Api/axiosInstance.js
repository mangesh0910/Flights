import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights', // Replace with your API base URL
    timeout: 100000, // Timeout after 10 seconds
    headers: {
        // 'Content-Type': 'application/json',
        // Accept: 'application/json',
        // 'x-rapidapi-key': '6f18b8d547msh386a79b71f18e5ap149f78jsn6fc8f56a2890', //mangeshgosavi300
        // 'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
        // 'x-rapidapi-key': 'f248fcfe33msh8676a732907590dp1c8bdcjsn99868a2c70ba', //mangesh.stepron
        // 'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
        'x-rapidapi-key': '32746005f7mshf6f2f2ec7e3bdbdp10206bjsn37fab823b43f',   //mangesh.pwc
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
    },
});

// Add interceptors if needed
// axiosInstance.interceptors.request.use(
//     (config) => {
//         // Modify request (e.g., add auth token) if needed
//         const token = localStorage.getItem('authToken'); // Example for auth token
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle errors globally (e.g., show a toast, redirect on 401, etc.)
        console.error('API error:', error);
        return Promise.reject(error);
    }
);

export default axiosInstance;