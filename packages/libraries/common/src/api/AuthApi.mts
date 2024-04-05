import { Users } from '@wonderland/domain';
import { ApplicationInitializationData } from '../index.mjs';

export const AuthenticationRoutes = {
    $: 'auth',
    SignIn: 'signin',
    SignUp: 'signup',
    SignOut: 'signout',
};

export type AppRequest = void;
export type AppResponse = ApplicationInitializationData;

export type AuthResponse = Record<string, never>;

export type AuthenticationSignUpRequest = {
    name: string;
    email: string;
    password: string;
};
export type AuthenticationSignUpResponse = Omit<Users, 'password'>;

export type AuthenticationSignInRequest = { email: string; password: string };
export type AuthenticationSignInResponse = ApplicationInitializationData | void;

export type AuthenticationSignOutRequest = void;
export type AuthenticationSignOutResponse = void;
