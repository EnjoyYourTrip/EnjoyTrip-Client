import axios from 'axios'

// Access the environment variable directly
const GPT_API_KEY = import.meta.env.VITE_GPT_API_KEY;

export const generateTravelPlan = async (content, selectedAttractions) => {
  // Log the API key to ensure it is being loaded
  console.log('GPT_API_KEY: ', GPT_API_KEY);
  console.log(content);
  console.log(selectedAttractions);

  // Check if the API key is correctly loaded
  if (!GPT_API_KEY) {
    throw new Error('GPT_API_KEY is not defined');
  }

  const attractionNames = selectedAttractions.map((attraction) => attraction.title).join(', ');
  const prompt = `내가 여행을 갈 관광지명은 다음과 같아: ${attractionNames}. 너가 이 여행지들을 모두 이용하여 여행계획을 작성해줘
  구체적으로 장소명을 언급해서 추천해줬으면 좋겠어. 가독성 좋게 줄바꿈도 잘해줘`

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-3.5-turbo-16k',
      messages: [
        {
          role: 'system',
          content:
            '너는 대한민국 전국 관광지에 능통한 여행가이자 가이드야. 사용자가 지명을 입력하면 그에 맞는 여행계획을 한국어로 자세히 계획해서 작성해줘.'
        },
        { role: 'user', content: prompt },
      ],
      max_tokens: 1500,
    },
    {
      headers: {
        Authorization: `Bearer ${GPT_API_KEY}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return response.data.choices[0].message.content;
};

// import OpenAI from 'openai'

// const openai = new OpenAI({
//   apiKey: import.meta.env.VITE_GPT_API_KEY,
//   dangerouslyAllowBrowser: true
// })

// export const generateTravelPlan = async (content, selectedAttractions) => {
//   console.log('API Key:', import.meta.env.VITE_OPENAI_API_KEY)
//   console.log('Content:', content)
//   console.log('Selected Attractions:', selectedAttractions)

//   const attractionNames = selectedAttractions.map((attraction) => attraction.title).join(', ')
//   const prompt = `내가 여행을 갈 관광지명은 다음과 같아: ${attractionNames}. 너가 이 여행지들을 모두 이용하여 여행계획을 작성해줘`

//   try {
//     const response = await openai.chat.completions.create({
//       messages: [
//         {
//           role: 'user',
//           content: prompt
//         }
//       ],
//       model: 'gpt-3.5-turbo',
//       max_tokens: 1500
//     })

//     return response.choices[0].message.content
//   } catch (error) {
//     console.error('Error generating travel plan:', error)
//     throw error
//   }
// }
