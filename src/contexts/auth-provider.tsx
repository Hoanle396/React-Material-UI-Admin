import { IUser, useUser } from '@/api/auth';
import Loading from '@/components/Loading';
import { getIsLogin, setIsLogin, setUserInfor } from '@/redux/slice/auth'
import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
interface IProps {
    children: React.ReactNode;
}
const AuthProvider: FC<IProps> = ({ children }) => {
    const dispatch = useDispatch()
    const { user, refetch, isLoading } = useUser({
        enabled: true,
        onSuccess: (res: IUser) => {
            dispatch(setUserInfor({ ...res }))
            dispatch(setIsLogin(true))
        }
    })
    if (isLoading) return <Loading />
    return user ? <>{children ?? <Outlet />}</> : <Navigate to='/login' />
}

export default AuthProvider