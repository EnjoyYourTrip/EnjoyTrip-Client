import { createWebHistory, createRouter } from 'vue-router';

import Home from '../views/HomeView.vue';
import Login from '../views/member/LoginView.vue';
import Regist from '../views/member/RegistView.vue';
import ListPlan from '../views/plan/ListPlanView.vue';
import CreatePlan from '../views/plan/CreatePlanView.vue';
import QnAList from '../views/QnA/QnAListView.vue';
import QnACreate from '../views/QnA/QnACreateView.vue';
import QnADetail from '../views/QnA/QnADetailView.vue';
import QnAEdit from '../views/QnA/QnAEditView.vue';
import PlanDetailView from '../views/plan/PlanDetailView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/regist',
    name: 'regist',
    component: Regist,
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
    path: '/detailPlan/:id',
    name: 'DetailPlan',
    component: PlanDetailView,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/QnAList',
    name: 'QnAList',
    component: QnAList,
  },
  {
    path: '/QnACreate',
    name: 'QnACreate',
    component: QnACreate,
  },
  {
    path: '/QnADetail/:id',
    name: 'QnADetail',
    component: QnADetail,
  },
  {
    path: '/QnAEdit/:id',
    name: 'QnAEdit',
    component: QnAEdit,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
