// import axios from 'axios';
import { localAxios } from '@/util/http-commons';
// const TestURL = 'http://localhost:5000/qna';
const local = localAxios();

// 게시글 전체 조회 (페이지네이션 추가)
export function getQnA(page = 1, size = 10) {
  return localAxios().get(`/question?page=${page}&size=${size}`);
}

//게시글 상세 조회
export function getQnAById(id) {
  return local.get(`/question/${id}`);
}

//게시글 등록
export function createQnA(data) {
  return local.post('/question', data);
}

//게시글 수정
export function updateQnA(id, data) {
  return local.patch(`/question/${id}`, data);
}

export function deleteQnA(id) {
  return local.delete(`/question/${id}`);
}

// 댓글 가져오기
export function getAnswersByQnAId(qnaId) {
  return local.get(`/answer?postId=${qnaId}`);
}

// 댓글 등록
export function createAnswer(qnaId, data) {
  return local.post(`/answer`, { ...data, postId: qnaId });
}

// 답변 수정
export function updateAnswerInDb(id, data) {
  return local.patch(`/answer/${id}`, data);
}
// 답변 삭제
export function deleteAnswerFromDb(id) {
  return local.delete(`/answer/${id}`);
}
// src/api/qna.js

// 게시물의 답변 상태 업데이트
export function updateQnAResponseStatus(id, hasResponse) {
  return local.patch(`/answer/${id}`, {
    has_response: hasResponse,
  });
}
