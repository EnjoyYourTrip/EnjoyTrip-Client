<template>
  <div class="qna-container">
    <h2>QnA 목록</h2>
    <hr class="my-4" />
    <button type="button" @click="goCreate" class="mt-3">글 작성하기</button>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th>처리 상태</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성 일자</th>
            <th>수정 일자</th>
          </tr>
        </thead>
        <tbody>
          <QnAItem
            v-for="item in qna"
            :key="item.questionId"
            :qna="item"
            :id="item.questionId"
            @click="goPage(item.questionId)"
          />
        </tbody>
      </table>
    </div>
    <div class="pagination">
      <button @click="backPage()" :disabled="currentPage === 1">이전</button>
      <span>{{ currentPage }}</span>
      <button @click="frontPage()" :disabled="currentPage >= totalPage">
        다음
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import QnAItem from '@/components/QnA/QnAItem.vue';
import { getQnA } from '@/api/qna';
import { ref } from 'vue';
import '@/assets/styles/table.css';

const router = useRouter();

const qna = ref([]);
var currentPage = ref(1);
const pageSize = 10;
const fetchQna = async () => {
  const { data } = await getQnA(currentPage.value, pageSize);
  console.log(data);
  qna.value = data.data.questions;
};

fetchQna();

const goCreate = () => {
  router.push({ name: 'QnACreate' });
};

const goPage = id => {
  console.log('전달되기 직전 id:', id);
  router.push({
    name: 'QnADetail',
    params: { id },
  });
};

//페이징
const frontPage = () => {
  currentPage.value = currentPage.value + 1;
  fetchQna();
};
const backPage = () => {
  currentPage.value = currentPage.value - 1;
  fetchQna();
};
</script>
<style scoped>
.qna-container {
  margin-top: 20px;
}

.table {
  width: 100%;
  table-layout: fixed;
}

th,
td {
  text-align: center;
  vertical-align: middle;
  padding: 8px;
}

th:nth-child(1),
td:nth-child(1) {
  width: 15%;
}
th:nth-child(2),
td:nth-child(2) {
  width: 35%;
}
th:nth-child(3),
td:nth-child(3),
th:nth-child(4),
td:nth-child(4),
th:nth-child(5),
td:nth-child(5) {
  width: 15%;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  margin: 0 10px;
  border-radius: 5px;
  background-color: #8abb79;
  border: 1px solid #dee2e6;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #e2e6ea;
}

button:disabled {
  cursor: not-allowed;
}
</style>
