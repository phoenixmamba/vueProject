import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import SSEDemo from './components/SSEDemo.vue'
// import Person from './components/Person.vue'
import PagedOrderDemo from './components/PagedOrderDemo.vue'
import NovelDemo from './components/NovelDemo.vue'

const routes: RouteRecordRaw[] = [
  // { path: '/', component: Person },
  { path: '/sse', component: SSEDemo },
  { path: '/paged-order', component: PagedOrderDemo },
  { path: '/novel', component: NovelDemo },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
