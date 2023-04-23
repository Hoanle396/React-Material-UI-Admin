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
const Blogs = Loadable(lazy(() => import("./views/blogs")))
const CreateBlogs = Loadable(lazy(() => import("./views/blogs/create")))
const EditBlogs = Loadable(lazy(() => import("./views/blogs/edit")))
const CreateUsers = Loadable(lazy(() => import("./views/user-management/create")))
const UpdateUsers = Loadable(lazy(() => import("./views/user-management/edit")))
const Comments = Loadable(lazy(() => import('./views/blogs/components/comments')))

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
        path: "/admin/blogs",
        element: <Blogs />
      },
      {
        path: "/admin/blogs/comments/:id",
        element: <Comments />
      },
      {
        path: "/admin/blogs/create",
        element: <CreateBlogs />
      },
      {
        path: "/admin/blogs/:id",
        element: <EditBlogs />
      },
      {
        path: '/admin/user',
        element: <UserManagement />
      },
      {
        path: '/admin/users/create',
        element: <CreateUsers />
      },
      {
        path: '/admin/users/:id',
        element: <UpdateUsers />
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
