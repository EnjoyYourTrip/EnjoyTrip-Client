<template>
  <div class="place">
    <div class="header-wrapper">
      <div class="title mb-3">
        <b class="title">마커를 클릭해</b><br />
        <b class="title">장소를 선택해주세요.</b>
      </div>
      <v-btn variant="tonal" @click="addPlanList">여행 계획 추가</v-btn>
      &nbsp; &nbsp;
      <v-btn variant="tonal" @click="removePlanList">초기화</v-btn>
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
                class="detail-btn"
                @click="showDetail(attraction.contentId)"
                >자세히</v-btn
              >
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
// import { getAttraction } from '@/api/map';

const attractions = ref([]);
const overview = ref('');

//카카오 지도에서 찍은 여행지의 id를 받아옴
const props = defineProps({
  attractionObject: Object,
});

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

// // 자세히 버튼을 누르면 실행되는 함수
// const showDetail = async contentId => {
//   try {
//     const response = await getAttraction(contentId);
//     overview.value = response.data.overview; // 예시로 overview 데이터를 가져옴
//   } catch (error) {
//     console.log('자세히 보기 에러', error);
//   }
// };

const addPlanList = () => {};
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

.detail-btn {
  background-color: #3aae70;
  color: white;
  width: 80px;
  margin-top: 10px;
}
</style>
