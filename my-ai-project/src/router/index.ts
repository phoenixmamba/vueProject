import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MeetingView from '../views/MeetingView.vue';
import NovelView from '../views/NovelView.vue';
import AppChatPage from '../views/AppChatPage.vue';
import AppCreateView from '../views/AppCreateView.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/meeting',
    name: 'meeting',
    component: MeetingView
  },
  {
    path: '/novel',
    name: 'novel',
    component: NovelView
  },
  {
    path: '/app/create',
    name: 'AppCreate',
    component: AppCreateView
  },
  {
    path: '/app/:id',
    name: 'AppChat',
    component: AppChatPage,
    props: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;