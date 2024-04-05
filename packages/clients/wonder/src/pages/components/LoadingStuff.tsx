import { Box, CircularProgress } from '@mui/material';

export const LoadingStuff: React.FC<{ message?: string }> = ({
    message = 'Loading...',
}) => {
    return (
        <div className="size-full flex flex-col justify-center align-middle items-center">
            <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>
            <div className="p-4 text-slate-500 text-sm">{message}</div>
        </div>
    );
};
