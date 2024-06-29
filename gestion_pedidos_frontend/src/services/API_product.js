import React from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
});

export const listProducts = async () => {
    const response = await api.get('api/product/listproducts',{headers:{authorization: localStorage.getItem('authorization')}});
    return response.data;
};

export const createProducts = async (body) => {
    const response = await api.post(`api/product/saveproduct`,body,{headers:{authorization: localStorage.getItem('authorization')}});
    return response.data;
};

export const updateProduct = async (id,body) => {
    const response = await api.put(`api/product/updateproduct/${id}`,body,{headers:{authorization: localStorage.getItem('authorization')}});
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`api/product/deleteproduct/${id}`,{headers:{authorization: localStorage.getItem('authorization')}});
    return response.data;
};

export const searchProduct = async (id) => {
        const response = await api.get(`api/product/searchproduct/${id}`,{headers:{authorization: localStorage.getItem('authorization')}});
        return response.data;
};

export const searchProductId = async (id) => {
    const response = await api.get(`api/product/listproductsid/${id}`,{headers:{authorization: localStorage.getItem('authorization')}});
    return response.data;
};

export const countProduct = async () => {
    const response = await api.get('api/product/countproduct',{headers:{authorization: localStorage.getItem('authorization')}});
    return response.data;
};
