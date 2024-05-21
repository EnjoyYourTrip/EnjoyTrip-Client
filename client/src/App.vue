<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
    <div class="chat-container">
      <transition name="slide-fade">
        <div v-if="showChat" class="deep-chat-wrapper">
          <deep-chat
            class="deep-chat"
            :demo="true"
            :textInput="{ placeholder: { text: 'Welcome to the demo!' } }"
            :initialMessages="initialMessages"
          />
        </div>
      </transition>
      <button class="chatbot-button" @click="toggleChat">
        챗봇이랑 채팅하기
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from './components/navigation/Navbar.vue';
import 'deep-chat';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data() {
    return {
      showChat: false,
      initialMessages: [
        { role: 'user', text: 'Hey, how are you today?' },
        { role: 'ai', text: 'I am doing very well!' },
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
  margin: 0; /* Remove top margin */
  padding: 0; /* Remove top padding */
}

.chat-container {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Align items to the right */
}

.deep-chat-wrapper {
  width: 350px;
  margin-bottom: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
}

.deep-chat {
  width: 100%;
  height: 500px; /* Adjusted the height to 500px */
}

.chatbot-button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 30px;
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  width: 360px; /* Set the width to 360px */
  transition:
    background-color 0.3s,
    transform 0.3s;
  position: relative;
  bottom: 0;
}

.chatbot-button:hover {
  background-color: #45a049;
  transform: translateY(0); /* Remove the translate effect on hover */
}

* {
  font-family: 'CustomFont', sans-serif;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}

.slide-fade-enter,
.slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(10px);
}
</style>
