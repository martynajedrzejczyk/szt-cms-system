import axios from 'axios';
import { databaseURL } from './url';

export const putCity = async (id, name, visible) => {
    //  TODO: implement this function
    const response = await axios.put(`${databaseURL}city`, {
        id, name, visible
    });
    console.log(response)
    return response.data;
}
