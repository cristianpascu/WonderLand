import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { ApplicationInitializationData } from '@wonderland/common';

import { Application } from './app/Application';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './globals.css';
import { get } from './lib/axios.js';
import { setupStore } from './store/store.js';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';

export type IAppEnv = { host: string };

declare global {
    let __APP_ENV__: IAppEnv;
}

(async function init() {
    const data = await get<ApplicationInitializationData>('/');
    const { user } = data;
    const store = setupStore({
        App: {
            init: data,
        },
        Auth: {
            user,
            isAuthenticated: !!data?.user,
        },
    });
    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <Provider store={store}>
                <BrowserRouter>
                    <Application />
                </BrowserRouter>
            </Provider>
        </StrictMode>,
    );
})();
