const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    port: 8081,
    proxy: {
      '/ai-meeting': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        secure: true,
        // 不 rewrite，这样会保留 /api 前缀转发到后端
        ws: false,
      }
    }
  }
})