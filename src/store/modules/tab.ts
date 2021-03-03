import type { RouteLocationNormalized, RouteLocationRaw } from 'vue-router';
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store/index';
import router, { REDIRECT_NAME } from '@/routes/router';
import { unref } from 'vue';
import { getRoute } from '@/routes/pageGuard';

export const PAGE_LAYOUT_KEY = '__PAGE_LAYOUT__';
@Module({ name: 'tab', dynamic: true, store })
class Tab extends VuexModule {
  tabsState: RouteLocationNormalized[] = [];

  cachedMapState = new Map<string, string[]>();

  tabActiveKey = '';

  get getTabsState(): RouteLocationNormalized[] {
    return this.tabsState;
  }

  get getCachedMapState(): Map<string, string[]> {
    return this.cachedMapState;
  }

  @Mutation
  commitTabRoutesState(route: RouteLocationNormalized): void {
    const index = this.tabsState.findIndex((item) => item.path === route.path);
    if (index < 0) {
      this.tabsState.push(route);
    }
  }

  @Mutation
  commitCloseTab(route: RouteLocationNormalized): void {
    const index = this.tabsState.findIndex((item) => item.path === route.path);
    index !== -1 && this.tabsState.splice(index, 1);
  }

  @Mutation
  commitSetActiveKey(key: string) {
    this.tabActiveKey = key;
  }

  @Mutation
  commitCachedMapState() {
    const cacheMap = new Map<string, string[]>();
    const pageCacheSet = new Set<string>();

    this.tabsState.forEach((tab) => {
      const item = getRoute(tab);
      const needCache = !item.meta.ignoreKeepAlive;
      if (!needCache) return;
      if (item.matched) {
        const matched = item.matched;
        if (!matched || matched.length < 2) return;

        const len = matched.length;
        for (let i = 0; i < len; i++) {
          const key = matched[i].name as string;

          if (i < 2) {
            pageCacheSet.add(key);
          }

          if (i < len - 1) {
            const { name, meta } = matched[i + 1];
            if (meta) {
              const mapList = cacheMap.get(key) || [];
              if (!mapList.includes(name as string)) {
                mapList.push(name as string);
              }
              cacheMap.set(key, mapList);
            }
          }
        }
      }
    });
    cacheMap.set(PAGE_LAYOUT_KEY, Array.from(pageCacheSet));
    this.cachedMapState = cacheMap;
  }

  @Action
  addTabAction(route: RouteLocationNormalized): void {
    const { path, meta, name } = route;

    if (!name || name === REDIRECT_NAME) {
      return;
    }

    const { hideTab, currentActiveMenu } = meta;

    const isHide = !hideTab ? null : currentActiveMenu;
    const p = isHide || path;
    if (this.tabActiveKey !== p) {
      this.commitSetActiveKey(p);
    }

    if (!hideTab) {
      this.commitTabRoutesState(route);
    } else {
      const parentRouter = router
        .getRoutes()
        .find((item) => item.path === currentActiveMenu);
      this.commitTabRoutesState(parentRouter as any);
    }

    this.commitCachedMapState();
  }

  @Action
  closeTabByKeyAction(key: string): void {
    const index = this.tabsState.findIndex((item) => item.path === key);
    index !== -1 && this.closeTabAction(this.tabsState[index]);
  }

  @Action
  closeTabAction(tab: RouteLocationNormalized) {
    const { currentRoute, replace } = router;
    const { path } = unref(currentRoute);

    if (path !== tab.path) {
      // 不是当前tab
      this.commitCloseTab(tab);
      return;
    }

    let toObj: RouteLocationRaw = {};
    const index = this.tabsState.findIndex((item) => item.path === path);
    if (index === 0) {
      // 排在第一个的tab
      if (this.tabsState.length === 1) {
        // 当只有一个tab的时候返回主页
        toObj = '/';
      } else {
        toObj = this.tabsState[index + 1];
      }
    } else {
      toObj = this.tabsState[index - 1];
    }
    this.commitCloseTab(tab);
    replace(toObj);
  }
}

export const tabStore = getModule(Tab);
