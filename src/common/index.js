import axios from 'axios';

export const getResponse = async (url, params) => {
    let response;
    await axios.get(url, params)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            response = err;
        })
    return response;
};

export const updateRecord = async (url, params) => {
    let response;
    await axios.post(url, params)
        .then((response) => response.json())
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            response = err;
        })
    return response;
};

export const deleteRecord = async (url) => {
    let response;
    await axios.get(url)
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            response = err;
        })
    return response;
};

export const menuOptions = [
    { id: 1, text: 'Home', icon: 'product', url: '/' },
    { id: 2, text: 'Login', icon: 'login', url: '/login' },
    { id: 2, text: 'Register', icon: 'login', url: '/register' },
    { id: 3, text: 'Channels', icon: 'group', url: '/channels' },
    { id: 3, text: 'Roles', icon: 'role', url: '/roles' }
];