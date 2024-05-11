import axios from 'axios';

export function Login(id, password) {
  return axios.get('http://localhost:5000/members', { id, password });
}

export function regist(data) {
  return axios.post('http://localhost:5000/members', data);
}
