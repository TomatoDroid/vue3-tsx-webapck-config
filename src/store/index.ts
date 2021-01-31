import { createStore, createLogger } from 'vuex';

const store = createStore({
  devtools: true,
  plugins: [createLogger()],
});

export default store;
