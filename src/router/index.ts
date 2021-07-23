import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/access',
    component: Layout,
    meta: {
      title: '基础表单',
      icon: 'access',
      alwaysShow: true,
      hidden: true
    },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import(/* webpackChunkName: "async" */ '@/views/table/index.vue'),
        meta: {
          title: '基础表单'
        }
      }
    ]
  },
  {
    path: '/access',
    redirect: '/access/list',
    component: Layout,
    meta: {
      title: '场景接入点',
      icon: 'access'
    },
    children: [
      {
        path: 'list',
        name: 'AccessList',
        component: () => import(/* webpackChunkName: "async" */ '@/views/access-list/index.vue'),
        meta: {
          title: '接入点列表'
        }
      },
      {
        path: 'add',
        name: 'AccessAdd',
        component: () => import(/* webpackChunkName: "async" */ '@/views/access-add/index.vue'),
        meta: {
          title: '接入点新增'
        }
      }
    ]
  },
  {
    path: '/case',
    redirect: '/case/list',
    component: Layout,
    meta: {
      title: '场景案件',
      icon: 'case',
      alwaysShow: true
    },
    children: [
      {
        path: 'list',
        name: 'CaseList',
        component: () => import(/* webpackChunkName: "async" */ '@/views/case-list/index.vue'),
        meta: {
          title: '场景案件列表'
        }
      }
    ]
  },
  {
    path: '/repeat',
    redirect: '/repeat/list',
    component: Layout,
    meta: {
      title: '信息重发',
      icon: 'repeat',
      alwaysShow: true
    },
    children: [
      {
        path: 'list',
        name: 'RepeatList',
        component: () => import(/* webpackChunkName: "async" */ '@/views/repeat-list/index.vue'),
        meta: {
          title: '信息重发列表'
        }
      }
    ]
  },
  {
    path: '/simulation',
    redirect: '/simulation/hotline',
    component: Layout,
    meta: {
      title: '热线模拟',
      icon: 'simulation',
      alwaysShow: true
    },
    children: [
      {
        path: 'list',
        name: 'SimulationHotline',
        component: () =>
          import(/* webpackChunkName: "async" */ '@/views/simulation-hotline/index.vue'),
        meta: {
          title: '热线模拟'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "async" */ '@/views/login/index.vue'),
    meta: {
      hidden: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
