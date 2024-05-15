import { createPinia, defineStore } from 'pinia';
import { ref } from 'vue';
// Pinia 스토어를 정의합니다.
export const useMemberStore = defineStore('member', {
  state: () => ({
    isLoggedIn: ref(false),
    userInfo: ref({}),
  }),

  actions: {
    logIn(userData) {
      this.isLoggedIn.value = true;
      this.userInfo.value = userData;
    },
    logOut() {
      this.isLoggedIn.value = false;
      this.userInfo.value = {};
    },
  },
});

// Pinia 인스턴스를 생성합니다.
const pinia = createPinia();

export default pinia;
