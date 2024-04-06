import { useSignOutMutation } from '@/store/features/auth.slice';
import { useApplicationCacheReset } from '@/store/store';
import {
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import HomeIcon from '@mui/icons-material/Home';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

export const Sidebar = () => {
    const [SignOut] = useSignOutMutation();
    const navigate = useNavigate();

    const resetCache = useApplicationCacheReset();

    return (
        <div className="grow-0 min-w-48 text-white bg-slate-900 ">
            <List className="h-full flex flex-col">
                {[
                    {
                        path: '/',
                        title: 'Home',
                        icon: <HomeIcon className="text-white" />,
                    },
                    {
                        path: '/editor',
                        title: 'VS Code',
                        icon: <CodeIcon className="text-white" />,
                    },
                ].map((text, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton>
                            <ListItemIcon
                                className="pr-2"
                                style={{
                                    minWidth: 0,
                                }}
                            >
                                {text.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={text.title}
                                onClick={() => {
                                    navigate(text.path);
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
                <div className="flex-grow">&nbsp;</div>
                <Divider
                    sx={{
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                    }}
                />

                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon
                            className="pr-2"
                            style={{
                                minWidth: 0,
                            }}
                        >
                            <MeetingRoomIcon className="text-white" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Sign Out"
                            onClick={() => {
                                SignOut().then(async () => {
                                    resetCache();
                                });
                            }}
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </div>
    );
};
