import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { databaseURL } from './urls';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get(`${databaseURL}/users`).then((response) => {
            setUsers(response.data);
        });
    }, []);

    return users;
};

export const useUserss = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get(`${databaseURL}collections/users/records`).then((response) => {
            setUsers(response.data);
        });
    }, []);

    return users;
};