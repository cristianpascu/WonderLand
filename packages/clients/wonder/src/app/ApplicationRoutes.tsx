import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { ApplicationLayout } from '../components/app/Layout';
import { SignInPage } from '../pages/SignInPage';
import { SignUpPage } from '../pages/SignUpPage';
import { FC, PropsWithChildren } from 'react';
import { useApplicationSelector } from '@/store/store';
import { MonacoEditorPage } from '@/pages/MonacoEditorPage';
import { PasswordResetPage } from '@/pages/PasswordResetPage';
import { ForgotPasswordPage } from '@/pages/ForgotPasswordPage';

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
            <Route path="/forgot/password" element={<ForgotPasswordPage />} />
            <Route
                path="/password/reset/:link"
                element={<PasswordResetPage />}
            />
            <Route
                path="/"
                element={
                    <RequireAuthentication>
                        <ApplicationLayout />
                    </RequireAuthentication>
                }
            >
                <Route path="/editor" element={<MonacoEditorPage />} />
            </Route>
        </Routes>
    );
};
