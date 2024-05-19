<template>
  <div class="place">
    <div class="header-wrapper">
      <div class="title mb-3">
        <b class="title">마커를 클릭해</b><br />
        <b class="title">여행지를 선택해주세요.</b>
      </div>
      <p>방문할 여행지를 순서대로 선택하세요.</p>
      <p>방문할 여행지를 모두 골랐다면<br />여행 계획 생성하기를 눌러주세요.</p>
      <div>
        <label for="start-date">시작일:</label>
        <input type="date" id="start-date" v-model="planStartDate" />
      </div>
      <div>
        <label for="end-date">종료일:</label>
        <input type="date" id="end-date" v-model="planEndDate" />
      </div>
      <v-btn class="custom-btn" variant="tonal" @click="addPlanList">
        여행 계획 생성하기
      </v-btn>
      &nbsp; &nbsp;
      <v-btn class="custom-btn" variant="tonal" @click="removePlanList">
        초기화
      </v-btn>
    </div>

    <div class="card-container">
      <div
        class="card"
        v-for="attraction in attractions"
        :key="attraction.contentId"
      >
        <img
          class="card-img-top rounded"
          :src="attraction.firstImage"
          height="100"
        />
        <div class="card-body">
          <h5 class="card-title">
            <b>{{ attraction.title }}</b>
          </h5>
          <p class="card-text">{{ attraction.addr1 }}</p>
          <!-- 관광지 overview-->
          <v-dialog>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                class="detail-btn custom-btn"
                @click="showDetail(attraction.contentId)"
              >
                자세히
              </v-btn>
            </template>
            <template v-slot:default="{ isActive }">
              <v-card title="정보">
                <v-card-text>
                  {{ overview }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text="닫기" @click="isActive.value = false"></v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';
import { createPlan } from '@/api/map';

const attractions = ref([]);
const overview = ref('');
const planStartDate = ref('');
const planEndDate = ref('');

// 카카오 지도에서 찍은 여행지의 id를 받아옴
const props = defineProps({
  attractionObject: Object,
  titleText: String,
  contentText: String,
});

// 라우터 객체 가져오기
const router = useRouter();

// 카카오 지도에서 클릭한 마커가 변하자마자
watch(
  () => props.attractionObject,
  newValue => {
    console.log(newValue);
    const newAttraction = { ...newValue }; // 새 객체로 복사
    attractions.value.push(newAttraction);
  },
);

// 초기화 버튼을 누르면 실행되는 함수
const removePlanList = () => {
  attractions.value = [];
};

// 여행 계획 추가 버튼을 누르면 실행되는 함수
const addPlanList = () => {
  const itineraryDetailList = attractions.value.map(attraction => ({
    contentId: attraction.contentId,
  }));
  console.log('서버에 보낼 itineraryDetailList', itineraryDetailList);
  Swal.fire({
    title: '여행 계획이 추가되었습니다.',
    text: '즐거운 여행 보내세요.',
    icon: 'success',
    customClass: {
      confirmButton: 'custom-confirm-button',
    },
  }).then(() => {
    sendPlanData(
      props.titleText,
      props.contentText,
      itineraryDetailList,
      planStartDate.value,
      planEndDate.value,
    );
    router.push({ name: 'listPlan' });
  });
};

// 서버로 데이터 보내기
async function sendPlanData(
  titleText,
  contentText,
  itineraryDetailList,
  startDate,
  endDate,
) {
  try {
    const response = await createPlan(
      titleText,
      contentText,
      itineraryDetailList,
      startDate,
      endDate,
    );
    console.log('Plan created successfully:', response.data);
  } catch (error) {
    console.error('Error creating plan:', error);
  }
}
</script>

<style lang="scss" scoped>
.place {
  text-align: center;
  margin: 20px auto;
  max-width: 800px;
}

.header-wrapper {
  display: inline-block;
  padding: 20px;
  border-radius: 15px;
  background-color: #c4ebd6;
  margin-bottom: 20px;
}

.title {
  font-size: 24px;
  font-weight: bold;
}

.reset-btn {
  margin-top: 10px;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.card {
  cursor: pointer;
  width: 200px;
  background-color: #c4ebd6;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.card-img-top {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.card-body {
  padding: 10px;
}

.card-title {
  font-size: 16px;
  margin-bottom: 10px;
}

.card-text {
  font-size: 13px;
  color: #a0a0a0;
}

.custom-btn {
  background-color: #3aae70;
  color: white;
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 8px;
}

.custom-btn:hover {
  background-color: #36985d;
}

.detail-btn {
  background-color: #3aae70;
  color: white;
  width: 80px;
  margin-top: 10px;
}

/* SweetAlert2 custom button */
.swal2-confirm.custom-confirm-button {
  background-color: #3aae70 !important; /* 원하는 색상으로 변경 */
  color: white !important;
}
</style>
