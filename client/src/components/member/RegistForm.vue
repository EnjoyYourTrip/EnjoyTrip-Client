<template>
  <div class="black-bg">
    <div class="white-bg">
      <div class="login-container">
        <form @submit.prevent="save">
          <h2>회원가입</h2>
          <div class="input-group">
            <label for="username">아이디</label>
            <input type="text" id="id" v-model="form.id" required />
          </div>
          <div class="input-group">
            <label for="password">비밀번호</label>
            <input
              type="password"
              id="password"
              v-model="form.password"
              required
            />
          </div>
          <div class="input-group">
            <label for="password">비밀번호 확인</label>
            <input type="password" v-model="passwordCheck" required />
          </div>
          <!-- 조건을 세분화하여 메시지를 제어합니다. -->
          <p v-if="form.password && passwordCheck && !check">
            비밀번호를 일치시켜주세요.
          </p>
          <p v-else-if="form.password && passwordCheck && check">
            비밀번호가 일치합니다.
          </p>
          <div class="input-group">
            <label for="username">이름</label>
            <input type="text" v-model="form.username" required />
          </div>
          <div class="input-group">
            <label for="username">닉네임</label>
            <input type="text" v-model="form.nickname" required />
          </div>
          <div class="input-group">
            <label for="username">이메일</label>
            <input type="text" v-model="form.email" required />
          </div>
          <button type="submit">회원가입</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { regist } from '@/api/member.js';

const router = useRouter();
const form = ref({
  id: '',
  password: '',
  username: '',
  nickname: '',
  email: '',
});
const passwordCheck = ref('');
const check = ref(false);

// 비밀번호 일치 여부를 실시간으로 검사
watch(
  () => [form.value.password, passwordCheck.value],
  ([newPassword, newPasswordCheck]) => {
    check.value = newPassword === newPasswordCheck;
  },
  { immediate: true },
);

const save = async () => {
  if (check.value) {
    try {
      await regist(form.value);
      alert('회원가입 되었습니다.');
      router.push({ name: 'login' });
    } catch (error) {
      alert('중복된 아이디입니다.');
      console.error('회원가입 실패:', error);
    }
  } else {
    alert('비밀번호가 일치하지 않습니다.');
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
