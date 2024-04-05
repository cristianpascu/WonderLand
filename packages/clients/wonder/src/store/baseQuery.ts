import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = (root: string = '') => ({
    baseQuery: fetchBaseQuery({
        baseUrl: __APP_ENV__.host + '/' + root,
        credentials: 'include',
    }),
    keepUnusedDataFor: 0,
});

export const post =
    <B>(path: string) =>
    (body: B) => ({
        url: path,
        method: 'POST',
        body,
    });
