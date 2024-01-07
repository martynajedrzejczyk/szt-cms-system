import axios from 'axios';
import { databaseURL } from './url';

export const deleteCity = async (name) => {
    console.log(name)
    const response = await axios.delete(`${databaseURL}city`, {
        data: { name },
        headers: { "Content-Type": "application/json" },
    });
    console.log(response)
    return response.data;
}
