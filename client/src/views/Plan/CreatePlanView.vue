<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <!-- 텍스트박스 구역 -->
      <div class="col-md-3 d-flex flex-column align-items-center">
        <textarea
          class="form-control text-area-custom"
          placeholder="작성 내용을 입력해주세요."
        ></textarea>
      </div>
      <!-- 지도 검색 구역 -->
      <div class="col-md-6 d-flex flex-column align-items-center">
        <input
          v-model="titleText"
          placeholder="제목 입력"
          class="large-input"
        />
        <div class="dropdown-menu-container">
          <select v-model="selected.city">
            <option disabled value="">도시 선택</option>
            <option
              v-for="sido in sidos"
              :key="sido.sidoCode"
              :value="sido.sidoCode"
            >
              {{ sido.sidoName }}
            </option>
          </select>
          <select v-model="selected.category">
            <option disabled value="">카테고리 선택</option>
            <option
              v-for="category in categories"
              :key="category.code"
              :value="category.code"
            >
              {{ category.name }}
            </option>
          </select>
          <input v-model="selected.text" placeholder="검색어 입력" />
          <button @click="submitSelection">검색</button>
        </div>
        <div id="map-container" class="mt-3 mx-auto" style="width: 100%">
          <div id="map" style="height: 500px"></div>
          <!-- Vuetify Slide Group 추가 -->
          <v-slide-group v-if="showSlides" class="custom-slide-group">
            <v-slide-group-item
              v-for="attraction in attractions"
              :key="attraction.id"
              class="custom-slide-item"
            >
              <v-card class="mx-2" @click="viewAttraction(attraction)">
                <v-img :src="attraction.firstImage" height="180px"></v-img>
                <v-card-title>{{ attraction.title }}</v-card-title>
                <v-card-text>{{ attraction.addr1 }}</v-card-text>
              </v-card>
            </v-slide-group-item>
          </v-slide-group>
        </div>
      </div>
      <!-- 계획 추가 구역 -->
      <div
        class="col-md-2 d-flex justify-content-end align-items-start my-attraction-container"
      >
        <my-attraction :attractionObject="attractionObject" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue';
import MyAttraction from '@/components/plan/MyAttraction.vue';
import { attractionList } from '@/api/map';

const mapInstance = ref(null);
const titleText = ref('');
const showSlides = ref(false);
const attractions = ref([]);
const attractionObject = ref({});
const selected = ref({
  city: '',
  category: '',
  text: '',
});

const categories = [
  { code: 12, name: '관광지' },
  { code: 14, name: '문화시설' },
  { code: 15, name: '축제공연행사' },
  { code: 25, name: '여행코스' },
  { code: 28, name: '레포츠' },
  { code: 32, name: '숙박' },
  { code: 38, name: '쇼핑' },
  { code: 39, name: '음식점' },
];

const sidos = [
  { sidoCode: 1, sidoName: '서울' },
  { sidoCode: 2, sidoName: '인천' },
  { sidoCode: 3, sidoName: '대전' },
  { sidoCode: 4, sidoName: '대구' },
  { sidoCode: 5, sidoName: '광주' },
  { sidoCode: 6, sidoName: '부산' },
  { sidoCode: 7, sidoName: '울산' },
  { sidoCode: 8, sidoName: '세종특별자치시' },
  { sidoCode: 31, sidoName: '경기도' },
  { sidoCode: 32, sidoName: '강원도' },
  { sidoCode: 33, sidoName: '충청북도' },
  { sidoCode: 34, sidoName: '충청남도' },
  { sidoCode: 35, sidoName: '경상북도' },
  { sidoCode: 36, sidoName: '경상남도' },
  { sidoCode: 37, sidoName: '전라북도' },
  { sidoCode: 38, sidoName: '전라남도' },
  { sidoCode: 39, sidoName: '제주도' },
];

onMounted(() => {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(33.450701, 126.570667),
    level: 3,
  };
  /* global kakao */
  mapInstance.value = new kakao.maps.Map(container, options);
});

