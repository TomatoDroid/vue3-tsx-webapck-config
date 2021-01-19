import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/login'),
  },
  {
    path: '/input',
    component: () => import(/* webpackChunkName: "input" */ '@/views/input'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
