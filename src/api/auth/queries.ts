import { removeLocalStorage } from "@/utils/common"
import { STORAGE_KEY } from "@/utils/constant"
import { useQuery, UseQueryOptions } from "react-query"
import { useNavigate } from "react-router-dom"
import { IUser } from "./interface"
import { getUser } from "./request"

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
