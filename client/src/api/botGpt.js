import axios from 'axios';

const GPT_API_KEY = import.meta.env.VITE_GPT_API_KEY;

if (!GPT_API_KEY) {
  throw new Error('The OPENAI_API_KEY environment variable is missing or empty.');
}

export const sendMessageToChatGPT = async (messages) => {
  // 메시지 포맷을 확인합니다.
  const formattedMessages = messages
    .filter(msg => msg.content && msg.content.trim() !== '') // 빈 메시지 필터링
    .map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

  if (formattedMessages.length === 0) {
    throw new Error('All messages are empty or invalid.');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-16k',
        messages: formattedMessages,
        max_tokens: 800,
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error sending message to ChatGPT:', error.response ? error.response.data : error.message);
    throw error;
  }
};
