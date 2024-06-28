import React from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const login = async (body) => {
    const response = await api.post('login',body);
    return response.data;
};