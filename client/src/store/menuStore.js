import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useMenuStore = defineStore('menuStore', () => {
  const menuList = ref([
    { name: '로그인', show: true, routeName: 'login' },
    { name: '회원가입', show: true, routeName: 'regist' },
    { name: '마이페이지', show: false, routeName: 'user-mypage' },
    { name: '로그아웃', show: false, routeName: 'user-logout' },
  ]);

  const changeMenuState = isLoggedIn => {
    menuList.value = menuList.value.map(item => {
      if (item.routeName === 'regist' || item.routeName === 'login') {
        return { ...item, show: !isLoggedIn };
      } else if (
        item.routeName === 'user-logout' ||
        item.routeName === 'user-mypage'
      ) {
        return { ...item, show: isLoggedIn };
      }
      return item;
    });
  };

  const logout = () => {
    changeMenuState(false);
  };

  return {
    menuList,
    changeMenuState,
    logout,
  };
});
