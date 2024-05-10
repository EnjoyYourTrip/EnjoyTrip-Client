// store/index.js
import { createStore } from 'vuex';

const store = createStore({
  state: {
    isLoggedIn: false,
  },
  mutations: {
    setLoggedIn(state, status) {
      state.isLoggedIn = status;
    },
  },
  actions: {
    logIn({ commit }) {
      commit('setLoggedIn', true);
    },
    logOut({ commit }) {
      commit('setLoggedIn', false);
    },
  },
});

export default store;
