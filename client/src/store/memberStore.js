import { createPinia, defineStore } from 'pinia';

// Pinia 스토어를 정의합니다.
export const useMemberStore = defineStore('member', {
  state: () => ({
    isLoggedIn: false,
    userInfo: {},
  }),

  actions: {
    logIn(userData) {
      this.isLoggedIn = true;
      this.userInfo = userData;
    },
    logOut() {
      this.isLoggedIn = false;
      this.userInfo = {};
    },
  },
});

// Pinia 인스턴스를 생성합니다.
const pinia = createPinia();

export default pinia;
