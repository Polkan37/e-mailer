import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MeetingRoomRoundedIcon from '@mui/icons-material/MeetingRoomRounded';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { AppBar, Drawer, DrawerHeader } from './setSidebarStyles'
import { PAGES } from '../../constants/pages';

import './sidebar.css'
import { Item } from './Item';

export default function Sidebar() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    


    return (
        <>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem key={'melissa-key'} disablePadding sx={{ display: 'block', textAlign: 'center' }}>
                        <ListItemButton
                            sx={{
                                justifyContent: 'center',
                                display: open ? 'inline-block' : 'flex',
                                px: 2.5,
                            }}
                            title='Melissa API Key set'
                            disabled
                        >
                            <Avatar sx={{ bgcolor: '#666', border: '3px solid #399839' }}>
                                <img src='https://thiscrm.co/favicon.ico' width={25} />
                            </Avatar>

                        </ListItemButton>
                        <ListItemButton
                            sx={{
                                justifyContent: 'center',
                                display: open ? 'inline-block' : 'flex',
                                px: 2.5,
                            }}
                            title='Lica API Key set'
                            disabled
                        >
                            <Avatar sx={{ bgcolor: '#666', border: '3px solid #399839' }}>
                                <img src='https://app.licacrm.co/static/favicon.png' width={25} />
                            </Avatar>
                        </ListItemButton>
                    </ListItem>
                    <ListItem key={'lica-key'} disablePadding sx={{ display: 'block' }}>
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {PAGES.map((element, index) => {
                        return element.key === 'templates' ? <div key={index}><Divider /><Item key={element.key} data={element} open={open} /></div> : <Item key={element.key} data={element} open={open} />
                    })}
                </List>
                <Item style="position: absolute; bottom: 2rem" data={{ key: 'logout', url: '/logout', icon: <MeetingRoomRoundedIcon />, titleText: 'Logout', styled: 'logout'}} open={open} />
            </Drawer>
        </>
    );
}