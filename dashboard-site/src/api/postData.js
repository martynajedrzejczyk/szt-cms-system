import axios from 'axios';
import { databaseURL } from './url';
import { ReactSession } from 'react-client-session'
// import { parseInt } from 'core-js/library/fn/number';

const axiosWithCookies = axios.create({
    // withCredentials: true
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

export const postImage = async (image) => {
    const user_id = ReactSession.get("user").id;
    var bodyFormData = new FormData();
    bodyFormData.append('image', image);
    bodyFormData.append('order', '0')
    bodyFormData.append('user_id', user_id)
    bodyFormData.append('visible', 'true')
    const response = await axios({
        method: "post",
        url: `${databaseURL}image`,
        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    });
    console.log(response)
    return response
}

export const postPage = async (name, endpoint, visible, navigation_id) => {
    const user_id = ReactSession.get("user").id;
    console.log(name, endpoint, visible, navigation_id, user_id)
    const response = await axiosWithCookies.post(`${databaseURL}page`, {
        name,
        endpoint,
        visible,
        navigation_id,
        navigation_order: 0,
        user_id
    });
    console.log(response)
    return response.data;
}

export const postComponent = async (page_id, propTextShort, propTextMid, propTextLong, propImages, visible, order_number, component_type) => {
    const user_id = ReactSession.get("user").id;
    console.log(page_id, propTextShort, propTextMid, propTextLong, propImages, visible, order_number, component_type, user_id)
    const response = await axiosWithCookies.post(`${databaseURL}component`, {
        page_id,
        propTextShort,
        propTextMid,
        propTextLong,
        propImages,
        visible,
        order_number,
        component_type,
        user_id
    });
    console.log(response)
    return response.data;
}

export const postNavigation = async (name, order, parent_id, visible) => {
    if (visible === undefined) {
        visible = false;
    }
    order = parseInt(order);
    const user_id = ReactSession.get("user").id;
    const response = await axiosWithCookies.post(`${databaseURL}navigation`, {
        name,
        order,
        visible,
        parent_id,
        user_id
    });
    console.log(response)
    return response.data;
}