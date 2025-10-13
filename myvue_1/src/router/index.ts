import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import News from '@/pages/News.vue'
import NewsDetail from '@/pages/NewsDetail.vue'
import Dog from '@/pages/Dog.vue'
import Login from '@/pages/Login.vue'
import NovelDemo from '@/pages/NovelDemo.vue'
import PiniaTest from '@/pages/PiniaTest.vue'

//创建路由器
const router = createRouter({
  history: createWebHistory('/myapp/'), //路由器的工作模式，设置基路径为 /myapp/
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
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
      children: [
        {
          path: 'detail/:id',
          name: 'newsDetail',
          component: NewsDetail,
          //第一种写法，将路由params参数作为props传递给组件
          //props: true,
          //第二种写法，函数写法，自己决定将哪些参数作为props传递给组件
          // props(route) {
          //   return { id: route.params.id }
          // },
          props(route) {
            return route.params
          },
          //第三种写法，直接传递一个对象，组件收到的是死数据
          // props: { id: '001', title: '新闻标题001', content: '新闻内容001' },
        },
      ],
    },
    {
      path: '/dog',
      name: 'dog',
      component: Dog,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/novel',
      name: 'novel',
      component: NovelDemo,
    },
    {
      path: '/piniaTest',
      name: 'piniaTest',
      component: PiniaTest,
    },
  ],
})

// 添加全局前置路由守卫
router.beforeEach((to, from, next) => {
  // 实际项目中这里会检查用户的登录状态
  // 比如检查 localStorage 或 Vuex 中是否有用户信息
  console.log('导航守卫：检查用户是否登录')

  // 检查用户是否已登录
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'

  // 检查登录是否过期 (30分钟有效期)
  const loginTime = localStorage.getItem('loginTime')
  const currentTime = Date.now()
  const isExpired = loginTime && currentTime - parseInt(loginTime) > 30 * 60 * 1000 // 30分钟

  // 如果访问的是登录页面，直接放行
  if (to.name === 'login') {
    next()
    return
  }

  // 对于其他页面，检查是否已登录且未过期
  if (isLoggedIn && !isExpired) {
    next() // 允许访问
  } else {
    // 未登录或已过期则重定向到登录页
    // 清除过期的登录信息
    if (isExpired) {
      localStorage.removeItem('isLoggedIn')
      localStorage.removeItem('username')
      localStorage.removeItem('loginTime')
    }
    next({ name: 'login' })
  }
})

//暴露出去router
export default router
