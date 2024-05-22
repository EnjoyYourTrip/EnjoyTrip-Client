<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import VSelect from '@/components/common/VSelect.vue';
import { listHotplace, changeRecommend } from '@/api/hotplace.js';
import Item from './HotplaceListItem.vue'; // Item.vue 컴포넌트 임포트
import { useMemberStore } from '@/store/memberStore';

const router = useRouter();
const memberStore = useMemberStore();
const hotplaces = ref([]);
const currentPage = ref(1);
const totalPage = ref(1);
const VITE_ARTICLE_LIST_SIZE = 20;

// 검색
const selectOption = ref([
  { text: '검색어', value: '' },
  { text: '제목', value: 'title' },
  { text: '작성자', value: 'user_id' },
  { text: '주소', value: 'address' },
]);
// VSelect emit 함수
const changeKey = val => {
  console.log('HotPlaceList에서 선택한 조건 : ' + val);
  param.value.key = val;
};

const param = ref({
  pgno: currentPage.value,
  spp: VITE_ARTICLE_LIST_SIZE,
  key: '',
  word: '',
  memberId: null,
});

const getHotplaceList = async () => {
  const userInfo = memberStore.userInfo;
  if (userInfo && userInfo.data && userInfo.data.memberId) {
    param.value.memberId = userInfo.data.memberId;
  }
  console.log('param', param.value);
  listHotplace(
    param.value,
    response => {
      const data = response.data;
      console.log('리스트 데이터', param.value);
      if (data && data.data && data.data.hotplaces) {
        hotplaces.value = data.data.hotplaces;
        currentPage.value = data.data.currentPage;
        totalPage.value = data.data.totalPageCount;

        console.log('서버에 보낼 memberId', param.value.memberId);
      } else {
        console.error('Invalid data structure:', data);
      }
    },
    error => {
      console.log(error);
    },
  );
};

onMounted(async () => {
  getHotplaceList();
});

const moveWrite = () => {
  router.push({ name: 'hotplace-write' });
};

const handleLikeHotplace = hotplaceId => {
  const memberId = memberStore.userInfo?.data?.memberId;
  if (!memberId) {
    console.log('로그인이 필요합니다.');
    return;
  }
  console.log('idid', memberId);
  changeRecommend(
    hotplaceId,
    memberId,
    response => {
      console.log('좋아요를 눌렀을 때 response', response);
      console.log('Successfully liked hotplace', hotplaceId);
      getHotplaceList();
    },
    error => {
      console.log('Error liking hotplace', error);
    },
  );
};
</script>

<template>
  <div class="hotplace-container">
    <div class="header">
      <h1>핫플레이스</h1>
      <p>다른 사용자들이 추천하는 여행지인 핫 플레이스입니다.</p>
    </div>
    <div class="search-and-button">
      <form class="d-flex search-form">
        <VSelect
          :selectOption="selectOption"
          @onKeySelect="changeKey"
          class="v-select"
          :styles="{ menu: { 'max-height': '150px' } }"
        />
        <div class="input-group input-group-sm search-input-group">
          <input
            type="text"
            class="form-control"
            v-model="param.word"
            placeholder="검색어"
          />
          &nbsp;
          <v-btn variant="tonal" class="search-btn" @click="getHotplaceList"
            >검색</v-btn
          >
        </div>
      </form>
      <button @click="moveWrite" class="learn-more-btn">핫플 등록하기</button>
    </div>
    <div class="hotplace-grid">
      <div
        v-for="hotplace in hotplaces"
        :key="hotplace.hotplaceId"
        class="hotplace-item"
      >
        <Item :hotplace="hotplace" @likeHotplace="handleLikeHotplace" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.hotplace-container {
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 20px;
}

.search-and-button {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.learn-more-btn {
  color: white;
  text-transform: none;
  font-weight: bold;
  border-radius: 20px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.search-form {
  display: flex;
  align-items: center;
  width: 70%;
  max-width: 500px;
}

.v-select {
  flex: 1;
  margin-right: 10px;
  min-width: 100px;
}

.search-input-group {
  flex: 2;
  display: flex;
  align-items: center;
}

.hotplace-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;
  margin-top: 20px;
}

.hotplace-item {
  width: 100%;
  max-width: 400px;
}
</style>
