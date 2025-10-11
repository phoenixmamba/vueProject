import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MeetingView from '../views/MeetingView.vue';
import NovelView from '@/views/NovelView.vue';
import AppChatPage from '@/views/AppChatPage.vue';

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
    name: 'appCreate',
    component: AppChatPage
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;