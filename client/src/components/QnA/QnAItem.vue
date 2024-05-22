<template>
  <tr>
    <td>
      <button
        :class="qna.has_response ? 'response-complete' : 'response-incomplete'"
      >
        {{ qna.has_response ? '답변 완료' : '미완료' }}
      </button>
    </td>
    <td>{{ qna.title }}</td>
    <td>{{ qna.nickname }}</td>
    <td>{{ qna.createdDate }}</td>
    <td>{{ qna.lastModifiedDate }}</td>
  </tr>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  qna: {
    type: Object,
    required: true,
  },
});
const { qna } = props; // 구조 분해 할당을 사용해 props에서 qna 객체를 직접 사용
</script>
<style scoped>
.response-complete,
.response-incomplete {
  background-color: #4caf50; /* 초록색은 답변 완료 */
  color: white;
  border: none;
  padding: 6px 12px; /* 패딩 조정 */
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 80%; /* 버튼의 너비를 셀의 80%로 조정 */
  display: block; /* 블록 레벨 요소로 설정하여 width가 적용될 수 있도록 함 */
  margin: auto; /* 가운데 정렬을 위해 자동 마진 사용 */
}

.response-incomplete {
  background-color: #ccc; /* 회색은 미완료 */
}

th:nth-child(1) {
  width: 10%; /* 첫 번째 열 너비 설정, 필요에 따라 조정 */
}

th:nth-child(2) {
  width: 40%; /* 두 번째 열 (제목) 너비 설정, 더 넓게 조정 */
}

th:nth-child(3),
th:nth-child(4),
th:nth-child(5) {
  width: 16.67%; /* 나머지 열들의 너비 설정, 균등 분할 */
}

th,
td {
  text-align: center; /* 모든 열의 텍스트를 중앙 정렬 */
  vertical-align: middle; /* 수직 방향의 중앙 정렬을 유지 */
  padding: 8px; /* 적절한 패딩을 추가하여 내용이 너무 셀 가장자리에 붙지 않도록 */
}

table {
  table-layout: fixed; /* 테이블 레이아웃을 고정 */
  width: 100%; /* 테이블 전체 너비를 고정 */
}

th,
td {
  overflow: hidden; /* 내용이 너무 길면 숨김 처리 */
  text-overflow: ellipsis; /* 너무 긴 텍스트는 말줄임표로 표시 */
  white-space: nowrap; /* 공백 문자를 nowrap 처리 */
}
</style>
