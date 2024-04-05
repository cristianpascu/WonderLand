import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const ApplicationLayout = () => {
    return (
        <div className="size-full flex flex-col max-h-full">
            <Header />
            <div className="grow flex flex-row max-h-full">
                <Sidebar />
                <div className="grow border-t border-slate-500 max-h-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
