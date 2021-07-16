import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/table',
    name: 'Table',
    redirect: '/table/index',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import(/* webpackChunkName: "async" */ '@/views/table/index.vue')
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
