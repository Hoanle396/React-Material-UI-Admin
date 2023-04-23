import { request } from "../axios"
import { IListBlogs, IPaginateData, IPayloadCreateBlogs } from "./types"

export const createBlog = async (payload: IPayloadCreateBlogs) => {
    const { data } = await request({
        url: '/blogs',
        method: 'POST',
        data: payload
    })
    return data
} 

export const getBlog = async (params:IPaginateData): Promise<IListBlogs> => {
    const { data } = await request({
        url: '/blogs',
        method: 'GET',
        params
    })
    return data
} 