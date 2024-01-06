import axios from 'axios';
import { databaseURL } from './url';

export const postLogin = async (login, password) => {
    const response = await axios.post(`${databaseURL}user/login`, {
        login,
        password,
    });
    console.log(response)
    return response.data;
}

export const postCity = async (name) => {
    const response = await axios.post(`${databaseURL}city`, {
        name,
    });
    console.log(response)
    return response.data;
}

export const postContact = async (name, email, message) => {
    const response = await axios.post(`${databaseURL}contact`, {
        name,
        email,
        message,
    });
    console.log(response)
    return response.data;
}