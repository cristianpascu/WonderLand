import { createSlice } from '@reduxjs/toolkit';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery, post } from '@/store/baseQuery';
import {
    ApplicationInitializationData,
    AuthenticationRoutes,
    AuthenticationSignInRequest,
    AuthenticationSignInResponse,
    AuthenticationSignOutRequest,
    AuthenticationSignOutResponse,
    AuthenticationSignUpRequest,
    AuthenticationSignUpResponse,
} from '@wonderland/common';

export type AuthState = ApplicationInitializationData & {
    isAuthenticated: boolean;
};

const initialState: AuthState = {
    isAuthenticated: false,
};

const ApiSlice = createApi({
    reducerPath: 'AuthApi',
    ...baseQuery(AuthenticationRoutes.$),
    endpoints: (build) => ({
        SignIn: build.mutation<
            AuthenticationSignInResponse,
            AuthenticationSignInRequest
        >({
            query: post(AuthenticationRoutes.SignIn),
        }),
        SignUp: build.mutation<
            AuthenticationSignUpResponse,
            AuthenticationSignUpRequest
        >({
            query: post(AuthenticationRoutes.SignUp),
        }),
        SignOut: build.mutation<
            AuthenticationSignOutResponse,
            AuthenticationSignOutRequest
        >({
            query: post(AuthenticationRoutes.SignOut),
        }),
    }),
});

const {
    SignIn: { matchFulfilled: SignInSuccess },
    SignUp: { matchFulfilled: SignUpSuccess },
    SignOut: { matchFulfilled: SignOutSuccess },
} = ApiSlice.endpoints;

const Slice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(SignInSuccess, (state, { payload }) => {
            if (!payload) {
                return;
            }
            const { user } = payload;
            state.user = user;
        });
        builder.addMatcher(SignUpSuccess, (state, { payload: user }) => {
            state.user = user;
        });

        builder.addMatcher(SignOutSuccess, (state) => {
            state.user = undefined;
        });
    },
});

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } =
    ApiSlice;

export default {
    Slice,
    ApiSlice,
    middleware: ApiSlice.middleware,
};
