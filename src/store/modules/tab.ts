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

@Module({ name: 'tab', dynamic: true, store })
class Tab extends VuexModule {
  tabsState: RouteLocationNormalized[] = [];

  tabActiveKey = '';

  get getTabsState(): RouteLocationNormalized[] {
    return this.tabsState;
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
