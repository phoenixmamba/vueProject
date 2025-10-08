import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import SSEDemo from './components/SSEDemo.vue'
import Person from './components/Person.vue'
import PagedOrderDemo from './components/PagedOrderDemo.vue'

const routes: RouteRecordRaw[] = [
  { path: '/', component: Person },
  { path: '/sse', component: SSEDemo },
  { path: '/paged-order', component: PagedOrderDemo },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
