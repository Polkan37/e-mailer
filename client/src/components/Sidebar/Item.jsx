import React from 'react'
import { Link } from "react-router-dom";
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export function Item({ data, open }) {
    const { key, url, icon, titleText } = data;

    return (
        <ListItem key={key} disablePadding className={data.styled ? data.styled : ''}>
            <Link to={url} className='sidebar__link'>
                <ListItemButton
                    sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {icon}
                    </ListItemIcon>
                    <ListItemText primary={titleText} sx={{ opacity: open ? 1 : 0}} />
                </ListItemButton>
            </Link>
        </ListItem>
    )
}
