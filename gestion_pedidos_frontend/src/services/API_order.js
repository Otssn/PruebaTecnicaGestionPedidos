import React from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const listOrder = async () => {
    const response = await api.get('api/order/listorder',{headers:{authorization: localStorage.getItem('authorization')}});
    return response.data;
};

export const createOrder = async (body) => {
    const response = await api.post(`api/order/saveorder`,body,{headers:{authorization: localStorage.getItem('authorization')}});
    return response.data;
};

export const updateOrder = async (id,body) => {
    const response = await api.put(`api/order/updateorder/${id}`,body,{headers:{authorization: localStorage.getItem('authorization')}});
    return response.data;
};

export const deleteOrder = async (id) => {
    const response = await api.delete(`api/order/deleteorder/${id}`,{headers:{authorization: localStorage.getItem('authorization')}});
    return response.data;
};

export const searchOrder = async (id) => {
        const response = await api.get(`api/order/searchorder/${id}`,{headers:{authorization: localStorage.getItem('authorization')}});
        return response.data;
};

export const countOrder = async () => {
    const response = await api.get('api/order/countorder',{headers:{authorization: localStorage.getItem('authorization')}});
    console.log(response.data)
    return response.data;
};

export const countOrderByMonth = async () => {
    const response = await api.get('api/order/countorderbymonth',{headers:{authorization: localStorage.getItem('authorization')}});
    console.log(response.data)
    return response.data;
};