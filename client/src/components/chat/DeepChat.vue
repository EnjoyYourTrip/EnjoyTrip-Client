<template>
  <div class="deep-chat-wrapper">
    <div class="deep-chat-messages">
      <div v-for="message in messages" :key="message.id" :class="['message', message.role]">
        <div class="message-content" v-html="message.text"></div>
      </div>
    </div>
    <div class="input-container">
      <input
        v-model="userInput"
        @keyup.enter="handleSend"
        class="deep-chat-input"
        placeholder="챗봇에게 메시지를 입력하세요"
      />
      <button class="send-button" @click="handleSend">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue';
import { sendMessageToChatGPT } from '@/api/botGpt';

export default {
  name: 'DeepChat',
  props: {
    initialMessages: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const messages = ref([...props.initialMessages]);
    const userInput = ref('');

    const handleSend = async () => {
      const userMessage = userInput.value.trim();
      if (userMessage === '') return;

      // 사용자 메시지를 추가.
      messages.value.push({ id: Date.now(), role: 'user', text: userMessage });
      userInput.value = '';

      nextTick(() => {
        scrollToBottom();
      });

      try {
        // ChatGPT API에 요청.
        const aiMessage = await sendMessageToChatGPT(
          messages.value
            .filter(msg => msg.text && msg.text.trim() !== '') // 빈 메시지 필터링
            .map(msg => ({ role: msg.role, content: msg.text })),
        );

        // AI 응답 메시지를 추가합니다.
        messages.value.push({ id: Date.now(), role: 'assistant', text: aiMessage.replace(/\n/g, '<br>') });

        nextTick(() => {
          scrollToBottom();
        });
      } catch (error) {
        console.error('Error sending message to ChatGPT:', error.response ? error.response.data : error.message);
        messages.value.push({ id: Date.now(), role: 'assistant', text: 'Error occurred while sending message to ChatGPT.' });

        nextTick(() => {
          scrollToBottom();
        });
      }
    };

    const scrollToBottom = () => {
      const container = document.querySelector('.deep-chat-messages');
      container.scrollTop = container.scrollHeight;
    };

    onMounted(() => {
      scrollToBottom();
    });

    return {
      messages,
      userInput,
      handleSend,
    };
  },
};
</script>

<style scoped>
.deep-chat-wrapper {
  width: 350px;
  height: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.deep-chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  max-height: 400px;
}

.message {
  padding: 10px;
  border-radius: 20px;
  margin-bottom: 10px;
  max-width: 70%;
  word-break: break-word;
  animation: fadeIn 0.5s;
}

.message.user {
  background-color: #d1e7dd;
  align-self: flex-end;
  margin-right: 10px;
  text-align: right;
}

.message.assistant {
  background-color: #f8d7da;
  align-self: flex-start;
  margin-left: 10px;
  text-align: left;
}

.message.system {
  display: none;
}

.input-container {
  display: flex;
  border-top: 1px solid #ddd;
  background-color: #f9f9f9;
  padding: 10px;
}

.deep-chat-input {
  flex: 1;
  border: none;
  padding: 10px;
  font-size: 16px;
  box-sizing: border-box;
  outline: none;
  border-radius: 20px;
  margin-right: 10px;
  background-color: #f1f1f1;
}

.deep-chat-input::placeholder {
  color: #ccc;
}

.send-button {
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.3s;
}

.send-button:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

.send-button i {
  font-size: 20px;
}

.deep-chat-messages::-webkit-scrollbar {
  width: 8px;
}

.deep-chat-messages::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.deep-chat-messages::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
