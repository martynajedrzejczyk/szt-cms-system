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

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get(`${databaseURL}/users`).then((response) => {
            setUsers(response.data);
        });
    }, []);

    return users;
};