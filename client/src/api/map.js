import axios from 'axios';

export function getAttraction(sido, category, text) {
  return axios.get('http://localhost:5000/attraction', {
    sido,
    category,
    text,
  });
}
