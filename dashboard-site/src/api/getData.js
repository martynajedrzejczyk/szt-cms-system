import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { databaseURL } from './url';

export const getCities = async () => {
    const response = await axios.get(`${databaseURL}cities`);
    return response.data;
}

export const getServices = async () => {
    const response = await axios.get(`${databaseURL}services`);
    return response.data;
}

export const getEmployees = async () => {
    const response = await axios.get(`${databaseURL}employees`);
    return response.data;
}

export const getUsers = async () => {
    const response = await axios.get(`${databaseURL}users`);
    return response.data;
};