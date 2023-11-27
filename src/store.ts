import {
    configureStore,
    createSlice,
    combineReducers,
    PreloadedState,
} from "@reduxjs/toolkit";

import type { PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { pickColor } from "./colors";
import { Square } from "./model";

export interface SquareState {
    root: Square;
}

const initialState: SquareState = {
    root: {
        id: "",
        color: "blue",
        leafs: [],
    },
};

const squareSlice = createSlice({
    name: "square",
    initialState,
    reducers: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        split: (state, action: PayloadAction<Square>) => {
            const { root } = state;
            const { id } = action.payload;
            const children: Square[] = [0, 1, 2, 3].map((i) => {
                return { color: pickColor(), id: `${id}${i}`, leafs: [] };
            });
            const path = id.split("").map<number>((i) => +i);
            let square = root;
            for (let i = 0; i < path.length; i++) {
                square = square.leafs[path[i]];
            }
            square.leafs = children;
            return state;
        },
    },
});

export const { split } = squareSlice.actions;
export const squareReducer = squareSlice.reducer;

const rootReducer = combineReducers({
    square: squareReducer,
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
