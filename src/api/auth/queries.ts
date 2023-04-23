import { removeLocalStorage } from "@/utils/common"
import { STORAGE_KEY } from "@/utils/constant"
import { useQuery, UseQueryOptions } from "react-query"
import { useNavigate } from "react-router-dom"
import { IListUsers, IUser } from "./interface"
import { getUser, getUserById, getUsers } from "./request"
import { IPaginateData } from "../blogs"

export const useUser = (option?: UseQueryOptions<IUser, Error>, nav?: (arg: string) => void) => {
    const navigate = useNavigate()
    const { data, ...rest } = useQuery<IUser, Error>(['/me'], getUser, {
        ...option,
        // enabled: false,
        onError: () => {
            removeLocalStorage(STORAGE_KEY.accessToken)
            removeLocalStorage(STORAGE_KEY.refreshToken)
            navigate("/login")
        }
    })
    return { user: data, ...rest }
}

export const useUsers = (params:IPaginateData,option?: UseQueryOptions<IListUsers, Error>) => {
    return useQuery<IListUsers, Error>(
        ['/users'],
        ()=>getUsers(params),
        {...option}
    )
}

export const useUserById = (id:number,option?: UseQueryOptions<IUser, Error>) => {
    return useQuery<IUser, Error>(
        ['/users/[id]', id],
        ()=>getUserById(id),
        {...option}
    )
}