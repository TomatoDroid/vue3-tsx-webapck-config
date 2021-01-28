import type { RouteRecordRaw } from 'vue-router';

export interface RouteMeta {
  // title
  title: string;
  // role info
  roles?: string[];
  // wheather not to cache
  ignoreKeepAlive?: boolean;
  // icon on tab
  icon?: string;
  // Never show in breadcrumb
  hideBreadcurmb?: boolean;
  // Never show in menu
  hideMenu?: boolean;
}
// TODO
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  path: string;
  name: string;
  meta: RouteMeta;
  // component?: any;
  children?: AppRouteRecordRaw[];
}