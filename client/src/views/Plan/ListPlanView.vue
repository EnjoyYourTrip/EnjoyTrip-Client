<template>
  <div class="container">
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
  // loading.value = true;
  try {
    const { data } = await getPlanList();
    console.log('찍어볼게');
    // response.data가 예상한 데이터 형식인지 확인
    if (data && data.data) {
      plans.value = data.data;
      console.log('잘 가져온 여행계획 값', data);
    } else {
      console.log('이상한 여행계획 값', data);
      throw new Error('Unexpected response format');
    }

    console.log('응답받은 리스트', plans.value);
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchPlans);

const isExist = computed(() => plans.value.length > 0);

const goPage = id => {
  console.log('상세 여행 계획으로 넘기는 id', id);
  router.push({
    name: 'DetailPlan',
    params: { id },
  });
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
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
