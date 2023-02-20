import axios from "axios"
import { API_URL } from "./constant"

export const exchangeToken = async (refreshToken: string): Promise<any> => {
  const url = API_URL + '/auth/refresh-token'
  const { data } = await axios({
    url,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${refreshToken}`
    }
  })
  return data
}
