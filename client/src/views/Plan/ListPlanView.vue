<template>
  <div class="outer-container">
    <div class="inner-container">
      <h1 class="my-4 text-center">여행계획 목록</h1>
      <p>다른 사람이 작성한 여행계획을 살펴보세요</p>
      <div class="text-end mb-3">
        <router-link to="/createPlan">
          <button class="btn btn-success">여행계획 생성하기</button>
        </router-link>
      </div>

      <AppLoading v-if="loading" />

      <AppError v-else-if="error" :message="error.message" />

      <template v-else-if="!isExist">
        <p class="text-center py-4 text-muted">No Results</p>
      </template>

      <template v-else>
        <div class="row g-4">
          <div
            class="col-12 col-md-6 col-lg-3"
            v-for="item in plans"
            :key="item.itineraryId"
          >
            <div class="card h-100">
              <img :src="item.firstImage" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{{ item.title }}</h5>

                <p class="card-text">{{ item.nickname }}</p>
                <p class="card-text">
                  <small class="text-muted">{{ item.createdDate }}</small>
                </p>
                <button @click="goPage(item.itineraryId)">보기</button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-if="previewId">
        <hr class="my-5" />
        <AppCard>
          <PlanDetailView :id="previewId"></PlanDetailView>
        </AppCard>
      </template>
    </div>
  </div>
</template>

<script setup>
// import PlanItem from '@/components/plan/PlanItem.vue';
import PlanDetailView from '@/views/plan/PlanDetailView.vue';
import AppLoading from '@/components/common/AppLoading.vue';
import AppError from '@/components/common/AppError.vue';
import AppCard from '@/components/common/AppCard.vue';
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getPlanList } from '@/api/map';

const router = useRouter();

const plans = ref([]);
const loading = ref(true);
const error = ref(null);

const fetchPlans = async () => {
  try {
    const { data } = await getPlanList();
    if (data && data.data) {
      plans.value = data.data.sort((a, b) => b.itineraryId - a.itineraryId);
    } else {
      throw new Error('Unexpected response format');
    }
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPlans);

const isExist = computed(() => plans.value.length > 0);

const goPage = id => {
  router.push({
    name: 'DetailPlan',
    params: { id },
  });
};
</script>

<style scoped>
.outer-container {
  display: grid;
  grid-template-columns: 1fr minmax(auto, 1600px) 1fr;
  background-color: #f2f2f2;
  min-height: 100vh;
}

.inner-container {
  grid-column: 2;
  background: #ffffff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.text-center {
  text-align: center;
}

.text-end {
  text-align: end;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.col-12 {
  flex: 0 0 100%;
  max-width: 100%;
}

.col-md-6 {
  flex: 0 0 50%;
  max-width: 50%;
}

.col-lg-3 {
  flex: 0 0 25%;
  max-width: 25%;
}

.card {
  transition: transform 0.3s ease-in-out;
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%; /* 카드의 너비를 100%로 설정 */
  height: 250px; /* 카드의 높이를 250px로 설정 */
}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  object-fit: cover;
  height: 140px;
  width: 100%;
}
</style>
