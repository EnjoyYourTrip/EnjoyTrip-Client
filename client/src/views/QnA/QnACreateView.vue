<template>
  <div>
    <h2>QnA 등록</h2>
    <hr class="my-4" />
    <form @submit.prevent="save">
      <!-- form 제출 이벤트를 가로채 save 함수 실행 -->
      <div class="mb-3">
        <label for="title" class="form-label">제목</label>
        <input
          v-model="form.title"
          type="text"
          class="form-control"
          id="title"
          required
        />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">내용</label>
        <textarea
          v-model="form.content"
          class="form-control"
          id="content"
          rows="12"
          required
        ></textarea>
      </div>
      <div class="pt-4">
        <button type="button" class="btn-outline-dark me-2" @click="goList">
          취소
        </button>
        <button type="submit">등록</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { createQnA } from '@/api/qna';
const router = useRouter();

const form = ref({
  title: null,
  content: null,
});
const currentDate = new Date().toISOString().substring(0, 10);
const save = () => {
  const data = {
    //서버 연결 전에 데이터 형식에 맞게 수정하렴
    ...form.value,
    created_date: currentDate, // 날짜와 시간을 기록
    member_id: '김싸피',
    has_response: false,
    last_modified_date: currentDate,
  };
  createQnA(data)
    .then(() => {
      router.push({ name: 'QnAList' }); // 성공 시 QnA 목록 페이지로 이동
    })
    .catch(error => {
      console.error('Error creating QnA:', error); // 에러 처리
    });
};

function goList() {
  router.push({ name: 'QnAList' });
}
</script>
<style lang="scss" scoped>
div {
  max-width: 700px; // 폼의 최대 너비
  margin: 20px auto; // 폼의 위치
  padding: 20px; // 내부 패딩
  background-color: #fff; // 배경 색상
  border-radius: 4px; // 모서리 둥글기

  h2 {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; // 폰트 패밀리 설정
    font-size: 28px; // 폰트 크기
    font-weight: 500; // 폰트 두께
    color: #2c3e50; // 폰트 색상
    text-align: center; // 텍스트 중앙 정렬
    margin-bottom: 20px; // 마진
  }

  .form-label {
    font-family: 'Arial', sans-serif; // 폰트 패밀리
    color: #34495e; // 색상 설정
    font-size: 18px; // 폰트 크기
    font-weight: bold; // 글자 두께
    margin-bottom: 10px; // 레이블과 입력 필드 간 간격
  }

  .form-control {
    font-family: 'Arial', sans-serif; // 폰트 패밀리
    padding: 10px 12px; // 패딩
    background-color: #ecf0f1; // 배경 색상
    border: 1px solid #bdc3c7; // 테두리 색상
    border-radius: 4px; // 모서리 둥글기
    font-size: 16px; // 폰트 크기

    &:focus {
      border-color: #3498db; // 포커스 상태 테두리 색상
      box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25); // 포커스 그림자
    }
  }

  .btn {
    font-family: 'Arial', sans-serif; // 버튼 폰트 패밀리
    font-size: 16px; // 폰트 크기
    padding: 10px 20px; // 패딩
    border-radius: 4px; // 모서리 둥글기
  }
}
</style>
