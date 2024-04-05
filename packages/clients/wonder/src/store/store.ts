import { combineSlices, configureStore } from '@reduxjs/toolkit';

import type { TypedUseSelectorHook } from 'react-redux';

import { useDispatch, useSelector } from 'react-redux';

import Base from './features/base.slice.js';
import Auth from './features/auth.slice.js';

// Combine reducers into a root reducer

const slices = [Base.Slice];

const apiSlices = [Base.ApiSlice];

const rootReducer = combineSlices(
    Auth.Slice,
    Auth.ApiSlice,
    ...slices,
    ...apiSlices,
);

// Define application state as the ReturnType of the rootReducer
export type ApplicationState = ReturnType<typeof rootReducer>;

// Setup store, a function that takes a 'preloadedState' as an argument
// and returns a configured store using the root reducer and the preloaded state

export const setupStore = (preloadedState?: Partial<ApplicationState>) => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware().concat(Auth.ApiSlice.middleware);
        },
        preloadedState,
    });
};

export type ApplicationStore = ReturnType<typeof setupStore>;
export type ApplicationDispatch = ApplicationStore['dispatch'];

// useDispatch and useSelector from 'redux' are specified
// to application defined types, AppDispatch and ApplicationState

export const useApplicationDispatch: () => ApplicationDispatch = useDispatch;
export const useApplicationSelector: TypedUseSelectorHook<ApplicationState> =
    useSelector;

export const useApplicationCacheReset = () => {
    const dispatch = useApplicationDispatch();
    return () => {
        for (const slice of apiSlices) {
            dispatch(slice.util.resetApiState());
        }
    };
};
