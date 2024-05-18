import axios from 'axios';

//게시글 전체 조회
export function getQnA() {
  return axios.get('http://localhost:5000/qna');
}

//게시글 상세 조회
export function getQnAById(id) {
  return axios.get(`http://localhost:5000/qna/${id}`);
}

//게시글 등록
export function createQnA(data) {
  return axios.post('http://localhost:5000/qna', data);
}

//게시글 수정
export function updateQnA(id, data) {
  return axios.patch(`http://localhost:5000/qna/${id}`, data);
}

export function deleteQnA(id) {
  return axios.delete(`http://localhost:5000/qna/${id}`);
}

// 댓글 가져오기
export function getAnswersByQnAId(qnaId) {
  return axios.get(`http://localhost:5000/answer?postId=${qnaId}`);
}

// 댓글 등록
export function createAnswer(qnaId, data) {
  return axios.post(`http://localhost:5000/answer`, { ...data, postId: qnaId });
}

// 답변 수정
export function updateAnswerInDb(id, data) {
  return axios.patch(`http://localhost:5000/answer/${id}`, data);
}
// 답변 삭제
export function deleteAnswerFromDb(id) {
  return axios.delete(`http://localhost:5000/answer/${id}`);
}
// src/api/qna.js

// 게시물의 답변 상태 업데이트
export function updateQnAResponseStatus(id, hasResponse) {
  return axios.patch(`http://localhost:5000/qna/${id}`, {
    has_response: hasResponse,
  });
}
