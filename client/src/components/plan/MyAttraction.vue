<template>
  <div class="place">
    <h4 class="title mt-3">
      <p>나의 여행 계획</p>
    </h4>
    <div class="title mb-3">
      <b class="title">원하는 장소를 추가하세요</b>
    </div>

    <v-btn variant="tonal" @click="removePlanList" style="color: #8282ff"
      >초기화</v-btn
    >
    <div
      class="row col-12 mt-2 ms-4 card-table"
      v-for="attraction in attractions"
      :key="attraction.contentId"
    >
      <div
        class="card col-lg-6 mb-2 mx-8"
        style="cursor: pointer; width: 200px; background-color: #fdf5e6"
      >
        <img
          class="card-img-top mt-2 rounded"
          :src="attraction.firstImage"
          onerror="javascript:this.src='./src/assets/no_image.jpg'"
          height="100"
        />
        <div class="card-body">
          <h5 class="card-title">
            <b>{{ attraction.title }}</b>
          </h5>
          <p style="font-size: 13px; color: #a0a0a0">{{ attraction.addr1 }}</p>
          <!-- 관광지 overview-->
          <v-dialog>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                style="background-color: #a0a0ff; color: white; width: 20px"
                @click="showDetail(attraction.contentId)"
                >자세히</v-btn
              >
            </template>
            <!-- <template v-slot:default="{ isActive }">
              <v-card title="정보">
                <v-card-text>
                  {{ overview }}
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>

                  <v-btn text="닫기" @click="isActive.value = false"></v-btn>
                </v-card-actions>
              </v-card>
            </template> -->
          </v-dialog>
          &nbsp;
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
// import { useMemberStore } from '@/store/memberStore';
import { getAttraction } from '@/api/map';
// import { storeToRefs } from 'pinia';

// const { userInfo } = storeToRefs(useMemberStore);

const mytrips = ref([]); // 내가 선택한 여행 계획
const attractions = ref([]);
const attraction = ref({});
// const num = ref(0); // 현재 선택한 여행 계획 개수

const props = defineProps({
  contentId: Number,
});

// 카카오 지도에서 클릭한 마커가 변하자마자
watch(
  () => props.contentId,
  newValue => {
    console.log('가져온 여행지 id', props.contentId); // 이게 잘 찍히는지 확인 -> 잘 가져오네
    // // 여행 계획에 추가
    // let mytrip = {};
    // mytrip.userMytripNo = num.value + 1;
    // mytrip.contentId = props.contentId;
    // mytrip.userId = userInfo.value.userId;

    // mytrips.value.push(mytrip); // 여행 계획 추가하기

    // contentId에 맞는 관광지 정보 가져오기
    getAttraction(
      newValue,
      ({ data }) => {
        // console.log("then => ", data);
        attraction.value = data;
        attractions.value.push(attraction.value);
      },
      error => {
        console.log(error);
      },
    );
  },
);
// 초기화 버튼을 누르면 실행되는 함수
const removePlanList = () => {
  mytrips.value = [];
  attractions.value = [];
};
</script>

<style lang="scss" scoped></style>
