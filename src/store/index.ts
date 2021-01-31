import type { Store } from 'vuex';
import { createStore, createLogger, useStore as useBaseStore } from 'vuex';
import { InjectionKey } from 'vue';
import { tab } from './modules/tab';
import { TabStoreProps } from './modules/tab';

// define your typings for the store state
export interface RootStorePropType {
  collapsed: boolean;
}

export const storeKey: InjectionKey<Store<RootStorePropType>> = Symbol();

export interface AllStateTypes extends RootStorePropType {
  tab: TabStoreProps;
}

// 自定义类型的useStore
export function useStore<T = AllStateTypes>() {
  return useBaseStore<T>(storeKey);
}

const store = createStore<RootStorePropType>({
  state() {
    return {
      collapsed: false,
    };
  },
  mutations: {
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
  },
  modules: {
    tab,
  },
  devtools: true,
  plugins: [createLogger()],
});

export default store;
