import { Dashboard, Delete, Group, HourglassBottom, Login } from "@mui/icons-material";
import React from "react";

interface Irouter {
  title: string;
  Icon: React.ReactNode;
  path: string;
}
export const superAdminRoutes: Irouter[] = [
  {
    title: "Dashboard",
    Icon: <Dashboard />,
    path: "/admin/dashboard",
  },
  {
    title: "User Management",
    Icon: <Group />,
    path: "/admin/user",
  },
  {
    title: "Loading",
    Icon: <HourglassBottom />,
    path: "/admin/loading",
  },
  {
    title: "Login",
    Icon: <Login />,
    path: "/login",
  },
];
