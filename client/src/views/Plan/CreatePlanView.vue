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
          <v-slide-group v-if="showSlides">
            <v-slide-group-item
              v-for="attraction in attractions"
              :key="attraction.id"
              class="slide-item-spacing"
            >
              <v-card>
                <v-img :src="attraction.firstImage" height="200px"></v-img>
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

<script>
import { attractionList } from '@/api/map';
import MyAttraction from '@/components/plan/MyAttraction.vue';
import { ref } from 'vue';
export default {
  components: {
    MyAttraction,
  },
  data() {
    return {
      mapInstance: null,
      selected: {
        city: '',
        category: '',
        text: '',
      },
      titleText: '',
      showSlides: false, // 슬라이드 표시 상태
      attractions: [], // 검색 결과를 저장할 배열
      attractionObject: ref({}),
      categories: [
        { code: 12, name: '관광지' },
        { code: 14, name: '문화시설' },
        { code: 15, name: '축제공연행사' },
        { code: 25, name: '여행코스' },
        { code: 28, name: '레포츠' },
        { code: 32, name: '숙박' },
        { code: 38, name: '쇼핑' },
        { code: 39, name: '음식점' },
      ],
      sidos: [
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
      ],
    };
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      var container = document.getElementById('map');
      var options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };
      /* global kakao */
      this.mapInstance = new kakao.maps.Map(container, options);
    },
    async submitSelection() {
      try {
        const response = await attractionList(
          this.selected.city,
          this.selected.category,
          this.selected.text,
        );
        this.attractions = response.data;
        this.showSlides = this.attractions.length > 0;
        this.createMarkers(this.attractions);
      } catch (error) {
        console.error('Error fetching attractions:', error);
        this.showSlides = false;
      }
    },
    createMarkers(attractionsData) {
      if (attractionsData.length === 0) return;
      var imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      var imageSize = new kakao.maps.Size(24, 35);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
      var firstPosition = new kakao.maps.LatLng(
        attractionsData[0].latitude,
        attractionsData[0].longitude,
      );
      this.mapInstance.setCenter(firstPosition);
      attractionsData.forEach(attraction => {
        var marker = new kakao.maps.Marker({
          map: this.mapInstance,
          position: new kakao.maps.LatLng(
            attraction.latitude,
            attraction.longitude,
          ),
          title: attraction.title,
          image: markerImage,
        });
        // 마커 클릭 이벤트 추가
        kakao.maps.event.addListener(marker, 'click', () => {
          console.log('마커 클릭시 자식으로 보낼 데이터', attraction);
          this.onMarkerClick(attraction);
        });
      });
    },
    onMarkerClick(attraction) {
      // 마커 클릭 시 처리할 내용
      // console.log(attraction);
      this.attractionObject = attraction; // contentId를 클릭한 id로
    },
  },
};
</script>

<style scoped>
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
}

.v-slide-group__item {
  min-width: 250px;
  margin-right: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.v-slide-group {
  margin: 20px 0;
}

.slide-item-spacing {
  margin-left: 10px;
  margin-right: 10px;
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
