<template>
  <v-container class="pa-3">
    <!-- 답변이 존재하면 보여줄 부분 -->
    <div v-if="answer">
      <h3>답변</h3>
      <p>{{ answer.content }}</p>
      <v-btn color="red" @click="deleteAnswer">답변 삭제</v-btn>
    </div>

    <!-- 답변이 없을 때 보여줄 입력 폼 -->
    <div v-else>
      <v-text-field
        v-model="newAnswer"
        label="답변을 작성하세요"
        outlined
        dense
        class="mb-2"
        color="green"
      ></v-text-field>
      <v-btn color="green" @click="submitAnswer">답변 작성</v-btn>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const answer = ref(null);
const newAnswer = ref('');

onMounted(async () => {
  await loadAnswer();
});

async function loadAnswer() {
  // 이 부분에서 실제 데이터를 가져올 수 있는 API 호출을 구현합니다.
  // 임시 데이터를 사용합니다.
  answer.value = { content: '이미 작성된 답변' };
}

function submitAnswer() {
  if (newAnswer.value.trim() === '') {
    alert('답변을 입력해 주세요.');
    return;
  }
  // 여기에서 답변을 저장하는 API 호출을 구현합니다.
  answer.value = { content: newAnswer.value }; // 답변 저장
  newAnswer.value = ''; // 입력 필드 초기화
}

function deleteAnswer() {
  // 여기에서 답변을 삭제하는 API 호출을 구현합니다.
  console.log('답변 삭제');
  answer.value = null; // 로컬 상태 업데이트
}
</script>

<style scoped>
.v-container {
  max-width: 600px;
  margin: auto;
  background-color: #f0f0f0; /* 연한 회색 배경 */
  border: 1px solid #c8e6c9; /* 연한 초록색 테두리 */
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 128, 0, 0.2); /* 초록색 음영 */
}

.v-text-field .v-label,
.v-btn {
  color: green; /* 요소들의 텍스트 색상 */
}
</style>
