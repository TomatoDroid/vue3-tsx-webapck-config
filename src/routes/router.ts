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
      hideMenu: true,
    },
  },
  {
    path: '/',
    name: 'Root',
    redirect: '/home/welcome',
    meta: {
      title: 'Root',
      hideMenu: true,
    },
  },
  {
    path: '/home',
    name: 'Home',
    component: Layout,
    redirect: '/home/welcome',
    meta: {
      title: '首页',
    },
    children: [
      {
        path: 'welcome',
        name: 'Welcome',
        component: TestPage,
        meta: {
          title: '首页',
          icon: 'bx:bx-home',
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
      icon: 'bx:bx-home',
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
    path: '/permission',
    name: 'Permission',
    component: Layout,
    redirect: '/permission/font/page',
    meta: { title: '', icon: 'carbon:user-role' },
    children: [
      {
        path: 'font',
        name: 'Font',
        component: TestPage,
        redirect: '/permission/font/page',
        meta: { title: '基于前端权限', icon: 'carbon:user-role' },
        children: [
          {
            path: 'page',
            name: 'Page',
            component: TestPage,
            meta: { title: '页面权限' },
          },
          {
            path: 'btn',
            name: 'Btn',
            component: TestPage,
            meta: { title: '按钮权限' },
          },
          {
            path: 'auth-pageA',
            name: 'AuthPageA',
            component: TestPage,
            meta: { title: '权限测试页面' },
          },
        ],
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
      icon: 'ic:outline-settings-input-component',
    },
    children: [
      {
        path: 'basic',
        name: 'Basic',
        component: TestPage,
        meta: {
          title: 'basic',
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
      hideMenu: true,
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
