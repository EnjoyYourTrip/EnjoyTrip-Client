<template>
  <div>
    <AppLoading v-if="loading" />

    <div class="container" v-else>
      <div class="row" v-if="plans.places.length === 0">
        <h2 class="mt-5 text-center">
          <b class="text-green">삭제된 일정입니다</b>
        </h2>
      </div>
      <div class="row" v-else>
        <div class="col-12 text-center">
          <h2 class="mt-5">
            <b class="text-green">{{ plans.title }}</b>
          </h2>
          <p>{{ plans.content }}</p>
        </div>
      </div>

      <div class="row align-items-center justify-content-between">
        <div class="col-auto">
          <button @click.prevent="goList()" class="btn btn-primary mt-3 mb-3">
            목록으로 돌아가기
          </button>
        </div>
        <div class="col-auto text-right">
          <p class="nickname mb-0">{{ plans.nickname }}</p>
          <p class="created-date mb-0">{{ formatDate(plans.createdDate) }}</p>
        </div>
      </div>

      <div id="map-container" class="mt-3 mx-auto">
        <div id="map"></div>
      </div>

      <div class="row justify-content-center mt-5">
        <h1 class="text-green text-center font-weight-bold">TimeLine</h1>
      </div>

      <div class="row justify-content-center">
        <v-timeline>
          <v-timeline-item
            dot-color="green-lighten-4"
            v-for="place in plans.places"
            :key="place.contentId"
            class="timeline-item"
          >
            <v-card class="mx-auto timeline-card">
              <v-card-title
                class="bg-green-lighten-5 d-flex align-items-center"
              >
                <v-icon
                  size="small"
                  class="me-4"
                  icon="mdi-heart-multiple-outline"
                  style="color: darkgreen"
                ></v-icon>
                <h5 class="font-weight-bold text-green">
                  {{ place.title }}
                </h5>
              </v-card-title>
              <v-img
                :src="place.firstImage"
                width="100%"
                height="256"
                class="mx-auto"
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
var map;
const router = useRouter();
const route = useRoute();
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
    const { data } = await getIterary(id);
    plans.value = data.data;
    console.log('서버에서 받아온 데이터란다', plans.value);
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

  let totalLat = 0;
  let totalLng = 0;

  plans.value.places.forEach(place => {
    totalLat += place.latitude;
    totalLng += place.longitude;
  });

  const avgLat = totalLat / plans.value.places.length;
  const avgLng = totalLng / plans.value.places.length;

  const container = document.getElementById('map');
  const options = {
    /*globals kakao */
    center: new kakao.maps.LatLng(avgLat, avgLng),
    level: 10,
  };
  map = new kakao.maps.Map(container, options);

  plans.value.places.forEach(place => {
    const markerPosition = new kakao.maps.LatLng(
      place.latitude,
      place.longitude,
    );
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      title: place.title,
    });
    marker.setMap(map);

    var content =
      '<div class="wrap">' +
      '    <div class="info">' +
      '        <div class="title">' +
      `${place.title}` +
      '            <div class="close" title="닫기"></div>' +
      '        </div>' +
      '        <div class="body">' +
      '            <div class="img">' +
      '                <img src="' +
      `${place.firstImage}` +
      '" width="73" height="70">' +
      '           </div>' +
      '            <div class="desc">' +
      '                <div class="ellipsis">' +
      `${place.addr1}` +
      '</div>' +
      '            </div>' +
      '        </div>' +
      '    </div>' +
      '</div>';

    var overlay = new kakao.maps.CustomOverlay({
      content: content,
      map: map,
      position: marker.getPosition(),
      yAnchor: 1.4,
    });
    overlay.setMap(null);

    kakao.maps.event.addListener(marker, 'mouseover', function () {
      console.log('마우스 올려 놓음');
      overlay.setMap(map);
    });
    kakao.maps.event.addListener(marker, 'mouseout', function () {
      overlay.setMap(null);
    });
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

<style>
.text-green {
  color: #28a745;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #005cbf;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

#map-container {
  width: 100%;
  max-width: 1200px;
}

#map {
  height: 700px;
  width: 100%;
}

.timeline-item {
  width: 100%;
}

.timeline-card {
  max-width: 600px;
  width: 100%;
  margin-bottom: 20px;
}

.timeline-card .v-card-title,
.timeline-card .v-card-text {
  white-space: normal;
  word-wrap: break-word;
  overflow: hidden;
  text-overflow: ellipsis;
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
  border-bottom: 2px solid #ccc !important;
  border-right: 1px solid #ccc !important;
  overflow: hidden;
  background: #fff !important;
}

.wrap .info:nth-child(1) {
  border: 0;
  box-shadow: 0px 1px 2px #888 !important;
}

.info .title {
  padding: 5px 0 0 10px;
  height: 30px;
  background: #eee !important;
  border-bottom: 1px solid #ddd !important;
  font-size: 18px;
  font-weight: bold;
}

.info .close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #888 !important;
  width: 17px;
  height: 17px;
  background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/overlay_close.png');
}

.info .close:hover {
  cursor: pointer;
}

.info .body {
  position: relative;
  overflow: hidden;
}

.info .desc {
  position: relative;
  margin: 13px 0 0 90px;
  height: 75px;
}

.desc .ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.desc .jibun {
  font-size: 11px;
  color: #888;
  margin-top: -2px;
}

.info .img {
  position: absolute;
  top: 6px;
  left: 5px;
  width: 73px;
  height: 71px;
  border: 1px solid #ddd;
  color: #888;
  overflow: hidden;
}

.info:after {
  content: '';
  position: absolute;
  margin-left: -12px;
  left: 50%;
  bottom: 0;
  width: 22px;
  height: 12px;
  background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png');
}

.info .link {
  color: #5085bb;
}
</style>
