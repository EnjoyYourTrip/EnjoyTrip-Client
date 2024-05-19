// import axios from 'axios';
import { localAxios } from '@/util/http-commons';

const local = localAxios();
// const BASE_URL = 'http://localhost:5000';
// const BASE_URL = 'https://e15c-121-147-32-101.ngrok-free.app';

//검색한 여행지들 불러오기
export function attractionList(sido, category, text) {
  return local.post(`/attraction/list`, {
    sidoCode: sido,
    contentTypeId: category,
    title: text,
  });
}

//뭐더라 얘?
export function getAttraction(contentId) {
  return local.get(`/attraction`, {
    params: {
      contentId: String(contentId),
    },
  });
}

//생성한 여행계획을 서버로 전송
export function createPlan(titleText, contentText, itineraryDetailList) {
  return local.post(`/itinerary`, {
    title: titleText,
    content: contentText,
    memberId: 1,
    itineraryDetailList: itineraryDetailList,
  });
}

//생성된 여행 계획 전체 조회
export function getPlanList() {
  console.log('이게 호출되긴해?');
  return local.get('/itinerary/overview', {
    headers: { 'ngrok-skip-browser-warning': '69420' },
  });
}
//'http://localhost:5000/attraction
//여행계획 상세보기 정보 받아오기
export function getIterary(itineraryId) {
  return local.get(`/itinerary/${itineraryId}/details`, {
    headers: { 'ngrok-skip-browser-warning': '69420' }, // 이거 헤더 씌우는거 더 공부해서 정리해놓기
  });
}
