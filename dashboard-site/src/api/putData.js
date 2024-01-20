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

export const putOpinion = async (id, status, reason) => {
    const user_id = ReactSession.get("user").id;
    const response = await axiosWithCookies.put(`${databaseURL}opinion`,
        { "_id": id, status, reason, user_id },
    );
    console.log(response)
    return response.data;
}

export const putContact = async (id, company_name, mail, phone_number, street, postal_code, city) => {
    const user_id = ReactSession.get("user").id;
    const response = await axiosWithCookies.put(`${databaseURL}contact`,
        { "_id": id, company_name, mail, phone_number, street, postal_code, city, user_id },
    );
    console.log(response)
    return response.data;
}

export const putSocialMedia = async (id, name, link, visible) => {
    const user_id = ReactSession.get("user").id;
    console.log(id, name, link, visible)
    const response = await axiosWithCookies.put(`${databaseURL}social_media`,
        { "_id": id, name, link, visible, user_id, "icon": "todo" },
    );
    console.log(response)
    return response.data;
}