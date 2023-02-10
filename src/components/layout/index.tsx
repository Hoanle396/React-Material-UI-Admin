import { RootState } from "@/redux";
import { getStatusSidebar, setOpenSidebar } from "@/redux/slice/common";
import { sidebar_size, sidebar_xs } from "@/utils/constant";
import { Box, styled } from "@mui/material";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "./Navbar";
import Sidebar from "./Sidebar";

// styled components
const Wrapper = styled(Box)(({ theme }) => ({
  paddingLeft: 30,
  [theme.breakpoints.down("md")]: {
    width: "100%",
    marginLeft: 0,
    paddingLeft: "2rem",
    paddingRight: "2rem",
  },
}));
interface IProps {
  children?: React.ReactNode
}
const Layout: FC<IProps> = ({ children }) => {
  const showMobileSideBar = useSelector(getStatusSidebar);
  const dispatch = useDispatch()
  const open = useSelector((state: RootState) => state.common.sidebarOpen)
  const matchDesktop = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "row"
    }}>
      <Sidebar
        showMobileSideBar={showMobileSideBar}
        closeMobileSideBar={() => dispatch(setOpenSidebar())}
      />
      <Wrapper
        width={matchDesktop && !open ? 'calc(100% - 80px)' : 'calc(100% - 280px)'}
        ml={matchDesktop && !open ? `${sidebar_xs}px` : `${sidebar_size}px`}>
        <DashboardNavbar
          setShowMobileSideBar={() => dispatch(setOpenSidebar())}
        />
        {children || <Outlet />}
      </Wrapper>
    </Box>
  );
};

export default Layout;
