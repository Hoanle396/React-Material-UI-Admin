import { UseQueryOptions, useQuery } from 'react-query';
import { IListBlogs, IPaginateData } from './types';
import { getBlog } from './request';
export const useBlogs = (params:IPaginateData,option?: UseQueryOptions<IListBlogs, Error>) => {
    return useQuery<IListBlogs, Error>(
        ['/blogs'],
        ()=>getBlog(params),
        {...option}
    )
}
