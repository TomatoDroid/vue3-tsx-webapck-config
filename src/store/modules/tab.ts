import type { RouteLocationNormalized } from 'vue-router';
import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from 'vuex-module-decorators';
import store from '@/store/index';

@Module({ name: 'tab', dynamic: true, store })
class Tab extends VuexModule {
  tabsState: RouteLocationNormalized[] = [];

  get getTabsState(): RouteLocationNormalized[] {
    return this.tabsState;
  }

  @Mutation
  commitTabRoutesState(route: RouteLocationNormalized): void {
    this.tabsState.push(route);
  }

  @Action
  addTabAction(route: RouteLocationNormalized): void {
    this.commitTabRoutesState(route);
  }
}

export const tabStore = getModule(Tab);
