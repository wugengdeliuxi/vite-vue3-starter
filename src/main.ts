import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import GlobalTable from '@/components/Base/GlobalTable/index.vue'
import GlobalSearch from '@/components/Base/GlobalSearch/index.vue'
import App from './App.vue'

import router from './router/index'
import store, { key } from './store/index'
// svg icons
import 'virtual:svg-icons-register'
// 用户验证
import './permission'
// 全局 css
import '@/styles/index.scss'
// 获取store里存储的size
const { size } = store.state.app

createApp(App)
  .use(store, key)
  .use(router)
  .use(ElementPlus, { size })
  .component('GlobalTable', GlobalTable)
  .component('GlobalSearch', GlobalSearch)
  .mount('#app')
