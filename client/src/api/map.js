import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
export function attractionList(sido, category, text) {
  return axios.get('http://localhost:5000/attraction', {
    params: {
      sido,
      category,
      text,
    },
  });
}

export function getAttraction(contentId) {
  return axios.get(`${BASE_URL}/attraction`, {
    params: {
      contentId: String(contentId),
    },
  });
}
