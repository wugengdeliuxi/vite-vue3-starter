import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/table',
    component: Layout,
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import(/* webpackChunkName: "async" */ '@/views/table/index.vue'),
        meta: {
          title: '基础表单',
          icon: 'user'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "async" */ '@/views/login/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
