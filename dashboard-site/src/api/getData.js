import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { databaseURL } from './url';

const axiosWithCookies = axios.create({
    withCredentials: true
});

export const getCities = async () => {
    const response = await axiosWithCookies.get(`${databaseURL}cities`);
    return response.data;
}

export const getServices = async () => {
    const response = await axiosWithCookies.get(`${databaseURL}services`);
    return response.data;
}

export const getEmployees = async () => {
    const response = await axiosWithCookies.get(`${databaseURL}employees`);
    return response.data;
}

export const getUsers = async () => {
    const response = await axiosWithCookies.get(`${databaseURL}users`);
    return response.data;
};