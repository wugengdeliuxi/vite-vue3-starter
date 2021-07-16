import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'

import router from './router/index'
import store, { key } from './store/index'
// svg icons
import 'virtual:svg-icons-register'
// 用户验证
import './permission'
// 全局 css
import '@/styles/index.scss'

createApp(App).use(store, key).use(router).use(ElementPlus).mount('#app')
