import axios from 'axios';
import { databaseURL } from './url';
import { ReactSession } from 'react-client-session'

const axiosWithCookies = axios.create({
    withCredentials: true
});


export const putCity = async (id, name, visible) => {
    const response = await axiosWithCookies.put(`${databaseURL}city`, {
        "_id": id, name, visible
    });
    console.log(response)
    return response.data;
}

export const putEmployee = async (id, name, surname, city, description, visible, image) => {
    const user_id = ReactSession.get("user").id;
    const response = await axiosWithCookies.put(`${databaseURL}employee`,
        { "_id": id, name, surname, city, description, visible, image, user_id },
    );
    console.log(response)
    return response.data;
}

export const putService = async (id, name, visible, description, price) => {
    const user_id = ReactSession.get("user").id;
    const response = await axiosWithCookies.put(`${databaseURL}service`,
        { "_id": id, name, visible, description, price, user_id },
    );
    console.log(response)
    return response.data;
}