import axios from '@/utils/axios'
import { ApiResponse } from './type'

interface UserLoginData {
  username: string
  password: string
}

interface LoginResponseData {
  token: string
}

export const login = (data: UserLoginData): Promise<ApiResponse<LoginResponseData>> => {
  return axios.post('/api/app/users/login', data)
}
