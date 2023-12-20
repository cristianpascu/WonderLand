import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { setupStore } from "./store";
import { Provider as StoreProvider } from "react-redux";

import { Application } from "./Application.tsx";

import "./index.css";

const store = setupStore();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <StoreProvider store={store}>
            <Application />
        </StoreProvider>
    </StrictMode>
);
