<template>
  <div class="black-bg">
    <div class="white-bg">
      <div class="login-container">
        <form @submit.prevent="regist">
          <h2>회원가입</h2>
          <div class="input-group">
            <label for="id">아이디</label>
            <input type="text" id="id" v-model="member.id" required />
            <p v-if="member.id" :style="{ color: textColor1 }">
              {{ idcheck_msg }}
            </p>
          </div>
          <div class="input-group">
            <label for="password">비밀번호</label>
            <input
              type="password"
              id="password"
              v-model="member.password"
              required
            />
          </div>
          <div class="input-group">
            <label for="password-check">비밀번호 확인</label>
            <input
              type="password"
              id="password-check"
              v-model="passwordCheck"
              required
            />
            <p
              v-if="member.password && passwordCheck"
              :style="{ color: textColor2 }"
            >
              {{ passwordCheckMsg }}
            </p>
          </div>
          <div class="input-group">
            <label for="name">이름</label>
            <input type="text" id="name" v-model="member.name" required />
          </div>
          <div class="input-group">
            <label for="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              v-model="member.nickname"
              required
            />
          </div>

          <div class="input-group">
            <label for="email">이메일</label>
            <input type="email" id="email" v-model="member.email" required />
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
import { userRegist, idCheck } from '@/api/member.js';

const router = useRouter();

const member = ref({
  id: '',
  password: '',
  name: '',
  nickname: '',
  email: '',
});

const passwordCheck = ref('');
const idcheck_msg = ref('');
const passwordCheckMsg = ref('');
const textColor1 = ref('#8CBDED');
const textColor2 = ref('#f57878');

watch(
  () => member.value.id,
  async () => {
    if (member.value.id) {
      try {
        const { data } = await idCheck(member.value.id);
        if (data === 1) {
          idcheck_msg.value = '사용할 수 없는 아이디입니다';
        } else {
          idcheck_msg.value = '사용할 수 있는 아이디입니다';
        }
        changeColor(idcheck_msg.value, textColor1);
      } catch (error) {
        console.error(error);
      }
    } else {
      idcheck_msg.value = '';
    }
  },
);

watch(
  () => passwordCheck.value,
  () => {
    if (member.value.password && passwordCheck.value) {
      if (passwordCheck.value === member.value.password) {
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

const regist = async () => {
  if (passwordCheck.value !== member.value.password) {
    alert('비밀번호가 일치하지 않습니다.');
    return;
  }
  try {
    const response = await userRegist(member.value);
    let msg = '회원가입에 실패했습니다';
    if (response.status === 200) msg = '회원가입에 성공했습니다';
    alert(msg);

    if (response.status === 200) {
      router.push({ name: 'login' });
    }
  } catch (error) {
    console.error('회원가입 실패:', error);
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
