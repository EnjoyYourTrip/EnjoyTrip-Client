<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { listHotplace, changeRecommend } from '@/api/hotplace.js';
import Item from './HotplaceListItem.vue'; // Item.vue 컴포넌트 임포트

const router = useRouter();

const hotplaces = ref([]);
const currentPage = ref(1);
const totalPage = ref(1);
const VITE_ARTICLE_LIST_SIZE = 20;

const param = ref({
  pgno: currentPage.value,
  spp: VITE_ARTICLE_LIST_SIZE,
  key: '',
  word: '',
});

onMounted(() => {
  getHotplaceList();
});

const getHotplaceList = () => {
  listHotplace(
    param.value,
    response => {
      const data = response.data;
      hotplaces.value = data.data.hotplaces;
      currentPage.value = data.data.currentPage;
      totalPage.value = data.data.totalPageCount;
    },
    error => {
      console.log(error);
    },
  );
};

const moveWrite = () => {
  router.push({ name: 'hotplace-write' });
};

const handleLikeHotplace = hotplaceId => {
  const memberId = 1; // 실제 사용자 ID로 대체해야 합니다.
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
    <div class="toolbar">
      <button @click="moveWrite" class="write-btn">핫플 등록</button>
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
