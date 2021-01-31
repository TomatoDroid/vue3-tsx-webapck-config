import {
  VuexModule,
  Module,
  Mutation,
  getModule,
} from 'vuex-module-decorators';

import store from '@/store/index';

@Module({ name: 'app', dynamic: true, store })
class App extends VuexModule {
  collapsed = false;

  get getCollapsed(): boolean {
    return this.collapsed;
  }

  @Mutation
  commitToggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
}

export const appStore = getModule(App);
