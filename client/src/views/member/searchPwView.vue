<template>
  <div class="black-bg">
    <div class="white-bg">
      <div class="login-container">
        <form @submit.prevent="login">
          <h2>비밀번호 찾기</h2>
          <div class="input-group">
            <label for="id">이름</label>
            <input type="text" id="id" v-model="username" required />
          </div>
          <div class="input-group">
            <label for="text">이메일</label>
            <input type="text" id="password" v-model="email" required />
          </div>
          <button type="submit" @click.prevent="send">메일 발송</button>
        </form>
        <div class="forgot-password">
          <router-link to="/login"><a href="#">돌아가기</a></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { sendEmail } from '@/api/member';
const username = ref('');
const email = ref('');

const send = async () => {
  try {
    await sendEmail(
      username.value,
      email.value,
      () => {
        alert('비밀번호 재설정 이메일이 발송되었습니다.');
      },
      error => {
        throw error; // 에러를 던져 catch 블록에서 처리되도록 함
      },
    );
  } catch (error) {
    alert('이메일 발송에 실패했습니다. 다시 시도해 주세요.');
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

.white-bg {
  max-width: 360px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  animation: modal-bg-entry 0.5s ease-out;
}

.login-container {
  animation: slide-in 0.5s ease-out;
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

.forgot-password {
  margin-top: 10px;
  text-align: center;
}

.forgot-password a {
  color: #007bff;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 400px;
}
</style>
