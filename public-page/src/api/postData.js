import axios from 'axios';
import { databaseURL } from './url';

const axiosWithCookies = axios.create({
    // withCredentials: true
});

export const postOpinion = async (author_nick, description, stars) => {
    const response = await axiosWithCookies.post(`${databaseURL}opinion`, { author_nick, description, stars });
    return response.data;
}