<template>
  <div class="deep-chat-wrapper">
    <div class="deep-chat-messages">
      <div v-for="message in messages" :key="message.id" :class="['message', message.role]">
        <div class="message-content">{{ message.text }}</div>
      </div>
    </div>
    <input
      v-model="userInput"
      @keyup.enter="handleSend"
      class="deep-chat-input"
      placeholder="챗봇에게 메시지를 입력하세요"
    />
  </div>
</template>

<script>
import { ref } from 'vue';
import { sendMessageToChatGPT } from '@/api/gpt';

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

      // 사용자 메시지를 추가합니다.
      messages.value.push({ id: Date.now(), role: 'user', text: userMessage });
      userInput.value = '';

      try {
        // ChatGPT API에 요청을 보냅니다.
        const aiMessage = await sendMessageToChatGPT([
          ...messages.value.map((msg) => ({ role: msg.role, content: msg.text })),
          { role: 'user', content: userMessage },
        ]);

        // AI 응답 메시지를 추가합니다.
        messages.value.push({ id: Date.now(), role: 'ai', text: aiMessage });
      } catch (error) {
        console.error('Error sending message to ChatGPT:', error);
        messages.value.push({ id: Date.now(), role: 'ai', text: 'Error occurred while sending message to ChatGPT.' });
      }
    };

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
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.deep-chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
}

.message {
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  max-width: 80%;
  word-break: break-word;
}

.message.user {
  background-color: #d1e7dd;
  align-self: flex-end;
}

.message.ai {
  background-color: #f8d7da;
  align-self: flex-start;
}

.deep-chat-input {
  border: none;
  padding: 15px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  border-top: 1px solid #ddd;
}
</style>
