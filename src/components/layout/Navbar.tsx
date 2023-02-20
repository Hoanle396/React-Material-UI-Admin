import { TitleContext } from '@/contexts/title-context';
import { AppBar, Box, styled, Theme, Toolbar, Typography, useMediaQuery } from '@mui/material';

import { FC, useContext } from 'react';
import ProfilePopover from './ProfilePopover';

// root component interface
interface DashboardNavBarProps {
    setShowMobileSideBar: () => void;
}

// custom styled components
const DashboardNavbarRoot = styled(AppBar)(() => ({
    zIndex: 11,
    boxShadow: 'none',
    paddingTop: '.5rem',
    paddingBottom: '.5rem',
    backdropFilter: 'blur(6px)',
    backgroundColor: 'transparent',
    transition: 'width 0.3s ease',
    borderBottom: '1px solid #ddd'
}));

const StyledToolBar = styled(Toolbar)(() => ({
    '@media (min-width: 0px)': {
        paddingLeft: 0,
        paddingRight: 0,
        // minHeight: 'auto',
    },
}));

const ToggleIcon = styled(Box)(({ theme }) => ({
    margin: '5px',
    borderRadius: '10px',
    transition: 'width 0.3s',
    backgroundColor: theme.palette.primary.main,
}));

// root component
const DashboardNavbar: FC<DashboardNavBarProps> = ({ setShowMobileSideBar }) => {
    const { title } = useContext(TitleContext);
    const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
    console.log(title)
    if (downMd) {
        return (
            <DashboardNavbarRoot position="sticky">
                <StyledToolBar>
                    <Box sx={{ cursor: 'pointer' }} onClick={setShowMobileSideBar}>
                        <ToggleIcon width={25} height={3} />
                        <ToggleIcon width={20} height={2} />
                        <ToggleIcon width={25} height={3} />
                    </Box>
                    <Box flexGrow={1} textAlign="center">
                        <img src="/vite.svg" width="100%" height="30" alt="Logo" />
                    </Box>
                </StyledToolBar>
            </DashboardNavbarRoot>
        );
    }

    return (
        <DashboardNavbarRoot position="sticky">
            <StyledToolBar>
                <Box sx={{ cursor: 'pointer' }} onClick={setShowMobileSideBar}>
                    <ToggleIcon width={25} height={3} />
                    <ToggleIcon width={20} height={2} />
                    <ToggleIcon width={25} height={3} />
                </Box>

                <Typography fontSize={21} lineHeight={0} mx={1} fontWeight="700" color="text.primary">
                    {title}
                </Typography>
                <Box flexGrow={1} ml={1} />
                <ProfilePopover />
            </StyledToolBar>
        </DashboardNavbarRoot>
    );
};

export default DashboardNavbar;