import axios from 'axios';
import { databaseURL } from './url';

const axiosWithCookies = axios.create({
    withCredentials: true
});

export const putCity = async (id, name, visible) => {
    const response = await axios.put(`${databaseURL}city`, {
        "_id": id, name, visible
    });
    console.log(response)
    return response.data;
}

export const putEmployee = async (id, name, surname, city, description, visible, image) => {
    const response = await axiosWithCookies.put(`${databaseURL}employee`,
        { "_id": id, name, surname, city, description, visible, image },
    );
    console.log(response)
    return response.data;
}