<template>
  <div class="black-bg">
  <div class="white-bg">
    <!-- 닫기 버튼 -->
    <!-- <button class="close-button" @click="closeModal">X</button> -->
    
    <div class="login-container">
    <form @submit.prevent="login">
      <h2>로그인</h2>
      <!-- 아이디 입력 -->
      <div class="input-group">
        <label for="username">아이디</label>
        <input type="text" id="username" v-model="credentials.username" required>
      </div>

      <!-- 패스워드 입력 -->
      <div class="input-group">
        <label for="password">패스워드</label>
        <input type="password" id="password" v-model="credentials.password" required>
      </div>

      <!-- 로그인 버튼 -->
      <button type="submit">로그인</button>
    </form>
  </div>
  </div>
</div>
</template>

<script>
export default {
  
    data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      isSuccess: false,

    };
  },
  methods: {
  login() {
    console.log('로그인 시도:', this.credentials);
      if (this.credentials.username === 'ssafy' && this.credentials.password === '1234') {
      alert('김싸피님 안녕하세요.')
      this.$store.commit('setLoginState', true); // Vuex 상태 업데이트
      this.$router.push('/'); // vue-router를 사용한 경로 이동
    } else {
      alert('아이디 혹은 비밀번호가 틀렸습니다.');
    }
  }
}


}
</script>

<style scoped>
body {
  margin: 0;
}
div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  position: fixed;
  display: flex;
  align-items: center; /* 세로 중앙 정렬을 위한 설정 */
  justify-content: center; /* 수평 중앙 정렬을 위한 설정 */
  padding: 20px;
}
.white-bg {
  max-width: 500px; /* 모달의 최대 가로 크기를 500px로 설정 */
  width: 90%; /* 전체 너비의 90%를 차지하도록 설정 */
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
}

.input-group {
  margin-bottom: 10px;
}

input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 8px;
}

button {
  width: 100%;
  padding: 8px;
  background-color: #007BFF;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>