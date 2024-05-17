import axios from 'axios';

// const BASE_URL = 'http://localhost:5000';
const BASE_URL = 'https://e15c-121-147-32-101.ngrok-free.app';

//검색한 여행지들 불러오기
export function attractionList(sido, category, text) {
  return axios.post(`${BASE_URL}/attraction/list`, {
    sidoCode: sido,
    contentTypeId: category,
    title: text,
  });
}

//뭐더라 얘?
export function getAttraction(contentId) {
  return axios.get(`${BASE_URL}/attraction`, {
    params: {
      contentId: String(contentId),
    },
  });
}

//생성한 여행계획을 서버로 전송
export function createPlan(titleText, contentText, itineraryDetailList) {
  return axios.post(`${BASE_URL}/itinerary`, {
    title: titleText,
    content: contentText,
    memberId: 1,
    itineraryDetailList: itineraryDetailList,
  });
}

//생성된 여행 계획 전체 조회
export function getPlanList() {
  console.log('이게 호출되긴해?');
  return axios.get(
    'https://e15c-121-147-32-101.ngrok-free.app/itinerary/overview',
    {
      headers: { 'ngrok-skip-browser-warning': '69420' },
    },
  );
}
//'http://localhost:5000/attraction
//여행계획 상세보기 정보 받아오기
export function getIterary(itineraryId) {
  return axios.get(`${BASE_URL}/itinerary/${itineraryId}/details`, {
    headers: { 'ngrok-skip-browser-warning': '69420' }, // 이거 헤더 씌우는거 더 공부해서 정리해놓기
  });
}
