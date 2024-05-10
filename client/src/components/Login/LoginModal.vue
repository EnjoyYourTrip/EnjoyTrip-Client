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
import { useStore } from 'vuex';
import { Login } from '@/api/member.js';
import { useRouter } from 'vue-router';
const credentials = ref({
  id: '',
  password: '',
});

const store = useStore(); // 스토어 사용을 위한 훅
const router = useRouter(); // 라우터 사용을 위한 훅

const login = async () => {
  try {
    const response = await Login(
      credentials.value.id,
      credentials.value.password,
    );

    if (response.status === 200) {
      console.dir(response);
      if (response.data[0].id === credentials.value.id) {
        await store.dispatch('logIn'); // 로그인 액션 디스패치
        alert(`${response.data[0].name}님 안녕하세요`);
        router.push({ name: 'home' }); // 라우터로 페이지 이동
      } else {
        console.log('가져온 아이디' + response.data[0].id);
        console.log('입력한 아이디' + credentials.value.id);

        alert('아이디 또는 비밀번호를 확인해주세요');
      }

      // alert(`${response.name}님 안녕하세요.`);
      //서버에서 로그인 성공여부?
    } else if (response.status === 404) {
      console.log('404 뜬단다 고치렴');
    } else {
      console.error('서버 꺼져있는지 확인하렴');
    }
  } catch (error) {
    console.error(error);
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
