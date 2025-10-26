import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.ts'
//引入pinia
import { createPinia } from 'pinia'

//安装pinia插件
const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')
