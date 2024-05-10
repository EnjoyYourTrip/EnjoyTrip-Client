import { createWebHistory, createRouter } from 'vue-router';

import Home from '../views/HomeView.vue';
import Login from '../views/member/LoginView.vue';
import ListPlan from '../views/Plan/ListPlanView.vue';
import CreatePlan from '../views/Plan/CreatePlanView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/listPlan',
    name: 'listPlan',
    component: ListPlan,
  },
  {
    path: '/createPlan',
    name: 'createPlan',
    component: CreatePlan,
  },
  {
    path: '/login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
