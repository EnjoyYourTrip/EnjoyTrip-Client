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

export function updateQnA(id, data) {
  return axios.put(`http://localhost:5000/qna/${id}`, data);
}

export function deleteQnA(id) {
  return axios.delete(`http://localhost:5000/qna/${id}`);
}
// export const qna = [
//   {
//     question_id: 1,
//     title: '제목1',
//     content: '내용1',
//     member_id: '작성자ID 1',
//     has_response: false,
//     created_date: '2024-05-11',
//     last_modified_date: '2024-05-15',
//   },
//   {
//     question_id: 2,
//     title: '제목2',
//     content: '내용2',
//     member_id: '작성자ID 2',
//     has_response: false,
//     created_date: '2024-05-12',
//     last_modified_date: '2024-05-15',
//   },
//   {
//     question_id: 3,
//     title: '제목3',
//     content: '내용3',
//     member_id: '작성자ID 3',
//     has_response: false,
//     created_date: '2024-05-13',
//     last_modified_date: '2024-05-15',
//   },
//   {
//     question_id: 4,
//     title: '제목4',
//     content: '내용4',
//     member_id: '작성자ID 4',
//     has_response: false,
//     created_date: '2024-05-14',
//     last_modified_date: '2024-05-15',
//   },
//   {
//     question_id: 5,
//     title: '제목5',
//     content: '내용5',
//     member_id: '작성자ID 5',
//     has_response: false,
//     created_date: '2024-05-15',
//     last_modified_date: '2024-05-15',
//   },
// ];
