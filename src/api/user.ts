import axios from '@/utils/axios'
import { Profile } from '@/store/modules/user'
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

export const getUserInfo = (): Promise<ApiResponse<Profile>> => {
  return axios.get('/api/web/users/login-by-token')
}
