import axios from 'axios';
import { databaseURL } from './url';

const axiosWithCookies = axios.create({
    withCredentials: true
});

export const postLogin = async (email, password) => {
    var bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);

    const response = await axios({
        method: "post",
        url: `${databaseURL}user/login`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response)
    return response.data;
}

export const postService = async (name, visible, description, price) => {
    const response = await axios.post(`${databaseURL}service`, {
        // data: { name, visible, description, price },
        // headers: { "Content-Type": "application/json" },
        name,
        visible,
        description,
        price
    });
    console.log(response)
    return response.data;
}

export const postCity = async (name, visible) => {
    const response = await axios.post(`${databaseURL}city`, {
        name,
        visible
    });
    console.log(response)
    return response.data;
}

export const postEmployee = async (name, surname, city, description, visible, image) => {
    const response = await axiosWithCookies.post(`${databaseURL}employee`, {
        name,
        surname,
        city,
        description,
        visible,
        image
    });
    console.log(response)
    return response.data;
}