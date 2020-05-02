import axios from 'axios';

const api = axios.create({
    baseURL: 'http://1.1.2.173:3333' 
});

export default api;