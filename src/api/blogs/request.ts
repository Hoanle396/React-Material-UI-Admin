import { request } from "../axios"
import { IBlogs, IListBlogs, IListComments, IPaginateData, IPayloadCreateBlogs } from "./types"

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

export const deleteBlogs = async (id: number): Promise<any> => {
    const { data } = await request({
        url: '/blogs/'+id,
        method: 'DELETE',
    })
    return data
}

export const updateBlogs = async (payload: IPayloadCreateBlogs&{id:number}): Promise<any> => {
    const { data } = await request({
        url: '/blogs/'+payload.id,
        method: 'PATCH',
    })
    return data
}

export const getBlogById = async (id:number): Promise<IBlogs> => {
    const { data } = await request({
        url: '/blogs/'+id,
        method: 'GET',
    })
    return data
}

export const getCommentById = async (id:number): Promise<IListComments>=>{
    const { data } = await request({
        url: '/blogs/comments/'+id,
        method: 'GET',
    })
    return data
}

export const postCommentById = async (id:number,{text}:{text:string}): Promise<any>=>{
    const { data } = await request({
        url: '/blogs/'+id,
        method: 'POST',
        data:{text}
    })
    return data
}

export const deleteComment = async (id: number): Promise<any> => {
    const { data } = await request({
        url: '/blogs/comment/'+id,
        method: 'DELETE',
    })
    return data
}