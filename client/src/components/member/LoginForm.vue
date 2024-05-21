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
          <button type="submit">로그인</button>
        </form>
        <div class="forgot-password">
          <a href="#" @click.prevent="openForgotPasswordModal">비밀번호 찾기</a>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="showForgotPasswordModal"
    class="modal-overlay"
    @click.self="closeForgotPasswordModal"
  >
    <div class="modal">
      <form @submit.prevent="submitForgotPassword">
        <h2>비밀번호 찾기</h2>
        <div class="input-group">
          <label for="username">아이디</label>
          <input
            type="text"
            id="username"
            v-model="forgotPasswordForm.username"
            required
          />
        </div>
        <div class="input-group">
          <label for="email">이메일</label>
          <input
            type="email"
            id="email"
            v-model="forgotPasswordForm.email"
            required
          />
        </div>
        <button type="submit" @click.prevent="openForgotPasswordModal">
          비밀번호 찾기
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useMemberStore } from '@/store/memberStore';
import { useMenuStore } from '@/store/menuStore';

const router = useRouter();
const memberStore = useMemberStore();
const menuStore = useMenuStore();

const { isLogin, userInfo } = storeToRefs(memberStore);

const loginUser = ref({
  id: '',
  password: '',
});

const forgotPasswordForm = ref({
  username: '',
  email: '',
});

const showForgotPasswordModal = ref(false);

const { userLogin, getUserInfo } = memberStore;

const login = async () => {
  console.log('로그인 진행 중');
  await userLogin(loginUser.value);
  let token = sessionStorage.getItem('accessToken');
  if (isLogin.value) {
    console.log('로그인 성공, 토큰:', token);
    await getUserInfo(token);
    if (userInfo.value) {
      console.log('사용자 정보 로드 완료:', userInfo.value);
      menuStore.changeMenuState(true);
      alert('로그인에 성공하셨습니다');
      router.push({ name: 'home' });
    } else {
      console.error('사용자 정보 로드 실패');
      alert('사용자 정보를 불러오는 데 실패했습니다.');
    }
  } else {
    console.log('로그인 실패');
    alert('로그인에 실패했습니다.');
  }
};

const openForgotPasswordModal = () => {
  showForgotPasswordModal.value = true;
};

const closeForgotPasswordModal = () => {
  showForgotPasswordModal.value = false;
};

const submitForgotPassword = () => {
  // 비밀번호 찾기 로직 구현
  console.log('비밀번호 찾기 요청:', forgotPasswordForm.value);
  closeForgotPasswordModal();
  alert('비밀번호 찾기 요청이 제출되었습니다.');
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
}
</style>
