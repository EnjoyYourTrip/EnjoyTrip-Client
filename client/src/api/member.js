import axios from 'axios';
const testUrl = 'http://localhost:5000/members';

export function Login(id, password) {
  return axios.get(testUrl, { id, password });
}
