<template>
  <div class="content-wrapper">
    <h2 class="title">{{ post.title }}</h2>
    <p class="date">{{ post.last_modified_date }}</p>
    <p class="content">{{ post.content }}</p>
    <hr class="divider" />
    <div class="button-container">
      <div class="navigation-buttons">
        <button class="button outline" @click="goPrevious">이전글</button>
        <button class="button outline" @click="goNext">다음글</button>
      </div>
      <div class="action-buttons">
        <button class="button green" @click="goListPage">목록</button>
        <button class="button blue" @click="goEditPage">수정</button>
        <button class="button red" @click="deletePost">삭제</button>
      </div>
    </div>
  </div>
  <!--관리자의 댓글-->
  <QnACommentView :postId="id"></QnACommentView>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import { getQnAById, deleteQnA } from '@/api/qna';

import QnACommentView from './QnACommentView.vue';
const router = useRouter();
const route = useRoute();
const id = route.params.id;
// const id = route.params.id;
// const props = defineProps({
//   id: Number,
// });
console.log('받은 id : ' + id);
const post = ref({});

const fetchPost = async () => {
  const { data } = await getQnAById(id);
  post.value = { ...data };
};
fetchPost();
const goListPage = () => router.push({ name: 'QnAList' });
const goEditPage = () => router.push({ name: 'QnAEdit', params: { id } });
const goPrevious = () => router.push({ name: `QnADetail`, params: { id } });
const goNext = () => console.log('Go to next post');
const deletePost = () => {
  deleteQnA(id)
    .then(() => {
      alert('삭제되었습니다.');
      router.push({ name: 'QnAList' });
    })
    .catch(error => {
      console.error('삭제 실패', error);
    });
};
</script>

<style lang="scss" scoped>
.content-wrapper {
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  max-width: 800px;
  margin: 20px auto;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: start;
}

.title,
.date,
.content,
.divider,
.button-container {
  width: 100%;
}

.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}

.navigation-buttons,
.action-buttons {
  display: flex;
}

.button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s;
  margin-right: 10px;
}

.button:last-child {
  margin-right: 0;
}

.green {
  background-color: #4caf50;
  color: white;
}

.blue {
  background-color: #2196f3;
  color: white;
}

.red {
  background-color: #f44336;
  color: white;
}

.outline {
  background-color: #fff;
  color: #666;
  border: 1px solid #ccc;
}

.button:hover {
  opacity: 0.85;
}
</style>
