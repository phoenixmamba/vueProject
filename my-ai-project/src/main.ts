import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// 引入Ant Design Vue图标组件
import * as Icons from '@ant-design/icons-vue';

const app = createApp(App);

app.use(router);
app.use(ElementPlus);

// 注册所有图标组件为全局组件
Object.keys(Icons).forEach(key => {
  app.component(key, (Icons as any)[key]);
});

app.mount('#app');