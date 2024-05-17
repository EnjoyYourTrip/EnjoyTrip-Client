<template>
  <div>
    <AppLoading v-if="loading" />

    <div class="container" v-else style="margin-bottom: 50px">
      <div class="row" v-if="plans.places.length === 0">
        <h2 style="margin-top: 35px; text-align: center">
          <b class="text-green">삭제된 일정입니다</b>
        </h2>
      </div>
      <div class="row" v-else>
        <div class="col-12 text-center">
          <h2 style="margin-top: 35px">
            <b class="text-green">{{ plans.title }}</b>
          </h2>
          <p>{{ plans.content }}</p>
        </div>
      </div>

      <div class="row align-items-center justify-content-between">
        <div class="col-auto">
          <button @click.prevent="goList()" class="btn btn-success mt-3 mb-3">
            목록으로 돌아가기
          </button>
        </div>
        <div class="col-auto text-right">
          <p class="nickname mb-0">{{ plans.nickname }}</p>
          <p class="created-date mb-0">{{ formatDate(plans.createdDate) }}</p>
        </div>
      </div>

      <div
        id="map-container"
        class="mt-3 mx-auto"
        style="width: 100%; max-width: 1200px"
      >
        <div id="map" style="height: 700px; width: 100%"></div>
      </div>

      <div class="row justify-content-center mt-5">
        <h1 class="text-green" style="font-weight: bold; text-align: center">
          TimeLine
        </h1>
      </div>

      <div class="row justify-content-center">
        <v-timeline style="width: 100%; max-width: 1200px">
          <v-timeline-item
            dot-color="green-lighten-4"
            v-for="place in plans.places"
            :key="place.contentId"
            class="timeline-item"
          >
            <v-card class="mx-auto timeline-card">
              <v-card-title class="bg-green-lighten-5">
                <v-icon
                  size="small"
                  class="me-4"
                  icon="mdi-heart-multiple-outline"
                  style="color: darkgreen"
                ></v-icon>
                <h5 class="font-weight-bold" style="color: #28a745">
                  {{ place.title }}
                </h5>
              </v-card-title>
              <v-img
                :src="place.firstImage"
                width="256"
                height="256"
                style="margin: auto"
              ></v-img>
              <v-card-text>
                <p
                  class="text-md-center"
                  v-html="formatAddress(place.addr1)"
                ></p>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getIterary } from '@/api/map';
import AppLoading from '@/components/common/AppLoading.vue';

const router = useRouter();
const route = useRoute();
const mapInstance = ref(null);
const id = route.params.id;
const loading = ref(true);
const plans = ref({
  title: '',
  content: '',
  places: [],
  createdDate: '',
  nickname: '',
});
const error = ref(null);

const fetchPlans = async () => {
  loading.value = true;
  try {
    const response = await getIterary(id);
    plans.value = response.data;
    console.log('서버에서 받아온 데이터', plans.value);
  } catch (err) {
    error.value = err;
  } finally {
    loading.value = false;
  }
};

const goList = () => {
  router.push({
    name: 'listPlan',
  });
};

const initializeMap = () => {
  if (plans.value.places.length === 0) return;

  // 위도와 경도의 합산을 위한 변수 초기화
  let totalLat = 0;
  let totalLng = 0;

  plans.value.places.forEach(place => {
    totalLat += place.latitude;
    totalLng += place.longitude;
  });

  // 평균 위도와 경도 계산
  const avgLat = totalLat / plans.value.places.length;
  const avgLng = totalLng / plans.value.places.length;

  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(avgLat, avgLng), // 평균 위치로 중심 설정
    level: 7, // 확대 레벨, 낮을수록 확대됨
  };
  /* global kakao */
  mapInstance.value = new kakao.maps.Map(container, options);

  // 마커를 추가하는 함수
  plans.value.places.forEach(place => {
    const markerPosition = new kakao.maps.LatLng(
      place.latitude,
      place.longitude,
    );
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      title: place.title,
    });
    marker.setMap(mapInstance.value);
  });
};

const formatAddress = address => {
  const maxLength = 22;
  if (address.length > maxLength) {
    return address.slice(0, maxLength) + '<br/>' + address.slice(maxLength);
  }
  return address;
};

const formatDate = date => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
};

watch(
  () => loading.value,
  newVal => {
    if (!newVal && plans.value.places.length > 0) {
      nextTick(() => {
        initializeMap();
      });
    }
  },
);

onMounted(fetchPlans);
</script>

<style scoped>
.text-green {
  color: #28a745;
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

#map-container {
  width: 100%;
}

#map {
  height: 700px;
  width: 100%;
}

.timeline-item {
  width: 100%;
}

.timeline-card {
  max-width: 600px; /* 카드의 최대 너비 설정 */
  width: 100%; /* 카드의 고정된 너비 설정 */
  margin-bottom: 20px;
}

.timeline-card .v-card-title,
.timeline-card .v-card-text {
  white-space: normal; /* 텍스트 줄바꿈 허용 */
  word-wrap: break-word; /* 단어가 너무 길 경우 줄바꿈 */
  overflow: hidden; /* 넘치는 텍스트 숨기기 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 ... 표시 */
}

.timeline-card .v-card-text p {
  display: block;
  margin: 0;
}

.text-right {
  text-align: right;
}

.nickname,
.created-date {
  margin: 0;
  font-size: 0.8em;
  color: gray;
}
</style>
