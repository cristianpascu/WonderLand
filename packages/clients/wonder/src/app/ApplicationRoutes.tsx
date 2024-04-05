import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { ApplicationLayout } from '../components/app/Layout';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';
import { FC, PropsWithChildren } from 'react';
import { useApplicationSelector } from '@/store/store';

const RequireAuthentication: FC<PropsWithChildren> = ({ children }) => {
    const user = useApplicationSelector((state) => state.Auth.user);
    const location = useLocation();
    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }
    return children;
};

export const ApplicationRoutes = () => {
    return (
        <Routes>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
                path="/"
                element={
                    <RequireAuthentication>
                        <ApplicationLayout />
                    </RequireAuthentication>
                }
            ></Route>
        </Routes>
    );
};
