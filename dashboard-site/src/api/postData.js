import axios from 'axios';
import { databaseURL } from './url';

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

export const postCity = async (name, visible) => {
    const response = await axios.post(`${databaseURL}city`, {
        name,
        visible
    });
    console.log(response)
    return response.data;
}