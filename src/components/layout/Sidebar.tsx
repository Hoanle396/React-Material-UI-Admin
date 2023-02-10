import { RootState } from '@/redux';
import { sidebar_size, sidebar_xs } from '@/utils/constant';
import { superAdminRoutes } from '@/utils/router';
import { Box, Drawer, List, Stack, styled, Theme, useMediaQuery } from '@mui/material';
import { FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RouteLink from './RouteLink';

// root component interface
interface SideNavBarProps {
  showMobileSideBar: boolean;
  closeMobileSideBar: () => void;
}

// custom styled components
const MainMenu = styled(Box)(({ theme }) => ({
  left: 0,
  height: '100%',
  position: 'fixed',
  boxShadow: theme.shadows[2],
  transition: 'width 0.3s ease',
  zIndex: theme.zIndex.drawer + 11,
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('md')]: { left: -80 },
  '& .simplebar-track.simplebar-vertical': { width: 7 },
  '& .simplebar-scrollbar:before': {
    background: theme.palette.text.primary,
  },
}));

// root component
const DashboardSideBar: FC<SideNavBarProps> = ({ showMobileSideBar, closeMobileSideBar }) => {

  const navigate = useNavigate();

  const [active, setActive] = useState('Dashboard');
  const downMd = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const matchDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const handleActiveMainMenu = (menuItem: any) => () => {
    setActive(menuItem.title);

    navigate(menuItem.path);
    closeMobileSideBar();
  };

  const open = useSelector((state: RootState) => state.common.sidebarOpen)

  const routes = useMemo(() => {
    return superAdminRoutes
  }, []);

  // main menus content
  const mainSideBarContent = (
    <List sx={{ height: '100%' }}>
      <Stack flex={1} justifyContent='center' alignItems='center'>
        {showMobileSideBar && matchDesktop ? (
          <img
            src="/vite.svg"
            width={32}
            height={32}
          />
        ) : (
          <img
            width={118}
            height={32}
            src="/vite.svg"
          />
        )}
      </Stack>
      <Box padding='0 20px'>
        <Stack m='80px 0 0 0' spacing={2}>
          {routes.map((router, index) => {
            return router.path ? (
              <RouteLink
                key={`router-${index}`}
                title={router.title}
                path={router.path}
                Icon={router.Icon}
              />
            ) : null
          })}
        </Stack>
      </Box>
    </List>
  );

  // for mobile device
  if (downMd) {
    return (
      <Drawer anchor="left" open={showMobileSideBar} onClose={closeMobileSideBar} PaperProps={{ sx: { width: sidebar_size } }}>
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flex: 1,
            width: 'inherit',
            position: 'fixed',
            overflow: 'hidden',
            flexDirection: 'column',
            boxShadow: (theme) => theme.shadows[1],
            backgroundColor: (theme) => theme.palette.background.paper,
            '& .simplebar-track.simplebar-vertical': { width: 7 },
            '& .simplebar-scrollbar:before': {
              background: (theme) => theme.palette.text.primary,
            },
          }}
        >
          {mainSideBarContent}
        </Box>
      </Drawer>
    );
  }

  return <MainMenu width={matchDesktop && !open ? sidebar_xs : sidebar_size}>{mainSideBarContent}</MainMenu>;
};

export default DashboardSideBar;