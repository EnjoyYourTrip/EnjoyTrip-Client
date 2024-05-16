import axios from 'axios';

// const BASE_URL = 'http://localhost:5000';
const BASE_URL = 'https://1e5c-121-147-32-101.ngrok-free.app';
export function attractionList(sido, category, text) {
  return axios.post(`${BASE_URL}/attraction/list`, {
    sidoCode: sido,
    contentTypeId: category,
    title: text,
  });
}

export function getAttraction(contentId) {
  return axios.get(`${BASE_URL}/attraction`, {
    params: {
      contentId: String(contentId),
    },
  });
}
// https://9947-121-147-32-101.ngrok-free.app/itinerary
export function createPlan(titleText, contentText, itineraryDetailList) {
  return axios.post(`${BASE_URL}/itinerary`, {
    title: titleText,
    content: contentText,
    memberId: 1,
    itineraryDetailList: itineraryDetailList,
  });
}
