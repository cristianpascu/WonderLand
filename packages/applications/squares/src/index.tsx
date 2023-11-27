import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { setupStore } from "./store";
import { Provider } from "react-redux";

import { Application } from "./App.tsx";

import "./index.css";

const store = setupStore();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
            <Application />
        </Provider>
    </StrictMode>
);
