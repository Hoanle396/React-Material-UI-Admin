import { request } from "../axios"
import { IPaginateData } from "../blogs"
import { IListUsers, IPayloadCreateUser, IUser } from "./interface"

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

export const createUser = async (payload: IPayloadCreateUser) => {
    const { data } = await request({
        url: '/users',
        method: 'POST',
        data: payload
    })
    return data
} 

export const getUsers = async (params:IPaginateData): Promise<IListUsers> => {
    const { data } = await request({
        url: '/users',
        method: 'GET',
        params
    })
    return data
} 

export const deleteUser= async (id: number): Promise<any> => {
    const { data } = await request({
        url: '/users/'+id,
        method: 'DELETE',
    })
    return data
}

export const getUserById = async (id:number): Promise<IUser> => {
    const { data } = await request({
        url: '/users/'+id,
        method: 'GET',
    })
    return data
}

export const updateUser = async (payload: IPayloadCreateUser&{id:number}): Promise<any> => {
    const { data } = await request({
        url: '/users/'+payload.id,
        method: 'PATCH',
        data:payload
    })
    return data
}