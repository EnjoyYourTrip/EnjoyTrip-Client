import { createApp } from 'vue';
import App from './App.vue';
import { useKakao } from 'vue3-kakao-maps/@utils';
import './assets/styles/button.css';
import './assets/styles/table.css';
useKakao('6d2b9c70d1cd0ec052d63b57957f6439');

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router/index.js';
import loginStore from './store/loginStore.js';

createApp(App).use(loginStore).use(router).mount('#app');
