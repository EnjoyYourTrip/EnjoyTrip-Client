<template>
  <div class="black-bg">
    <div class="white-bg">
      <div class="login-container">
        <form @submit.prevent="login">
          <h2>로그인</h2>
          <div class="input-group">
            <label for="id">아이디</label>
            <input type="text" id="id" v-model="loginUser.id" required />
          </div>
          <div class="input-group">
            <label for="password">비밀번호</label>
            <input
              type="password"
              id="password"
              v-model="loginUser.password"
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
import { storeToRefs } from 'pinia';
import { useMemberStore } from '@/store/memberStore';
import { useRouter } from 'vue-router';
import { useMenuStore } from '@/store/menuStore';

const router = useRouter();
const memberStore = useMemberStore();
const menuStore = useMenuStore();

const { isLogin } = storeToRefs(memberStore);

const loginUser = ref({
  id: '',
  password: '',
});

const { userLogin, getUserInfo } = memberStore;

const login = async () => {
  console.log('로그인 진행 중');
  await userLogin(loginUser.value);
  let token = sessionStorage.getItem('accessToken');
  if (isLogin.value) {
    console.log('로그인 성공, 토큰:', token);
    getUserInfo(token);
    menuStore.changeMenuState(true); // 로그인 상태에 따라 메뉴 상태 업데이트
    alert('로그인에 성공하셨습니다');
    router.push({ name: 'home' });
  } else {
    console.log('로그인 실패');
  }
};
</script>

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
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(5px);
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
