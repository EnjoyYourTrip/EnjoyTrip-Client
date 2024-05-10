<template>
  <div class="dropdown-menu-container">
    <select v-model="selected.city">
      <option disabled value="">도시 선택</option>
      <option>서울</option>
      <option>대전</option>
      <option>광주</option>
      <option>구미</option>
      <option>부산</option>
    </select>

    <select v-model="selected.category">
      <option disabled value="">카테고리 선택</option>
      <option>관광지</option>
      <option>문화시설</option>
      <option>축제공연행사</option>
      <option>여행코스</option>
    </select>

    <select v-model="selected.type">
      <option disabled value="">유형 선택</option>
      <option>스포츠</option>
      <option>숙박</option>
      <option>쇼핑</option>
      <option>음식점</option>
    </select>

    <button @click="submitSelection">검색</button>
    <button @click.prevent="create">계획 생성하기</button>
  </div>
  <div id="map-container">
    <div id="map"></div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  data() {
    return {
      mapInstance: null,
      selected: {
        city: '',
        category: '',
        type: '',
      },
      router: useRouter(),
    };
  },
  mounted() {
    var container = document.getElementById('map');
    var options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    this.mapInstance = new kakao.maps.Map(container, options);
  },
  methods: {
    submitSelection() {
      console.log(this.selected);
    },
    create() {
      alert('여행 계획이 생성되었습니다.');
      this.router.push({ name: 'listPlan' });
    },
  },
};
</script>

<style scoped>
#map-container {
  width: 100%;
  height: 100vh;
}

.dropdown-menu-container {
  display: flex;
  margin: 30px;
  gap: 10px;
}
</style>
