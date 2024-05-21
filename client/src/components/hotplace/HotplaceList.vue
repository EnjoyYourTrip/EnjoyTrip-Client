<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { listHotplace, changeRecommend } from '@/api/hotplace.js';
import Item from './HotplaceListItem.vue'; // Item.vue 컴포넌트 임포트
import { useMemberStore } from '@/store/memberStore';

const router = useRouter();
const memberStore = useMemberStore();
const hotplaces = ref([]);
const currentPage = ref(1);
const totalPage = ref(1);
const VITE_ARTICLE_LIST_SIZE = 20;

const param = ref({
  pgno: currentPage.value,
  spp: VITE_ARTICLE_LIST_SIZE,
  key: '',
  word: '',
  memberId: null,
});

// 사용자 정보가 로드되었는지 확인하는 함수
const waitForUserInfo = async () => {
  while (!memberStore.userInfo) {
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  return memberStore.userInfo;
};

const getHotplaceList = async () => {
  const userInfo = memberStore.userInfo;
  if (userInfo && userInfo.data && userInfo.data.memberId) {
    param.value.memberId = userInfo.data.memberId;
  }
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
  const userInfo = await waitForUserInfo();
  if (userInfo) {
    console.log('list의 memberId', userInfo.data.memberId);
  } else {
    console.log('null뜬다');
  }
  getHotplaceList(); // 사용자 정보가 없더라도 리스트를 불러옴
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
      getHotplaceList(); // 리스트를 새로고침하여 좋아요 수 업데이트
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
      <p>다른 사용자들이 추천하는 여행지인 핫 를레이스입니다.</p>
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

.toolbar {
  display: flex;
  justify-content: flex-start; /* Left-align the button */
  margin-bottom: 20px;
}

.write-btn {
  color: white;
  text-transform: none;
  font-weight: bold;
  border-radius: 20px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

.write-btn:hover {
  background-color: #086bc4;
}

.hotplace-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-items: center;
}

.hotplace-item {
  width: 100%;
  max-width: 400px;
}
</style>
