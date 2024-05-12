<template>
  <div>
    <h2>QnA 목록</h2>
    <hr class="my-4" />
  </div>
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
          :key="item.id"
          :qna="item"
          :id="item.id"
          @click="goPage(item.id)"
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
const goPage = id => {
  console.log('전달되기 직전 id:', id);
  router.push({
    name: 'QnADetail',
    params: { id },
  });
};
</script>
<style scoped>
.table {
  width: 100%; /* 테이블 전체 너비를 고정 */
  table-layout: fixed; /* 테이블 레이아웃을 고정 */
}

th,
td {
  text-align: center; /* 모든 열의 텍스트를 중앙 정렬 */
  vertical-align: middle; /* 셀의 내용을 수직 중앙에 위치 */
  padding: 8px; /* 적절한 패딩을 추가하여 내용이 너무 셀 가장자리에 붙지 않도록 */
}

th:nth-child(1),
td:nth-child(1) {
  width: 15%; /* 첫 번째 열의 너비를 15%로 설정 */
}

th:nth-child(2),
td:nth-child(2) {
  width: 35%; /* 두 번째 열의 너비를 조정 */
}

th:nth-child(3),
td:nth-child(3),
th:nth-child(4),
td:nth-child(4),
th:nth-child(5),
td:nth-child(5) {
  width: 15%; /* 세 번째, 네 번째, 다섯 번째 열의 너비 */
}
</style>
