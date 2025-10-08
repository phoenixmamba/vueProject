import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import News from '@/pages/News.vue'

//创建路由器
const router = createRouter({
  history: createWebHistory(), //路由器的工作模式
  routes: [
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/about',
      component: About,
    },
    {
      path: '/news',
      component: News,
    },
  ],
})

//暴露出去router
export default router
