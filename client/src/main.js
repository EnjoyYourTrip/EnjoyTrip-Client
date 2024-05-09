import { createApp } from 'vue';
import App from './App.vue';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router/index.js';
import loginStore from './store/loginStore.js';

createApp(App).use(loginStore).use(router).mount('#app');
