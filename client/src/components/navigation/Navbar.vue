<template>
  <nav id="navbar-example2" class="navbar bg-body-tertiary px-3 mb-0">
    <!-- Removed mb-3 -->
    <router-link to="/" class="navbar-brand">TripHelper</router-link>
    <button class="navbar-toggler" type="button" @click="toggleMenu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <ul class="nav nav-pills nav-container">
      <li class="nav-item">
        <router-link to="/listPlan" class="nav-link">여행지 계획</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/hotplace/list" class="nav-link"
          >핫플레이스</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/QnAList" class="nav-link">QnA</router-link>
      </li>
      <template v-for="item in visibleMenuList" :key="item.routeName">
        <li class="nav-item" v-if="item.routeName === 'user-mypage'">
          <router-link :to="{ name: item.routeName }" class="nav-link">{{
            item.name
          }}</router-link>
        </li>
        <li class="nav-item" v-else-if="item.routeName === 'user-logout'">
          <button class="nav-link" @click="logout">{{ item.name }}</button>
        </li>
        <li class="nav-item" v-else>
          <router-link :to="{ name: item.routeName }" class="nav-link">{{
            item.name
          }}</router-link>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useMenuStore } from '@/store/menuStore';
import { useRouter } from 'vue-router';
import { useMemberStore } from '@/store/memberStore';

const menuStore = useMenuStore();
const router = useRouter();
const memberStore = useMemberStore();
const visibleMenuList = computed(() =>
  menuStore.menuList.filter(item => item.show),
);
const menuVisible = ref(false);

const toggleMenu = () => {
  menuVisible.value = !menuVisible.value;
};

const logout = () => {
  //로그아웃할 때 memberId가 null 되는 오류
  console.log('로그아웃할 때 넘길 memberId', memberStore);
  menuStore.logout();
  memberStore.userLogout(memberStore.userInfo.memberId);
  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('menuStore');
  alert('로그아웃 되었습니다.');
  router.push({ name: 'home' });
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#navbar-example2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #76b852 0%, #8dc26f 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  padding: 1rem 2rem;
}

.navbar-brand {
  font-size: 1.6rem;
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.3s ease-in-out;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

.nav {
  display: flex;
  list-style: none;
}

.nav-item {
  padding: 0.5rem 1rem;
}

.nav-link {
  position: relative;
  color: #ffffff;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link:focus {
  color: #dfe6e9;
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: #fff;
  transition: width 0.3s;
}

.nav-link:hover::after {
  width: 100%;
}

button.nav-link {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 1.1rem;
  transition: color 0.3s;
}

button.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

.navbar-toggler {
  display: none;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
}

.navbar-toggler-icon {
  display: block;
  width: 30px;
  height: 3px;
  background-color: #ffffff;
  position: relative;
  transition: all 0.3s ease;
}

.navbar-toggler-icon::before,
.navbar-toggler-icon::after {
  content: '';
  background-color: #ffffff;
  display: block;
  width: 30px;
  height: 3px;
  position: absolute;
  transition: all 0.3s ease;
}

.navbar-toggler-icon::before {
  transform: translateY(-10px);
}

.navbar-toggler-icon::after {
  transform: translateY(10px);
}

.nav-container {
  display: flex;
  list-style: none;
}

@media (max-width: 768px) {
  .navbar-toggler {
    display: block;
  }

  .nav-container {
    display: none;
    flex-direction: column;
    width: 100%;
  }

  .nav-item {
    width: 100%;
    text-align: center;
    padding: 1rem 0;
  }

  .nav-container.active {
    display: flex;
  }
}
</style>