// card를 클릭하면 해당 위치로 지도를 옮기는 props 객체를 담음
const selectAttraction = ref({
  latitude: null,
  longitude: null,
}); // 초기값 설정

const viewAttraction = attraction => {
  selectAttraction.value = attraction;
};

watch(
  () => selectAttraction.value,
  newValue => {
    if (newValue && newValue.latitude !== null && newValue.longitude !== null) {
      // 이동할 위도 경도 위치를 생성합니다
      const moveLatLon = new kakao.maps.LatLng(
        newValue.latitude,
        newValue.longitude,
      );

      // 지도 중심을 부드럽게 이동시킵니다
      // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
      mapInstance.value.panTo(moveLatLon);
    }
  },
  { deep: true },
);

const submitSelection = async () => {
  try {
    const response = await attractionList(
      selected.value.city,
      selected.value.category,
      selected.value.text,
    );
    attractions.value = response.data;
    showSlides.value = attractions.value.length > 0;

    if (attractions.value.length > 0) {
      const firstAttraction = attractions.value[0];
      selectAttraction.value = firstAttraction;

      mapInstance.value.setCenter(
        new kakao.maps.LatLng(
          firstAttraction.latitude,
          firstAttraction.longitude,
        ),
      );

      createMarkers(attractions.value);
    }
  } catch (error) {
    console.error('Error fetching attractions:', error);
    showSlides.value = false;
  }
};

const createMarkers = attractionsData => {
  attractionsData.forEach(attraction => {
    const marker = new kakao.maps.Marker({
      map: mapInstance.value,
      position: new kakao.maps.LatLng(
        attraction.latitude,
        attraction.longitude,
      ),
      title: attraction.title,
    });

    kakao.maps.event.addListener(marker, 'click', () => {
      attractionObject.value = attraction;
    });
  });
};
</script>

<style scoped>
.wrap {
  position: absolute;
  left: 0;
  bottom: 40px;
  width: 288px;
  height: 132px;
  margin-left: -144px;
  text-align: left;
  overflow: hidden;
  font-size: 12px;
  line-height: 1.5;
}
.wrap * {
  padding: 0;
  margin: 0;
}
.wrap .info {
  width: 286px;
  height: 120px;
  border-radius: 5px;
  border-bottom: 2px solid #ccc;
  border-right: 1px solid #ccc;
  overflow: hidden;
  background: #fff;
}
.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.wrap .info .body .img {
  float: left;
  margin-right: 10px;
}
.wrap .info .body .desc {
  overflow: hidden;
}
.dropdown-menu-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 20px;
}

#map {
  width: 100%;
  height: 500px;
}

select,
input[type='text'] {
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  height: 38px;
  box-sizing: border-box;
}

input[type='text'] {
  margin-top: 0px;
}

.v-slide-group__prev,
.v-slide-group__next {
  z-index: 2;
  color: #353979;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 10px;
}

.v-slide-group__content {
  overflow: visible !important;
  background-color: #e0f7e0; /* 연한 초록색 배경 */
  padding: 10px;
  border-radius: 8px;
}

.v-slide-group__item {
  min-width: 250px;
  margin-left: 20px; /* 좌우 간격 추가 */
  margin-right: 20px; /* 좌우 간격 추가 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.v-slide-group {
  margin: 20px 0;
  background-color: #e0f7e0; /* 연한 초록색 배경 */
  padding: 10px;
  border-radius: 8px;
}

.custom-slide-item {
  margin-left: 20px;
  margin-right: 20px;
}

.large-input {
  width: 100%;
  height: 80px;
  font-size: 30px;
  padding: 10px;
}

.text-area-custom {
  width: 100%; /* 가로 길이 100%로 변경 */
  height: 500px; /* 세로 길이 */
  margin-top: 170px; /* 상단 마진 추가 */
  margin-left: 20px; /* 왼쪽 마진 추가 */
  font-size: 24px; /* 폰트 크기 증가 */
}

.my-attraction-container {
  margin-top: 170px;
  margin-right: 30px; /* 오른쪽 마진 추가 */
}
</style>
