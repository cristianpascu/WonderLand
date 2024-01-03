import {
    configureStore,
    createSlice,
    combineReducers,
    PreloadedState,
} from "@reduxjs/toolkit";

import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Metronome } from "./model";

export interface MetronomeState {
    root: Metronome;
}

const initialState: MetronomeState = {
    root: {
        bpm: 120,
    },
};

const squareSlice = createSlice({
    name: "metronome",
    initialState,
    reducers: {},
});

export const {} = squareSlice.actions;
export const squareReducer = squareSlice.reducer;

const rootReducer = combineReducers({
    metronome: squareReducer,
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
