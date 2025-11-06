const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: '0.0.0.0',
    port: 8081,
    proxy: {
      '/ai-meeting': {
        target: 'http://localhost:8001',
        changeOrigin: true,
        secure: false,
        // 不 rewrite，这样会保留 /api 前缀转发到后端
        ws: false,
      },
      '/api/app/static': {
        target: 'http://localhost:8001/ai-meeting',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/api/app/static': '/api/app/static'
        }
      }
    }
  },
  // 支持TypeScript
  configureWebpack: {
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.vue', '.json']
    }
  }
});