// src/api/openai.js
import axios from 'axios';

// Access the environment variable directly
const GPT_API_KEY = import.meta.env.VITE_GPT_API_KEY;

export const generateTravelPlan = async (content, selectedAttractions) => {
  // Log the API key to ensure it is being loaded
  console.log("GPT_API_KEY: ", GPT_API_KEY);
  console.log("통과했니?");
    console.log(content);
    console.log(selectedAttractions);
  // Check if the API key is correctly loaded
  if (!GPT_API_KEY) {
    throw new Error("GPT_API_KEY is not defined");
  }

  const prompt = `Create a travel plan based on the following content: ${content}. Include these attractions: ${selectedAttractions.map(a => a.title).join(', ')}.`;

  const response = await axios.post('https://api.openai.com/v1/chat/completions', {
    model: 'gpt-3.5-turbo-16k',
    messages: [
      { role: 'system', content: '너는 대한민국 전국 관광지에 능통한 여행가이자 가이드야 사용자가 지명을 입력하면 그에 맞는 여행계획을 한국어로 자세히 계획해서 작성해줘' },
      { role: 'user', content: prompt }
    ],
    max_tokens: 1500,
  }, {
    headers: {
      'Authorization': `Bearer ${GPT_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data.choices[0].message.content;
};
