import type { AppRouteRecordRaw } from '@/routes/types';
import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/index';
import { createPageGuard } from './pageGuard';

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
        },
      },
      {
        path: 'analysis',
        name: 'Analysis',
        component: () => import('@/views/dashboard/analysis'),
        meta: {
          title: '分析页',
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
    path: '/feat',
    name: 'FeatDemo',
    component: Layout,
    redirect: '/feat/icon',
    meta: {
      title: '功能',
      icon: 'ic:outline-featured-play-list',
    },
    children: [
      {
        path: 'icon',
        name: 'Icon',
        component: () =>
          import(/* webpackChunkName: "input" */ '@/views/input'),
        meta: {
          title: '图标',
        },
      },
      {
        path: 'breadcrumb',
        name: 'BreadcrumbDemo',
        redirect: '/feat/breadcrumb/flat',
        component: () =>
          import(
            /* webpackChunkName: "ParentView" */ '@/layout/page/ParentView'
          ),
        meta: {
          title: '面包屑导航',
        },
        children: [
          {
            path: 'flat',
            name: 'BreadcrumbFlatDemo',
            component: () =>
              import(
                /* webpackChunkName: "FlatListDetail" */ '@/views/demo/feat/breadcrumb/FlatListDetail'
              ),
            meta: {
              title: '平级模式',
            },
          },
          {
            path: 'children',
            name: 'BreadcrumbChildrenDemo',
            redirect: '/feat/breadcrumb/children',
            component: () =>
              import(
                /* webpackChunkName: "ParentView" */ '@/layout/page/ParentView'
              ),
            meta: {
              title: '层级详情',
            },
            children: [
              {
                path: '',
                name: 'BreadcrumbChildren',
                component: () =>
                  import(
                    /* webpackChunkName: "ChildrenList" */ '@/views/demo/feat/breadcrumb/ChildrenList'
                  ),
                meta: {
                  title: '层级列表',
                },
              },
              {
                path: 'childrenDetail',
                name: 'BreadcrumbChildrenDetailDemo',
                component: () =>
                  import(
                    /* webpackChunkName: "ChildrenListDetail" */ '@/views/demo/feat/breadcrumb/ChildrenListDetail'
                  ),
                meta: {
                  title: '层级列表详情',
                  hideMenu: true,
                  hideTab: true,
                  currentActiveMenu: '/feat/breadcrumb/children',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/input',
    name: 'Input',
    meta: {
      title: 'tst',
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

createPageGuard(router);

export default router;
