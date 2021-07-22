import viteSvgIcons from 'vite-plugin-svg-icons'
import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  base: '', // 设置打包路径
  plugins: [
    vue(),
    // 按需载入 Element Plus
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`
          }
        }
      ]
    }),
    viteSvgIcons({
      // 配置路劲在你的src里的svg存放文件
      iconDirs: [path.resolve(process.cwd(), 'src/icons')],
      symbolId: 'icon-[dir]-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 设置 `@` 指向 `src` 目录
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        prependData: `
          @import "@/styles/variables.scss";
          @import "@/styles/mixin.scss";
        `
      }
    }
  },
  server: {
    port: 4000, // 设置服务启动端口号
    open: false, // 设置服务启动时是否自动打开浏览器
    cors: true, // 允许跨域
    // 设置代理，根据我们项目实际情况配置
    proxy: {
      '/api': {
        target: 'http://172.16.25.62',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/api/', '/api/')
      }
    }
  }
})
