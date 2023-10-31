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
    { ID: 0, name: 'Home', icon: 'product', url: '/' },
    { ID: 1, name: 'Contact Us', icon: 'contact', url: '/contact' },
    { ID: 2, name: 'Login', icon: 'login', url: '/login', showAfterLogin: false },
    { ID: 4, name: 'Channels', icon: 'group', url: '/channels' },
    { ID: 5, name: 'Roles', icon: 'role', url: '/roles' }
];

export const profileMenu = [
    { id: 1, text: 'Profile', icon: 'user' },
    { id: 4, text: 'Messages', icon: 'email' },
    { id: 3, text: 'Logout', icon: 'runner' }
];