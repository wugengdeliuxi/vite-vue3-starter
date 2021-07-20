import { Module, MutationTree, ActionTree } from 'vuex'
import { RouteRecordRaw } from 'vue-router'
// import path from 'path'
import { routes } from '@/router'
import { IRootState } from '../index'
import { Role } from './user'
// import { MenuData } from './menu'

// 生成路由路径数组
// const generateRoutePaths = (menus: Array<MenuData>): string[] => {
//   return menus.map((menu) => menu.path)
// }
// 白名单
// const whiteList = ['/:pathMatch(.*)*']
// 生成可访问路由表
// const generateRoutes = (routes: Array<RouteRecordRaw>, routePaths: string[], basePath = '/') => {
//   const routerData: Array<RouteRecordRaw> = []
//   routes.forEach((route) => {
//     const routePath = path.resolve(basePath, route.path)

//     if (route.children) {
//       // 先看子路由 是否有匹配上的路由
//       route.children = generateRoutes(route.children, routePaths, routePath)
//     }

//     // 如果当前路由子路由 数量大于0有匹配上 或 paths中包含当面路由path 就需要把当前父路由添加上
//     if (
//       routePaths.includes(routePath) ||
//       (route.children && route.children.length >= 1) ||
//       whiteList.includes(routePath)
//     ) {
//       routerData.push(route)
//     }
//   })
//   return routerData
// }

// const filterAsyncRoutes = (menus: Array<MenuData>, routes: Array<RouteRecordRaw>) => {
//   // 生成要匹配的路由path数组
//   const routePaths = generateRoutePaths(menus)
//   // 生成匹配path的路由表
//   const routerList = generateRoutes(routes, routePaths)
//   return routerList
// }

function hasPermission(roles: Array<Role>, route: RouteRecordRaw) {
  if (route.meta && route.meta.roles) {
    return roles.some((role) => (route.meta as any).roles.includes(role))
  }
  return true
}

export function filterAsyncRoutes(routes: Array<RouteRecordRaw>, roles: Array<Role>) {
  const res: Array<RouteRecordRaw> = []

  routes.forEach((route) => {
    const tmp: RouteRecordRaw = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

// 定义state类型
export interface IPermissionState {
  routes: Array<RouteRecordRaw>
  accessRoutes: Array<RouteRecordRaw>
}

// mutations类型
type IMutations = MutationTree<IPermissionState>

// actions类型
type IActions = ActionTree<IPermissionState, IRootState>

// 定义state
const state: IPermissionState = {
  routes: [],
  accessRoutes: []
}

// 定义mutation
const mutations: IMutations = {
  SET_ROUTES(state, data: Array<RouteRecordRaw>) {
    state.routes = data
  },
  SET_ACCESS_ROUTES(state, data: Array<RouteRecordRaw>) {
    state.accessRoutes = data
  }
}

// 定义actions
const actions: IActions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve) => {
      let accessedRoutes: Array<RouteRecordRaw> = []
      if (roles.includes('admin')) {
        // 超级管理员角色
        accessedRoutes = routes
        resolve(accessedRoutes)
      } else {
        accessedRoutes = filterAsyncRoutes(routes, roles)
        commit('SET_ROUTES', accessedRoutes)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

// 定义user module
const permission: Module<IPermissionState, IRootState> = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default permission
