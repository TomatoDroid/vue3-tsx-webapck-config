import type { RouteLocationNormalized } from 'vue-router';
import type { Module } from 'vuex';
import type { RootStorePropType } from '../index';

export interface TabStoreProps {
  tabsState: RouteLocationNormalized[];
}
export const tab: Module<TabStoreProps, RootStorePropType> = {
  namespaced: true,
  state: {
    tabsState: [],
  },
  getters: {
    getTabsState(state) {
      return state.tabsState;
    },
  },
  mutations: {
    commitTabRoutesState(state, route: RouteLocationNormalized) {
      state.tabsState.push(route);
    },
  },
  actions: {
    addTabAction({ commit }, route: RouteLocationNormalized) {
      commit('commitTabRoutesState', route);
    },
  },
};
