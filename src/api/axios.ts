import { getLocalStorage, setLocalStorage, removeLocalStorage } from './../utils/common';
import { exchangeToken } from '@/utils/oauth2'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { toast } from 'react-hot-toast'
import { API_URL, STORAGE_KEY } from '@/utils/constant';

export const request = axios.create({
    baseURL: API_URL
})

const handleError = async (error: any) => {
    const data = error?.response?.data
    const originalRequest = error.config
    const isTokenExpired = error?.response?.status === 401
    const refreshToken = getLocalStorage(STORAGE_KEY.refreshToken)

    if (error?.response?.status === 403) {
        return (window.location.href = '/403');
    }
    if (isTokenExpired && refreshToken && !originalRequest._retry) {
        originalRequest._retry = true

        try {
            const { token: access_token, refreshToken: refresh_token } = await exchangeToken(refreshToken)

            setLocalStorage(STORAGE_KEY.accessToken, access_token)
            setLocalStorage(STORAGE_KEY.refreshToken, refresh_token)

            originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${access_token}`
            }

            return await request(originalRequest)
        } catch (error) {
            removeLocalStorage(STORAGE_KEY.accessToken)
            removeLocalStorage(STORAGE_KEY.refreshToken)
            toast.dismiss()
            toast.error('Your session has expired. Please login again.')
            window.location.href = '/login'
            return Promise.reject(data)
        }
    }

    return Promise.reject(data)
}

const handleSuccess = (res: AxiosResponse) => {
    return res
}

const handleRequest = (config : any) => {
    const token = getLocalStorage(STORAGE_KEY.accessToken)

    if (token) {
        config = {
            ...config,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    }

    return config
}

request.interceptors.response.use(handleSuccess, handleError)

request.interceptors.request.use(handleRequest, error => Promise.reject(error))

