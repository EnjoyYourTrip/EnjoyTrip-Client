<template>
  <AppCard>
    <template #header>
      <img
        :src="image"
        class="card-img-top"
        alt="Card image cap"
        v-if="image"
      />
    </template>
    <div class="card-body">
      <h5 class="card-title text-truncate">{{ title }}</h5>
      <p class="card-text">
        <small class="text-muted">{{ nickname }} - {{ formattedDate }}</small>
      </p>
    </div>
  </AppCard>
</template>

<script setup>
import { computed } from 'vue';
import dayjs from 'dayjs'; // dayjs를 직접 임포트합니다.
import AppCard from '@/components/common/AppCard.vue'; // AppCard를 가져옵니다.

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  created_date: {
    type: [String, Date, Number],
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
});
defineEmits(['modal', 'preview']);

const formattedDate = computed(() => {
  if (props.created_date) {
    return dayjs(props.created_date).format('YYYY. MM. DD HH:mm:ss');
  }
  return '';
});
</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  background-color: #e6ffe6; /* 연한 초록색 배경 */
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  max-height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ddd;
}

.card-body {
  padding: 15px;
}

.card-title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-text {
  margin-bottom: 0.75rem;
}

.text-muted {
  color: #6c757d !important;
}
</style>
