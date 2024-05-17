<template>
  <div class="black-bg">
    <div class="white-bg">
      <div class="login-container">
        <form @submit.prevent="login">
          <h2>로그인</h2>
          <div class="input-group">
            <label for="username">아이디</label>
            <input type="text" id="id" v-model="credentials.id" required />
          </div>
          <div class="input-group">
            <label for="password">비밀번호</label>
            <input
              type="password"
              id="password"
              v-model="credentials.password"
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useMemberStore } from '@/store/memberStore';
import { useMenuStore } from '@/store/menuStore';
import { Login } from '@/api/member.js';
import { useRouter } from 'vue-router';

const credentials = ref({
  id: '',
  password: '',
});

const memberStore = useMemberStore();
const menuStore = useMenuStore();
const router = useRouter();

const login = async () => {
  try {
    const response = await Login(
      credentials.value.id,
      credentials.value.password,
    );
    if (response.status === 200) {
      if (
        response.data[0].id === credentials.value.id &&
        response.data[0].password === credentials.value.password
      ) {
        memberStore.logIn(response.data[0]);
        menuStore.changeMenuState(true); // 로그인 시 메뉴 상태 업데이트
        alert(`${response.data[0].username}님 안녕하세요`);
        router.push({ name: 'home' });
      } else {
        alert('아이디 또는 비밀번호를 확인해주세요');
      }
    } else {
      console.error('서버 오류:', response.status);
    }
  } catch (error) {
    console.error('로그인 처리 중 오류 발생:', error);
    alert('로그인 처리 중 문제가 발생했습니다.');
  }
};
</script>

<style scoped>
/* 기존 스타일 유지 */
</style>

<style scoped>
body {
  margin: 0;
  font-family: 'Arial', sans-serif;
  background: url('https://example.com/travel-photo.jpg') no-repeat center
    center fixed;
  background-size: cover;
}

.black-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* Dark overlay for better readability */
  backdrop-filter: blur(5px); /* Soften the background image */
}

.white-bg {
  max-width: 360px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  animation: modal-bg-entry 0.5s ease-out;
}

@keyframes modal-bg-entry {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.login-container {
  animation: slide-in 0.5s ease-out;
}

@keyframes slide-in {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

.input-group {
  margin-bottom: 20px;
}

input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: all 0.3s;
}

input[type='text']:focus,
input[type='password']:focus {
  border-color: #007bff;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #218838;
}
</style>
