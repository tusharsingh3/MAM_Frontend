import axios from 'axios';

export const getResponse = async (url, params) => {
    await axios.get(url, params)
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        })
};