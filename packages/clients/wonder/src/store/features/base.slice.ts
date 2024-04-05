import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, post } from '@/store/baseQuery';
import { createSlice } from '@reduxjs/toolkit';

export interface BaseState {}

const initialState: BaseState = {};

const NAME = 'App';

const ApiSlice = createApi({
    reducerPath: `${NAME}Api`,
    ...baseQuery(NAME.toLowerCase()),
    endpoints: (build) => ({
        getAll: build.query({
            query: post('all'),
        }),
    }),
});

const {
    getAll: { matchFulfilled: GetAllSuccess },
} = ApiSlice.endpoints;

const Slice = createSlice({
    name: NAME,
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addMatcher(GetAllSuccess, () => {});
    },
});

export const { useGetAllQuery } = ApiSlice;

export default {
    Slice,
    ApiSlice,
    middleware: ApiSlice.middleware,
};
