import { createApp } from 'vue';
import App from './App.vue';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import { useKakao } from 'vue3-kakao-maps/@utils';
import './assets/styles/button.css';
import './assets/styles/table.css';
useKakao('6d2b9c70d1cd0ec052d63b57957f6439');

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import router from './router/index.js';
import loginStore from './store/loginStore.js';

//pinia
import { createPinia } from 'pinia';
const pinia = createPinia();

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App)
  .use(loginStore)
  .use(router)
  .use(vuetify)
  .use(pinia)
  .mount('#app');
