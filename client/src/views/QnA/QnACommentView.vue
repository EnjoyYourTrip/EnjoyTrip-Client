<template>
  <v-container class="pa-3" v-if="role == 'admin'">
    <div v-if="Object.keys(answer).length > 0">
      <h3>답변</h3>
      <p>{{ answer.content }}</p>
      <v-btn color="red" @click="deleteAnswer(answer.answerId)"
        >답변 삭제</v-btn
      >
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
import { getAnswersByQnAId, createAnswer, deleteAnswerFromDb } from '@/api/qna';
import { useMemberStore } from '@/store/memberStore';
const route = useRoute();
const questionId = route.params.id;
const answer = ref({});
const newAnswer = ref('');
const memberStore = useMemberStore();
const role = ref('');
onMounted(async () => {
  await loadAnswers();
  role.value = memberStore.userInfo.data.role;
  console.log('현재 궈한', role.value);
});

async function loadAnswers() {
  console.log('호출');
  try {
    const response = await getAnswersByQnAId(questionId);
    console.log('댓글', response.data.data);
    if (response.data) {
      answer.value = response.data.data;
      console.log('댓글', answer.value);
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
    const data = {
      content: newAnswer.value,
      questionId: questionId,
      memberId: memberStore.userInfo.data.memberId,
    };
    console.log('memberStore (댓글)', memberStore.userInfo.data);
    console.log('댓글생성에 보낼 데이터', data);
    if (memberStore.userInfo.data.role == 'admin') {
      const response = await createAnswer(data);
      if (response.status === 201) {
        const responseData = {
          id: response.data.id,
          content: response.data.content,
          questionId: response.data.questionId,
        };
        answer.value = responseData;
        newAnswer.value = '';
      }
    } else {
      alert('관리자만 답변할 수 있습니다.');
    }
  } catch (error) {
    console.error('답변 등록 실패:', error);
  }
}

async function deleteAnswer(answerId) {
  try {
    const response = await deleteAnswerFromDb(answerId);
    if (response.status === 200) {
      const index = answer.value.findIndex(a => a.id === answerId);
      if (index !== -1) {
        answer.value.splice(index, 1);
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
  background-color: #f0f0f0;
  border: 1px solid #c8e6c9;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 128, 0, 0.2);
}

.v-text-field .v-label,
.v-btn {
  color: green;
}
</style>
