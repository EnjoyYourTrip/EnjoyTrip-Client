<template>
  <div class="black-bg">
    <div class="white-bg">
      <div class="login-container">
        <form @submit.prevent="changePassword">
          <h2>새로운 비밀번호 설정</h2>
          <div class="input-group">
            <label for="id">토큰</label>
            <input type="text" id="id" v-model="token" required />
          </div>
          <div class="input-group">
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="password" required />
          </div>
          <div class="input-group">
            <label for="password-check">비밀번호 확인</label>
            <input
              type="password"
              id="password-check"
              v-model="passwordCheck"
              required
            />
          </div>
          <button type="submit">비밀번호 변경</button>
          <p v-if="password && passwordCheck" :style="{ color: textColor2 }">
            {{ passwordCheckMsg }}
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { sendToken } from '@/api/member';
const router = useRouter();

const passwordCheck = ref('');
const password = ref('');
const token = ref('');
const passwordCheckMsg = ref('');
const textColor2 = ref('#f57878');
watch(
  () => passwordCheck.value,
  () => {
    if (password.value && passwordCheck.value) {
      if (passwordCheck.value === password.value) {
        passwordCheckMsg.value = '비밀번호가 일치합니다';
      } else {
        passwordCheckMsg.value = '비밀번호가 틀립니다';
      }
      changeColor(passwordCheckMsg.value, textColor2);
    } else {
      passwordCheckMsg.value = '';
    }
  },
);
const changeColor = (message, colorRef) => {
  if (message.includes('사용할 수 있는') || message.includes('일치합니다')) {
    colorRef.value = '#8CBDED';
  } else {
    colorRef.value = '#f57878';
  }
};

//제출시 서버로 토큰을 보내는 로직 구현

const changePassword = () => {
  if (password.value !== passwordCheck.value) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }
  sendToken(
    token.value,
    password.value,
    () => {
      alert(
        '비밀번호가 성공적으로 변경되었습니다. 로그인 페이지로 이동합니다.',
      );
      router.push({ name: 'login' });
    },
    () => {
      alert('비밀번호 변경에 실패했습니다. 다시 시도해 주세요.');
    },
  );
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
input[type='password'],
input[type='email'] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: all 0.3s;
}

input[type='text']:focus,
input[type='password']:focus,
input[type='email']:focus {
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
