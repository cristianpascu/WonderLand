import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { setupStore } from "./store";
import { Provider } from "react-redux";

import { TEST, simple } from "@wonderland/wonderact";

import { Application } from "./App";

import "./index.css";

console.log(simple(TEST, TEST));

const store = setupStore();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <Application />
        </Provider>
    </StrictMode>
);
