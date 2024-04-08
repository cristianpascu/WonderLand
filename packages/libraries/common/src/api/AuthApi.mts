import { Users } from '@wonderland/domain';
import { ApplicationInitializationData } from '../index.mjs';

export const AuthenticationRoutes = {
    $: 'auth',
    SignIn: 'signin',
    SignUp: 'signup',
    SignOut: 'signout',
    ForgotPassword: 'forgot/password',
    ResetPassword: 'reset/password',
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

export type AuthenticationForgotPasswordRequest = { email: string };
export type AuthenticationForgotPasswordResponse = {
    success: boolean;
    reason?: string;
    message?: string;
};

export type AuthenticationResetPasswordRequest = {
    email: string;
    password: string;
    link: string;
};
export type AuthenticationResetPasswordResponse = {
    success: boolean;
    reason?: string;
    message?: string;
};
