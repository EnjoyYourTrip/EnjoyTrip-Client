import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      isLoggedIn: false,
    };
  },
  mutations: {
    setLoginState(state, status) {
      state.isLoggedIn = status;
    },
  },
  actions: {
    logIn({ commit }) {
      commit('setLoginState', true);
    },
    logOut({ commit }) {
      commit('setLoginState', false);
    },
  },
});

export default store;
