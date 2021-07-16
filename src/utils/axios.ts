import axios, { AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: '/',
  timeout: 30 * 1000
})

service.interceptors.request.use(
  (config) => {
    console.log(3333)
    const token = getToken()
    if (token) {
      // 携带token
      config.headers.Authorization = token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { code, message } = response.data
    if (code !== 0) {
      // 错误提示
      ElMessage.error(message)
      return Promise.reject(message)
    }
    return response.data
  },
  (error: AxiosError) => {
    const res = error?.response
    if (res && res.status === 401) {
      // 未登录 token失效
      store.dispatch('user/resetToken').then(() => {
        window.location.reload()
      })
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
