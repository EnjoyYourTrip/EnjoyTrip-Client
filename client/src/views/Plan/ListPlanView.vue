<template>
  <div class="outer-container">
    <div class="inner-container">
      <h1 class="my-4 text-center">여행계획 목록</h1>
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
        <AppGrid :items="plans" col-class="col-12 col-md-3 col-lg-3">
          <template #default="{ item }">
            <PlanItem
              :title="item.title"
              :image="item.firstImage"
              :created_date="item.createdDate"
              :nickname="item.nickname"
              @click="goPage(item.itineraryId)"
            ></PlanItem>
          </template>
        </AppGrid>
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
import PlanItem from '@/components/plan/PlanItem.vue';
import PlanDetailView from '@/views/plan/PlanDetailView.vue';
import AppGrid from '@/components/common/AppGrid.vue';
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
      plans.value = data.data;
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
  grid-template-columns: 1fr minmax(auto, 800px) 1fr; /* Adjusted to 800px */
  background-color: #f2f2f2; /* Light grey background */
  min-height: 100vh;
}

.inner-container {
  grid-column: 2;
  background: #ffffff; /* White background for the inner container */
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px; /* Optional: adds slightly rounded corners */
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
</style>
