import Layout from "@/components/layout";
import Loading from "@/components/Loading";
import AuthProvider from "@/contexts/auth-provider";
import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";



const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
(
  <Suspense fallback={<Loading />}>
    <Component {...props} />
  </Suspense>
);
const UserManagement = Loadable(lazy(() => import("./views/user-management")))
const Dashboard = Loadable(lazy(() => import("./views/dashboard")))
const Blank = Loadable(lazy(() => import("./views/blank")))
const Login = Loadable(lazy(() => import("./views/login")))

const routes = [
  {
    path: "/admin",
    element: <AuthProvider><Layout /></AuthProvider>,
    children: [
      {
        path: "/admin",
        element: <Navigate to='/admin/dashboard' />
      },
      {
        path: "/admin/dashboard",
        element: <Dashboard />
      },
      {
        path: '/admin/user',
        element: <UserManagement />
      },
      {
        path: "*",
        element: <Loading />,
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Navigate to='/admin' />
  }
];

export default routes;
