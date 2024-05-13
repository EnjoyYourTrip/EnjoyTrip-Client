<template>
  <div>
    <h2>여행지 계획</h2>
  </div>
  <div class="dropdown-menu-container">
    <!-- 첫 번째 드롭다운 버튼 -->
    <select v-model="selected.city">
      <option disabled value="">도시 선택</option>
      <option v-for="sido in sidos" :key="sido.sidoCode" :value="sido.sidoCode">
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

    <!-- 텍스트 입력 필드 추가 -->
    <input v-model="selected.text" placeholder="검색어 입력" />
    <!-- 검색 버튼 -->
    <button @click="submitSelection">검색</button>

    <button @click.prevent="create">계획 생성하기</button>
  </div>
  <div class="container-fluid">
    <div id="map-container" class="mt-3 mx-auto" style="width: 50%">
      <div id="map" style="height: 500px"></div>
    </div>
  </div>
</template>

<script>
import { getAttraction } from '@/api/map';
export default {
  data() {
    return {
      mapInstance: null,
      selected: {
        city: '',
        category: '',
        text: '', // 텍스트 입력값 저장
      },
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
    var container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    var options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    /* global kakao */
    this.mapInstance = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  },
  methods: {
    async submitSelection() {
      try {
        const response = await getAttraction(
          this.selected.city,
          this.selected.category,
          this.selected.text,
        );
        this.createMarkers(response.data); // 마커 생성 함수 호출
      } catch (error) {
        console.error('데이터를 가져오는 중 에러가 발생했습니다:', error);
      }
    },
    createMarkers(attractions) {
      if (attractions.length === 0) return; // 결과가 없으면 함수 종료

      var imageSrc =
        'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png';
      var imageSize = new kakao.maps.Size(24, 35);
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 첫 번째 위치로 지도 중심 이동
      var firstPosition = new kakao.maps.LatLng(
        attractions[0].latitude,
        attractions[0].longitude,
      );
      this.mapInstance.setCenter(firstPosition);

      attractions.forEach(attraction => {
        new kakao.maps.Marker({
          map: this.mapInstance,
          position: new kakao.maps.LatLng(
            attraction.latitude,
            attraction.longitude,
          ),
          title: attraction.title,
          image: markerImage,
        });
      });
    },
  },

  create() {
    alert('여행계획이 생성되었습니다.');
    this.$router.push('/listPlan');
  },
};
</script>
<style>
.dropdown-menu-container {
  display: flex;
  justify-content: center; /* Align items horizontally center */
  align-items: center; /* Align items vertically center */
  margin-top: 30px; /* Top margin for spacing from any elements above */
  gap: 20px; /* Increase gap for better spacing */
}

#map {
  width: 100%; /* Full width of its container */
  height: 500px; /* Fixed height for the map */
}

select,
input[type='text'] {
  padding: 8px 12px; /* Adjust padding to align heights more precisely */
  border: 1px solid #ccc; /* Border for definition */
  border-radius: 4px; /* Rounded borders for modern look */
  background-color: white; /* Background color for the elements */
  height: 38px; /* Explicit height to ensure consistency */
  box-sizing: border-box; /* Include padding and border in the height */
}

input[type='text'] {
  margin-top: 0px; /* Adjust margin to better align with selects vertically */
}
</style>
