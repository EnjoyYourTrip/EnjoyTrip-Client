<template>
  <v-container class="pa-3">
    <div v-if="answers.length">
      <div v-for="answer in answers" :key="answer.id">
        <h3>답변</h3>
        <p>{{ answer.content }}</p>
        <v-btn color="red" @click="deleteAnswer(answer.id)">답변 삭제</v-btn>
      </div>
    </div>
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
import { useRoute } from 'vue-router';
import {
  getAnswersByQnAId,
  createAnswer,
  deleteAnswerFromDb,
  updateQnAResponseStatus,
} from '@/api/qna';

const route = useRoute();
const qnaId = route.params.id;
const answers = ref([]);
const newAnswer = ref('');

onMounted(async () => {
  await loadAnswers();
});

async function loadAnswers() {
  try {
    const response = await getAnswersByQnAId(qnaId);
    if (response.data) {
      answers.value = response.data;
    }
  } catch (error) {
    console.error('답변 로드 실패:', error);
  }
}

async function submitAnswer() {
  if (newAnswer.value.trim() === '') {
    alert('답변을 입력해 주세요.');
    return;
  }
  try {
    const data = { content: newAnswer.value, postId: qnaId };
    const response = await createAnswer(data);
    if (response.status === 201) {
      answers.value.push(response.data);
      newAnswer.value = '';
      await updateQnAResponseStatus(qnaId, true);
    }
  } catch (error) {
    console.error('답변 등록 실패:', error);
  }
}

async function deleteAnswer(answerId) {
  try {
    const response = await deleteAnswerFromDb(answerId);
    if (response.status === 200) {
      const index = answers.value.findIndex(a => a.id === answerId);
      if (index !== -1) {
        answers.value.splice(index, 1);
      }
      if (answers.value.length === 0) {
        await updateQnAResponseStatus(qnaId, false);
      }
    }
  } catch (error) {
    console.error('답변 삭제 실패:', error);
  }
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
