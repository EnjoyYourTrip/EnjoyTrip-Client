import axios from 'axios';

const BASE_URL = 'http://localhost:5000';
// const BASE_URL = 'https://1e5c-121-147-32-101.ngrok-free.app';

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
// https://9947-121-147-32-101.ngrok-free.app/itinerary

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
  return axios.get(`${BASE_URL}/attraction`);
}
