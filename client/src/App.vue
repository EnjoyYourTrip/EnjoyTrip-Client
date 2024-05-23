<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
    <div class="chat-container">
      <transition name="slide-fade">
        <DeepChat v-if="showChat" :initialMessages="initialMessages"/>
      </transition>
      <button class="chatbot-button" @click="toggleChat">
        <img src="/question_mark.png" alt="Chatbot Icon" />
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from './components/navigation/Navbar.vue';
import DeepChat from './components/chat/DeepChat.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    DeepChat,
  },
  data() {
    return {
      showChat: false,
      initialMessages: [
        { id: 1, role: 'system', text: '세계 최고의 여행 가이드야 사용자의 요구사항과 질문을 정확히 이해하고나서 친절하고 자세히 답변해줘. 답변할 때 문단의 흐름에 맞게 줄바꿈을 꼭 넣어서 응답해줘. 줄바꿈을 꼭해줘야해. 가독성을 위해서.' },
        { id: 2, role: 'assistant', text: "안녕하세요 Trip-Helper입니다. 여행에 필요한 모든 궁금증을 다 물어보세요!" },
      ],
    };
  },
  methods: {
    toggleChat() {
      this.showChat = !this.showChat;
    },
  },
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}

.chat-container {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.deep-chat-wrapper {
  width: 350px;
  height: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  overflow: hidden;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
}

.chatbot-button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 12px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  width: 60px;
  height: 60px;
  transition: background-color 0.3s, transform 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chatbot-button img {
  width: 36px;
  height: 36px;
}

.chatbot-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

* {
  font-family: 'CustomFont', sans-serif;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
