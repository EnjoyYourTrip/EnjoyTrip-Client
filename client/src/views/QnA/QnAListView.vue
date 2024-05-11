<template>
  <div>
    <h2>QnA 목록</h2>
    <hr class="my-4" />
  </div>
  <div class="table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성 일자</th>
          <th>수정 일자</th>
        </tr>
      </thead>
      <tbody>
        <QnAItem
          v-for="item in qna"
          :key="item.question_id"
          :qna="item"
          @click="goPage(item.question_id)"
        />
      </tbody>
    </table>
  </div>
  <button type="button" @click="goCreate">글 작성하기</button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import QnAItem from '@/components/QnA/QnAItem.vue';
import { getQnA } from '@/api/qna';
import { ref } from 'vue';
import '@/assets/styles/table.css';
const router = useRouter();

const qna = ref([]);

const fetchQna = async () => {
  //왜 data가 마지막 1개 밖에 없지?
  const { data } = await getQnA();
  console.log(data);
  qna.value = data;
};

fetchQna();

//생성페이지 이동
const goCreate = () => {
  router.push({ name: 'QnACreate' });
};

//상세페이지 이동
const goPage = question_id => {
  router.push(`/QnADetail/${question_id}`);
};
</script>
<style lang="scss" scoped></style>
