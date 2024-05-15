import { createPinia, defineStore } from 'pinia';

// Pinia 스토어를 정의합니다.
export const useMainStore = defineStore('main', {
  state: () => ({
    isLoggedIn: false,
  }),
  actions: {
    logIn() {
      this.isLoggedIn = true;
    },
    logOut() {
      this.isLoggedIn = false;
    },
  },
});

// Pinia 인스턴스를 생성합니다.
const pinia = createPinia();

export default pinia;
