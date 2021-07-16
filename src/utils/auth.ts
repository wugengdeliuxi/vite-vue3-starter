import Storage from 'good-storage'
import { tokenCookieKey } from '../store/variables'

const tokenKey = 'webToken'

export const getToken = (): string | null => {
  return localStorage.getItem(tokenKey)
}

export const setToken = (token: string): void => {
  Storage.set(tokenCookieKey, token)
  return localStorage.setItem(tokenKey, token)
}

export const removeToken = (): void => {
  Storage.remove(tokenCookieKey)
  return localStorage.removeItem(tokenKey)
}
