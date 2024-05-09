import { createWebHistory, createRouter } from 'vue-router';

import Home from '../views/HomeView.vue';
import Login from '../views/LoginView.vue';

// import Map from '../components/Map/BoardPlan.vue'; // 이걸 어디로 옮길까
// import CreatePlan from '../components/Map/CreatePlan';

const routes = [
  {
    path: '/',
    component: Home,
  },
  // {
  //   path: '/map',
  //   component: Map,
  // },
  {
    path: '/login',
    component: Login,
  },
  // {
  //   path: '/createPlan',
  //   component: CreatePlan,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
