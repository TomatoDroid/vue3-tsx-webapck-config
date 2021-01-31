import { AppRouteRecordRaw } from '@/routes/types';

export default function (
  routes: AppRouteRecordRaw[]
): { menus: AppRouteRecordRaw[] } {
  const menus = [];
  for (const route of routes) {
    !route.meta.hideMenu &&
      menus.push(transformMenu(recursionJionMenuPath(route)));
  }
  return {
    menus,
  };
}
/**
 * 拼接子菜单菜单路径
 * @param menu
 * @param parentPath
 */
function recursionJionMenuPath(menu: AppRouteRecordRaw, parentPath = '') {
  parentPath = parentPath ? `${parentPath}/${menu.path}` : menu.path;
  if (menu.children) {
    menu.children.forEach((child) => {
      recursionJionMenuPath(child, parentPath);
    });
  }
  menu.path = parentPath;
  return menu;
}

/**
 * {
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
  这样的菜单只显示children的
 * @param route
 */
export function transformMenu(route: AppRouteRecordRaw): AppRouteRecordRaw {
  if (!route.children) {
    return route;
  }
  const showMenus = route.children.filter((child) => !child.meta.hideMenu);
  if (showMenus.length === 1) {
    return transformMenu(showMenus[0]);
  } else {
    route.children = route.children.map((child) => transformMenu(child));
  }
  return route;
}
