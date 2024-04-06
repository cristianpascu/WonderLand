import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, post } from '@/store/baseQuery';
import { createSlice } from '@reduxjs/toolkit';
import { OpenAIAskRequest, OpenAIAskResponse } from '@wonderland/common';

export interface BaseState {}

const initialState: BaseState = {};

const NAME = 'OpenAI';

const ApiSlice = createApi({
    reducerPath: `${NAME}Api`,
    ...baseQuery(NAME.toLowerCase()),
    endpoints: (build) => ({
        Ask: build.mutation<OpenAIAskResponse, OpenAIAskRequest>({
            query: post('ask'),
        }),
    }),
});

const {
    Ask: { matchFulfilled: AskSuccess },
} = ApiSlice.endpoints;

const Slice = createSlice({
    name: NAME,
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build.addMatcher(AskSuccess, () => {});
    },
});

export const { useAskMutation } = ApiSlice;

export default {
    Slice,
    ApiSlice,
    middleware: ApiSlice.middleware,
};
