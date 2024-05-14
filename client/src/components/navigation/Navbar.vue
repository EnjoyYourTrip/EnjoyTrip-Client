<template>
  <nav id="navbar-example2" class="navbar bg-body-tertiary px-3 mb-3">
    <router-link to="/" class="navbar-brand">여행가고싶어요</router-link>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link to="/listPlan" class="nav-link">여행지 계획</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/" class="nav-link">핫플레이스</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/QnAList" class="nav-link">QnA</router-link>
      </li>
      <template v-if="!isLoggedIn">
        <li class="nav-item">
          <router-link to="/login" class="nav-link">로그인</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/regist" class="nav-link">회원가입</router-link>
        </li>
      </template>
      <template v-else>
        <li class="nav-item">
          <router-link to="/" class="nav-link">마이페이지</router-link>
        </li>
        <li class="nav-item">
          <button class="nav-link" @click="logout">로그아웃</button>
        </li>
      </template>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const isLoggedIn = computed(() => store.state.isLoggedIn);

const logout = async () => {
  await store.dispatch('logOut');
  alert('로그아웃 되었습니다.');
  router.push({ name: 'home' });
};
</script>
<style scoped>
/* 기본 리셋 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

/* 네비게이션 바 전체 스타일 */
#navbar-example2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #76b852 0%, #8dc26f 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  color: #ffffff;
}

/* 브랜드 로고 스타일 */
.navbar-brand {
  font-size: 1.6rem;
  color: #ffffff;
  padding: 1rem 2rem;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.3s ease-in-out;
}

.navbar-brand:hover {
  transform: scale(1.05);
}

/* 네비게이션 링크 스타일 */
.nav {
  display: flex;
  list-style: none;
}

.nav-item {
  padding: 1rem 2rem;
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
  transition: color 0.3s;
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

/* 로그아웃 버튼 호버 효과 */
button.nav-link:hover {
  background-color: #56ab2f;
  color: #2d3436;
  border-radius: 5px;
}

/* 햄버거 메뉴 스타일 */
.navbar-toggler {
  display: none; /* Initially hidden on large screens */
  cursor: pointer;
  background: transparent;
  border: none;
}

.navbar-toggler-icon {
  display: block;
  width: 30px;
  height: 3px;
  background-color: #ffffff;
  position: relative;
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

@media (max-width: 768px) {
  .navbar-toggler {
    display: block; /* Show on small screens */
  }

  .nav-container {
    display: none; /* Hide links by default on small screens */
  }

  .nav-item {
    width: 100%; /* Full width for mobile menu items */
    text-align: center;
  }
}
</style>
