import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

// https://vite.dev/config/
export default defineConfig({
  base: '/myapp/',
  // 开发服务器配置：端口、主机、以及代理（proxy）示例
  // 仅在 `npm run dev` (vite dev server) 时生效
  server: {
    // 本地开发端口，如果你希望使用 8090，可改为 8090
    port: 8010,
    // 允许局域网和外部设备访问开发服务器（可选）
    host: '0.0.0.0',
    // 代理示例：把以 /api 开头的请求转发到后端服务（例如 http://localhost:3000）
    // 常用选项：changeOrigin（修改请求 Host）、rewrite（重写路径）、secure（是否验证 TLS 证书）
    proxy: {
      // 把以 /api 开头的请求转发到 https://dog.ceo
      // 示例：/api/breeds/image/random -> https://dog.ceo/api/breeds/image/random
      '/api': {
        target: 'https://dog.ceo',
        changeOrigin: true,
        secure: true,
        // 不 rewrite，这样会保留 /api 前缀转发到后端
        ws: false,
      },
    }
  },
  plugins: [vue(), vueDevTools(), vueSetupExtend()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
