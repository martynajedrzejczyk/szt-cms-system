import axios from 'axios';
import { databaseURL } from './url';
import { ReactSession } from 'react-client-session'

const axiosWithCookies = axios.create({
    // withCredentials: true
});

export const deleteCity = async (id) => {
    console.log(id)
    const response = await axiosWithCookies.delete(`${databaseURL}city`, {
        data: { "_id": id },
        headers: { "Content-Type": "application/json" },
    });
    console.log(response)
    return response.data;
}

export const deleteEmployee = async (id) => {
    console.log(id)
    const user_id = ReactSession.get("user").id;
    const response = await axiosWithCookies.delete(`${databaseURL}employee`, {
        data: { "_id": id, user_id },
        headers: { "Content-Type": "application/json" },
    });
    console.log(response)
    return response.data;
}

export const deleteService = async (id) => {
    const user_id = ReactSession.get("user").id;
    const response = await axiosWithCookies.delete(`${databaseURL}service`, {
        data: { "_id": id, user_id },
        headers: { "Content-Type": "application/json" },
    });
    console.log(response)
    return response.data;
}

export const deleteComponent = async (id, order_number, page_id) => {
    const response = await axiosWithCookies.delete(`${databaseURL}component`, {
        data: { "_id": id, order_number, page_id },
        headers: { "Content-Type": "application/json" },
    });
    console.log(response)
    return response.data;
}