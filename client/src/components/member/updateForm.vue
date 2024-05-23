<template>
  <div class="black-bg">
    <div class="white-bg">
      <div class="login-container">
        <form @submit.prevent="update">
          <h2>회원정보 수정</h2>
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
            <label for="email">이메일</label>
            <input type="email" id="email" v-model="member.email" required />
          </div>
          <button type="submit">회원정보 수정</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useMemberStore } from '@/store/memberStore';
import { userModify } from '@/api/member';
const router = useRouter();
const memberStore = useMemberStore();

const member = ref({
  password: '',
  nickname: '',
  email: '',
});
onMounted(() => {
  console.log('수정할 정보', memberStore.userInfo.data);
  member.value.nickname = memberStore.userInfo.data.nickname;
  member.value.email = memberStore.userInfo.data.email;
});
const passwordCheck = ref('');

const passwordCheckMsg = ref('');

const textColor2 = ref('#f57878');

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

//회원 정보 수정
const update = async () => {
  await userModify(memberStore.userInfo.data.memberId, member.value);

  router.push({ name: 'user-mypage' });
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
