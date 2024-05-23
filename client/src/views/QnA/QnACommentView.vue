<template>
  <v-container class="pa-3">
    <div v-if="answer && Object.keys(answer).length > 0">
      <h3>답변</h3>
      <p>{{ answer.content }}</p>
      <v-btn
        v-if="role == 'ADMIN'"
        color="red"
        @click="
          deleteAnswer(answer.answerId, memberStore.userInfo.data.memberId)
        "
      >
        답변 삭제
      </v-btn>
    </div>
    <div v-else>
      <template v-if="role == 'ADMIN'">
        <v-text-field
          v-model="newAnswer"
          label="답변을 작성하세요"
          outlined
          dense
          class="mb-2"
          color="green"
        ></v-text-field>
        <v-btn color="green" @click="submitAnswer">답변 작성</v-btn>
      </template>
      <template v-else>
        <p>아직 답변이 작성되지 않았습니다.</p>
      </template>
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
const answer = ref(null);
const newAnswer = ref('');
const memberStore = useMemberStore();
const role = ref('');

onMounted(async () => {
  await loadAnswers();
  role.value = memberStore.userInfo.data.role;
  console.log('현재 권한', role.value);
});

async function loadAnswers() {
  console.log('호출', questionId);
  try {
    const response = await getAnswersByQnAId(questionId);
    console.log('댓글123', response);
    if (response.data && response.data.data) {
      answer.value = response.data.data;
      console.log('댓글', answer.value);
    } else {
      answer.value = null; // 댓글이 없는 경우
    }
  } catch (error) {
    console.error('답변 로드 실패:', error);
    answer.value = null;
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
    console.log('댓글생성에 보낼 데이터', data);
    if (memberStore.userInfo.data.role == 'ADMIN') {
      const response = await createAnswer(data);
      if (response.status === 201) {
        const responseData = {
          answerId: response.data.id, // answerId로 수정
          content: response.data.content,
          questionId: response.data.questionId,
        };
        answer.value = responseData; // answer 상태 업데이트
        newAnswer.value = ''; // 입력 필드 비우기
      }
    } else {
      alert('관리자만 답변할 수 있습니다.');
    }
  } catch (error) {
    console.error('답변 등록 실패:', error);
  }
}

async function deleteAnswer(answerId, memberId) {
  console.log('삭제할 id', answerId, memberId);
  try {
    const response = await deleteAnswerFromDb(answerId, memberId);
    if (response.status === 200) {
      answer.value = null;
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
