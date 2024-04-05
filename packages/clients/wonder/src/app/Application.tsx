import CssBaseline from '@mui/material/CssBaseline';

import './Application.css';

import { ApplicationRoutes } from './ApplicationRoutes';

export const Application: React.FC = () => {
    return (
        <>
            <CssBaseline />
            <ApplicationRoutes />
        </>
    );
};
