import {
    configureStore,
    createSlice,
    combineReducers,
    PreloadedState,
} from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export interface StripeState {
    root: {};
}

const initialState: StripeState = {
    root: {},
};

const stripeSlice = createSlice({
    name: "stripe",
    initialState,
    reducers: {},
});

export const {} = stripeSlice.actions;
export const stripeReducer = stripeSlice.reducer;

const rootReducer = combineReducers({
    stripe: stripeReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export const setupStore = (
    preloadedState?: PreloadedState<ApplicationState>
) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
    });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
    useSelector;
