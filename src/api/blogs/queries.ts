import { UseQueryOptions, useQuery } from 'react-query';
import { IBlogs, IComment, IListBlogs, IListComments, IPaginateData } from './types';
import { getBlog, getBlogById, getCommentById } from './request';
export const useBlogs = (params:IPaginateData,option?: UseQueryOptions<IListBlogs, Error>) => {
    return useQuery<IListBlogs, Error>(
        ['/blogs'],
        ()=>getBlog(params),
        {...option}
    )
}

export const useBlogById = (id:number,option?: UseQueryOptions<IBlogs, Error>) => {
    return useQuery<IBlogs, Error>(
        ['/blogs/[id]', id],
        ()=>getBlogById(id),
        {...option}
    )
}
export const useCommentById=(id:number,option?: UseQueryOptions<IListComments, Error>) => {
    return useQuery<IListComments, Error>(
        ['/blogs/comment/[id]', id],
        ()=>getCommentById(id),
        {...option}
    )
}