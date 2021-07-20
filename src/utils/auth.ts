import Storage from 'good-storage'

const tokenKey = 'webToken'

export const getToken = (): string | null => {
  return localStorage.getItem(tokenKey)
}

export const setToken = (token: string): void => {
  Storage.set(tokenKey, token)
  return localStorage.setItem(tokenKey, token)
}

export const removeToken = (): void => {
  Storage.remove(tokenKey)
  return localStorage.removeItem(tokenKey)
}
