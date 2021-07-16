// 判断路径是不是带协议的外链
// eslint-disable-next-line
export const isExternal = (path: string): boolean => {
  return /^(https?:|mailto:|tel:)/.test(path)
}
