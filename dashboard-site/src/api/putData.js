import axios from 'axios';
import { databaseURL } from './url';
import { ReactSession } from 'react-client-session'

const axiosWithCookies = axios.create({
    // withCredentials: true
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
    console.log("A", id, name, surname, city, description, visible, image)
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

export const putPage = async (id, name, endpoint, visible, navigation_id, navigation_order) => {
    const user_id = ReactSession.get("user").id;
    console.log(id, name, endpoint, visible, navigation_id, navigation_order)
    const response = await axiosWithCookies.put(`${databaseURL}page`,
        { "_id": id, name, endpoint, visible, navigation_id, navigation_order, user_id },
    );
    console.log(response)
    return response.data;
}

export const putComponent = async (id, page_id, propTextShort, propTextMid, propTextLong, propImages, order_number, visible) => {
    const user_id = ReactSession.get("user").id;
    console.log(id, page_id, propTextShort, propTextMid, propTextLong, propImages, order_number, visible)
    order_number = parseInt(order_number)
    const response = await axiosWithCookies.put(`${databaseURL}component`,
        { "_id": id, page_id, propTextShort, propTextMid, propTextLong, propImages, order_number, visible, user_id },
    );
    console.log(response)
    return response.data;
}

export const putNavigation = async (id, name, order, parent_id, visible) => {
    if (visible === undefined) {
        visible = false;
    }
    if (parent_id === "Brak" || parent_id === undefined) {
        parent_id = null;
    }
    order = parseInt(order);
    console.log(id, name, order, parent_id, visible)
    // const user_id = ReactSession.get("user").id;
    const response = await axiosWithCookies.put(`${databaseURL}navigation`, {
        "_id": id, name, order, visible, parent_id
    });
    console.log(response)
    return response.data;
}