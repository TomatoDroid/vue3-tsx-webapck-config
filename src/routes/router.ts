import type { AppRouteRecordRaw } from '@/routes/types';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/index';

import TestPage from '@/views/TestPage';

export const syncRoutes: AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '@/views/login/Login'),
    meta: {
      title: '登录',
    },
  },
  {
    path: '/',
    name: 'Root',
    redirect: '/home/welcome',
    meta: {
      title: 'Root',
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Layout,
    redirect: '/home/welcome',
    meta: {
      title: '首页',
      icon: '',
    },
    children: [
      {
        path: 'welcome',
        name: 'Welcome',
        component: TestPage,
        meta: {
          title: 'welcome',
          icon: '',
        },
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Layout,
    redirect: '/dashboard/workbench',
    meta: {
      title: 'Dashboard',
      icon: '',
    },
    children: [
      {
        path: 'workbench',
        name: 'Workbench',
        component: TestPage,
        meta: {
          title: '工作台',
          icon: '',
        },
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: TestPage,
        meta: {
          title: '分析页',
          icon: '',
        },
      },
    ],
  },
  {
    path: '/comp',
    name: 'Comp',
    component: Layout,
    redirect: '/comp/basic',
    meta: {
      title: 'comp',
      icon: '',
    },
    children: [
      {
        path: 'basic',
        name: 'Basic',
        component: TestPage,
        meta: {
          title: 'basic',
          icon: '',
        },
        children: [
          {
            path: 'dmeo',
            name: 'Dmeo',
            component: TestPage,
            meta: {
              title: 'Dmeo',
            },
          },
          {
            path: 'demo1',
            name: 'Demo1',
            component: TestPage,
            meta: {
              title: 'Demo1',
            },
          },
        ],
      },
      {
        path: 'form',
        name: 'Form',
        redirect: '/comp/form/basic',
        component: TestPage,
        meta: {
          title: '表单',
          icon: '',
        },
        children: [
          {
            path: 'basic',
            name: 'FormBasicDemo',
            component: TestPage,
            meta: {
              title: '基础表单',
            },
          },
          {
            path: 'useForm',
            name: 'UseFormDemo',
            component: TestPage,
            meta: {
              title: 'useForm',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/input',
    name: 'Input',
    meta: {
      title: 'test',
      icon: '',
    },
    component: () => import(/* webpackChunkName: "input" */ '@/views/input'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  // eslint-disable-next-line prettier/prettier
  routes: syncRoutes as RouteRecordRaw[],
});

export default router;
