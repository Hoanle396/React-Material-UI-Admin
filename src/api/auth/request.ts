import { request } from "../axios"
import { IUser } from "./interface"

export const loginRequest = async (token: string) => {
    const { data } = await request({
        url: '/auth/login',
        method: 'POST',
        data: { token }
    })
    return data
}
export const getUser = async (): Promise<IUser> => {
    const { data } = await request({
        url: '/auth/info',
        method: 'GET'
    })
    return data
}
