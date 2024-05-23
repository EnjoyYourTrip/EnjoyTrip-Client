<!-- <template>
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
</style> -->

<template>
  <div id="app">
    <Navbar />
    <router-view></router-view>
    <div class="chat-container">
      <transition name="slide-fade">
        <DeepChat
          v-if="showChat"
          :initialMessages="initialMessages"
        />
      </transition>
      <button class="chatbot-button" @click="toggleChat">
        챗봇이랑 채팅하기
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
/* 기존 스타일 유지 */
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
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
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
  width: 360px;
  transition: background-color 0.3s, transform 0.3s;
  position: relative;
  bottom: 0;
}

.chatbot-button:hover {
  background-color: #45a049;
  transform: translateY(0);
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
