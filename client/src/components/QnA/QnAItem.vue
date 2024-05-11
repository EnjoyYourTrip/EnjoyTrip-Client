<template>
  <tr>
    <td>{{ qna.question_id }}</td>
    <td>{{ qna.title }}</td>
    <td>{{ qna.member_id }}</td>
    <td>{{ qna.created_date }}</td>
    <td>{{ qna.last_modified_date }}</td>
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

<style lang="scss" scoped>
// 필요한 스타일을 여기에 추가할 수 있습니다.
</style>
