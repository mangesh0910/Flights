// src/hooks/useApi.js
import { useState, useCallback } from 'react';
import axiosInstance from './axiosInstance'

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const callApi = useCallback(async (endpoint, method = 'GET', data = null, params = null) => {
        setLoading(true);
        setError(null);

        try {
            const response = await axiosInstance({
                url: endpoint,
                method,
                data,
                params,
            });
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'API request failed';
            setError(err.response?.data?.message || 'An error occurred');
            throw new Error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { callApi, loading, error };
};

export default useApi;
