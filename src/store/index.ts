import { createStore } from 'vuex';

export interface StorePropType {
  collapsed: boolean;
}

const store = createStore<StorePropType>({
  state: {
    collapsed: false,
  },
  mutations: {
    toggleCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
  },
  devtools: true,
});

export default store;
