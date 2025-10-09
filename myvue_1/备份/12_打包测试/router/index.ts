import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import News from '@/pages/News.vue'

//创建路由器
const router = createRouter({
  history: createWebHistory('/myapp/'), //路由器的工作模式，设置基路径为 /myapp/
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      name: 'guanyu',
      path: '/about',
      component: About,
    },
    {
      path: '/news',
      name: 'news',
      component: News,
    },
  ],
})

//暴露出去router
export default router
