import axios from 'axios'

const GPT_API_KEY = import.meta.env.VITE_OPENAI_API_KEY

if (!GPT_API_KEY) {
  throw new Error('The OPENAI_API_KEY environment variable is missing or empty.')
}

export const sendMessageToChatGPT = async (messages) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 150
      },
      {
        headers: {
          Authorization: `Bearer ${GPT_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    )

    return response.data.choices[0].message.content
  } catch (error) {
    console.error('Error sending message to ChatGPT:', error)
    throw error
  }
}
