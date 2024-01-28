import axios from 'axios';
import { databaseURL } from './url';

const axiosWithCookies = axios.create({
    // withCredentials: true
});

export const getNavigations = async () => {
    const response = await axiosWithCookies.get(`${databaseURL}navigations`);
    return response.data;
}

export const getPages = async () => {
    const response = await axiosWithCookies.get(`${databaseURL}pages`);
    return response.data;
}

export const getPage = async (page_id) => {
    const response = await axiosWithCookies.get(`${databaseURL}page?page_id=${page_id}`);
    console.log(response)
    return response.data;
}

export const getComponentsByPageId = async (page_id) => {
    const response = await axiosWithCookies.get(`${databaseURL}componentsOfPage?page_id=${page_id}`);
    console.log(response)
    return response.data;
}

export const getComponentTypes = async () => {
    const response = await axiosWithCookies.get(`${databaseURL}component_types`);
    return response.data;
};

export const getImage = async (image_id) => {
    const response = await axiosWithCookies.get(`${databaseURL}image?name=${image_id}`, { responseType: 'blob' });
    return response;
}

export const getOpinions = async () => {
    const response = await axiosWithCookies.get(`${databaseURL}opinions`);
    return response.data;
};

export const getEmployees = async () => {
    const response = await axiosWithCookies.get(`${databaseURL}employees`);
    return response.data;
}

export const getCities = async () => {
    const response = await axiosWithCookies.get(`${databaseURL}cities`);
    return response.data;
}