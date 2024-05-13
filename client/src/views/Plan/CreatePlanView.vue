<template>
  <div>
    <h2>여행지 계획 만들어봐라</h2>
  </div>
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
  <div class="container-fluid">
    <div id="map-container" class="mt-3 mx-auto" style="width: 50%">
      <div id="map" style="height: 500px"></div>
    </div>
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

    /* global kakao */
    this.mapInstance = new kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴
  },
  methods: {
    submitSelection() {
      console.log(this.selected);
    },
    create() {
      alert('여행계획이 생성되었습니다.');
      this.$router.push('/listPlan');
    },
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

select {
  padding: 8px 16px; /* Padding for better clickability and aesthetics */
  border: 1px solid #ccc; /* Border for definition */
  border-radius: 4px; /* Rounded borders for modern look */
  background-color: white; /* Background color for the elements */
}
</style>
