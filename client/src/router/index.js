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
import UserMypage from '@/views/member/MypageView.vue';
import { useMemberStore } from '@/store/memberStore';
import HotplaceView from '@/views/HotPlaceView.vue';
const onlyAuthUser = async (to, from, next) => {
  const memberStore = useMemberStore();
  let token = sessionStorage.getItem('accessToken');
  console.log(
    '로그인 처리 전================================',
    memberStore.userInfo,
    token,
  );

  if (memberStore.userInfo != null && token) {
    console.log('토큰 유효성 체크');
    await memberStore.getUserInfo(token);
  }
  if (!memberStore.isValidToken || memberStore.userInfo === null) {
    alert('로그인이 필요한 페이지입니다.');
    // next({ name: "login" });
    router.push({ name: 'login' }); // 로그인되지 않은 사용자라면 로그인창으로 이동시키기
  } else {
    console.log('로그인 했다!');
    next();
  }
};
//현재 경로들이 다 나눠져있는데, 경로들끼리 연관관계 리펙토링 예정 -> 다 바꿔야돼서 보류
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/mypage',
    name: 'user-mypage',
    beforeEnter: onlyAuthUser, //마이페이지 전에 로그인 여부파악
    component: UserMypage,
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
    beforeEnter: onlyAuthUser, // 여행계획 생성 전에 로그인 확인
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
    beforeEnter: onlyAuthUser, // qna 생성 전에 로그인 여부 파악하기
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
    beforeEnter: onlyAuthUser, // qna 수정 전에 로그인여부 파악하기
    component: QnAEdit,
  },
  //hotplace 연관관계 표현
  {
    path: '/hotplace',
    name: 'hotplace',

    component: HotplaceView,
    redirect: { name: 'hotplace-list' },
    children: [
      {
        path: 'list',
        name: 'hotplace-list',
        component: () => import('@/components/hotplace/HotplaceList.vue'),
      },
      {
        path: 'write',
        name: 'hotplace-write',
        beforeEnter: onlyAuthUser,
        component: () => import('@/components/hotplace/HotplaceWrite.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
