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
    const token = getToken()
    if (token) {
      // 携带token
      config.params = { ...config.params, token }
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
    const { code, msg } = response.data
    if (code !== 200) {
      // 错误提示
      ElMessage.error(msg)
      return Promise.reject(msg)
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
