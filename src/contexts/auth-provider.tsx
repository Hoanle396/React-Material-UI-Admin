import { getIsLogin } from '@/redux/slice/auth'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
interface IProps {
    children: React.ReactNode;
}
const AuthProvider: FC<IProps> = ({ children }) => {
    const isLogin = useSelector(getIsLogin)
    return isLogin ? <>{children ?? <Outlet />}</> : <Navigate to='/login' />
}

export default AuthProvider