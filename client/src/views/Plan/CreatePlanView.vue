<template>
  <div class="dropdown-menu-container">
    <!-- 첫 번째 드롭다운 버튼 -->
    <select v-model="selected.city">
      <option disabled value="">도시 선택</option>
      <option>서울</option>
      <option>대전</option>
      <option>광주</option>
      <option>구미</option>
      <option>부산</option>
    </select>

    <!-- 두 번째 드롭다운 버튼 -->
    <select v-model="selected.category">
      <option disabled value="">카테고리 선택</option>
      <option>관광지</option>
      <option>문화시설</option>
      <option>축제공연행사</option>
      <option>여행코스</option>
    </select>

    <!-- 세 번째 드롭다운 버튼 -->
    <select v-model="selected.type">
      <option disabled value="">유형 선택</option>
      <option>스포츠</option>
      <option>숙박</option>
      <option>쇼핑</option>
      <option>음식점</option>
    </select>

    <!-- 검색 버튼 -->
    <button @click="submitSelection">검색</button>

    <button @click.prevent="create">계획 생성하기</button>
  </div>

  <div id="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mapInstance: null,
      selected: {
        city: '',
        category: '',
        type: '',
      },
    };
  },
  mounted() {
    var container = document.getElementById('map'); // 지도를 담을 영역의 DOM 레퍼런스
    var options = {
      // 지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };
    this.mapInstance = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  },
  methods: {
    submitSelection() {
      console.log(this.selected);
    },
    create() {
      alert('여행계획이 생성되었습니다.');
      this.$router.push('/Map');
    },
  },
};
</script>

<style>
#map-container {
  width: 100%; /* 컨테이너 너비를 부모 요소에 맞춤 */
  height: 100vh; /* 높이를 화면의 전체 높이로 설정 */
}

#map {
  width: 100%;
  height: 100%;
}

.dropdown-menu-container {
  display: flex;
  margin: 30px;
  gap: 10px; /* 버튼 사이의 간격 */
}
</style>
