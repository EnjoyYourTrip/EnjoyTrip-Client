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
      <button class="chatbot-button" @click="toggleChat">Chat</button>
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
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
  width: 300px; /* Adjust based on your design */
  margin-bottom: 10px; /* Space between chat UI and button */
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px; /* Rounded corners for chat UI */
  overflow: hidden; /* To ensure content doesn't overflow the corners */
}
.deep-chat {
  width: 100%;
  height: 400px; /* Adjust based on your design */
}
.chatbot-button {
  background-color: #4caf50; /* A vibrant green */
  color: white;
  border: none;
  border-radius: 30px; /* Rounded corners */
  padding: 12px 24px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
}
.chatbot-button:hover {
  background-color: #45a049; /* A slightly darker green on hover */
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
.slide-fade-enter, .slide-fade-leave-to /* .slide-fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: translateY(10px);
}
</style>
