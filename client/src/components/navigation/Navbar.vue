<template>
  <nav id="navbar-example2" class="navbar bg-body-tertiary px-3 mb-3">
    <router-link to="/" class="navbar-brand">EnjoyTrip</router-link>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link to="/listPlan" class="nav-link">여행지 계획</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/" class="nav-link">공지사항</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/" class="nav-link">여행 게시판</router-link>
      </li>

      <template v-if="!isLoggedIn">
        <li class="nav-item">
          <router-link to="/login" class="nav-link">로그인</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">회원가입</router-link>
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
  background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #ffffff;
}

/* 브랜드 로고 스타일 */
.navbar-brand {
  font-size: 1.6rem;
  color: #fff;
  padding: 1rem 2rem;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.3s ease-in-out;
}

.navbar-brand:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}

/* 네비게이션 링크 스타일 */
.nav {
  display: flex;
  list-style: none;
  transition: transform 0.3s ease-in-out;
}

.nav-item {
  padding: 1rem 2rem;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  font-size: 1.1rem;
  transition:
    color 0.3s ease-in-out,
    transform 0.3s ease-in-out;
}

.nav-link:hover {
  color: #b2bec3;
  transform: translateY(-3px);
  transition:
    color 0.3s ease-in-out,
    transform 0.3s ease-in-out;
}

/* 로그아웃 버튼 호버 효과 */
button.nav-link:hover {
  background-color: #b2bec3;
  color: #2d3436;
  border-radius: 5px;
}

/* 반응형 스타일 */
@media (max-width: 768px) {
  #navbar-example2 {
    flex-direction: column;
    padding: 1rem;
  }

  .nav-item {
    width: 100%; /* 모바일 화면에서는 너비를 100%로 설정 */
    text-align: center;
  }
}
</style>
