import axios from 'axios';
import { databaseURL } from './url';

export const deleteCity = async (id) => {
    console.log(id)
    const response = await axios.delete(`${databaseURL}city`, {
        data: { "_id": id },
        headers: { "Content-Type": "application/json" },
    });
    console.log(response)
    return response.data;
}
