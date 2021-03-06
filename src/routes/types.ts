import type { RouteRecordRaw } from 'vue-router';

export interface RouteMeta {
  /**
   * title
   */
  title: string;
  /**
   * role info
   */
  roles?: string[];
  /**
   * wheather not to cache, but 如果想要设置缓存，则需要正router的name与组件name保持一致, 路由的component: getParentLayout(name),
   */
  ignoreKeepAlive?: boolean;
  /**
   * icon on tab
   */
  icon?: string;
  /**
   * Never show in breadcrumb
   */
  hideBreadcurmb?: boolean;
  /**
   * Never show in menu
   */
  hideMenu?: boolean;
  /**
   * fixed tab
   */
  affix?: boolean;
  /**
   *  Never show in tab
   */
  hideTab?: boolean;
  /**
   *  Currently active menu
   */
  currentActiveMenu?: string;
}
// TODO
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  path: string;
  name: string;
  meta: RouteMeta;
  // component?: any;
  children?: AppRouteRecordRaw[];
}
