import axios, { AxiosRequestConfig } from 'axios';

const { host } = __APP_ENV__;

const AXIOS_CONFIG: AxiosRequestConfig = {
    baseURL: host || '/api',
    withCredentials: true,
};

export const get = async <T>(url: string): Promise<T> => {
    try {
        const { data } = await axios.get(url, AXIOS_CONFIG);
        return data as T;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
