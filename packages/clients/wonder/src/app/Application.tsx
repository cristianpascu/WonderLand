import CssBaseline from '@mui/material/CssBaseline';

import './Application.css';

import { ApplicationRoutes } from './ApplicationRoutes';
import { useEffect } from 'react';

export const Application: React.FC = () => {
    useEffect(() => {
        const eventSource = new EventSource(__APP_ENV__.host + '/sse', {
            withCredentials: true,
        });
        // eventSource.onmessage = ({ data }) => {
        //     console.log('New message', JSON.parse(data));
        // };

        eventSource.addEventListener('random.event', ({ data, type }) => {
            console.log('New event: ', type);
            console.log('Event data: ', data);
        });

        eventSource.addEventListener('error', (error) => {
            console.log(error);
        });

        eventSource.addEventListener('open', (error) => {
            console.log(error);
        });

        return () => {
            eventSource.close();
        };
    });

    return (
        <>
            <CssBaseline />
            <ApplicationRoutes />
        </>
    );
};
