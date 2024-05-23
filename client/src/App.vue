<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
    <div class="chat-container">
      <transition name="slide-fade">
        <DeepChat v-if="showChat" :initialMessages="initialMessages"/>
      </transition>
      <button class="chatbot-button" @click="toggleChat">
        <i class="fa-regular fa-comments fa-xl"></i>
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from './components/navigation/Navbar.vue';
import DeepChat from './components/chat/DeepChat.vue';
import { BOT_SYSTEM_MESSAGE,BOT_ASSISTANT_MESSAGE } from '/src/api/constant.js';

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
        { id: 1, role: 'system', text: BOT_SYSTEM_MESSAGE },
        { id: 2, role: 'assistant', text: BOT_ASSISTANT_MESSAGE },
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
