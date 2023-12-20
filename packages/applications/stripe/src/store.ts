import {
    configureStore,
    createSlice,
    combineReducers,
    PreloadedState,
} from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export interface ExampleState {
    root: {};
}

const initialState: ExampleState = {
    root: {},
};

const exampleSlice = createSlice({
    name: "example",
    initialState,
    reducers: {},
});

export const {} = exampleSlice.actions;
const exampleReducer = exampleSlice.reducer;

const RootReducer = combineReducers({
    example: exampleReducer,
});

export type ApplicationState = ReturnType<typeof RootReducer>;

export const setupStore = (
    preloadedState?: PreloadedState<ApplicationState>
) => {
    return configureStore({
        reducer: RootReducer,
        preloadedState,
    });
};

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ApplicationState> =
    useSelector;
