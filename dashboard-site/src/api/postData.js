import axios from 'axios';
import { databaseURL } from './url';
import { ReactSession } from 'react-client-session'

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
    const user_id = ReactSession.get("user").id;
    const response = await axiosWithCookies.post(`${databaseURL}service`, {
        name,
        visible,
        description,
        price,
        user_id
    });
    console.log(response)
    return response.data;
}

export const postCity = async (name, visible) => {
    const response = await axiosWithCookies.post(`${databaseURL}city`, {
        name,
        visible
    });
    console.log(response)
    return response.data;
}

export const postEmployee = async (name, surname, city, description, visible, image) => {
    const user_id = ReactSession.get("user").id;
    const response = await axiosWithCookies.post(`${databaseURL}employee`, {
        name,
        surname,
        city,
        description,
        visible,
        image,
        user_id
    });
    console.log(response)
    return response.data;
}