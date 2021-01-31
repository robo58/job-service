import axios from "axios";

const baseUrl = 'https://studenti.sum.ba/projekti/fsre_rwa/2020/g31/api';

const instance = axios.create({
    baseURL: baseUrl,
});

export default instance;