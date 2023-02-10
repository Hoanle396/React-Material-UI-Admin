import { RootState } from '@/redux';
import theme from '@/styles/theme';
import { Link as MuiLink, ListItem } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { StyledListItemButton, StyledListItemIcon } from './styled';
interface IProps {
    path: string;
    title: string;
    Icon: React.ReactNode
}
const RouteLink: FC<IProps> = ({ Icon, path, title }) => {
    let location = useLocation();
    const active = location.pathname.startsWith(path);
    const open = useSelector((state: RootState) => state.common.sidebarOpen)
    return (
        <MuiLink underline='none' component={Link} to={path}>
            <ListItem key={title} disablePadding>
                <StyledListItemButton
                    theme={theme}
                    style={{
                        color: active ? theme.palette.text.disabled : theme.palette.text.primary,
                        backgroundColor: active ? theme.palette.primary.main : 'transparent',
                    }}
                >
                    <StyledListItemIcon>
                        {Icon}
                    </StyledListItemIcon>
                    <ListItemText
                        primary={title}
                        style={{
                            opacity: open ? 1 : 0,
                            display: 'inline-flex',
                            flex: 1,
                            flexWrap: 'nowrap',
                            textOverflow: 'hidden',
                        }} />
                </StyledListItemButton>
            </ListItem>
        </MuiLink>
    )
}

export default RouteLink