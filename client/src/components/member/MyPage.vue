<template>
  <div class="user-page">
    <div class="user-info">
      <h2>User Information</h2>
      <ul>
        <li>ID: {{ memberStore.userInfo.userId }}</li>
        <li>Name: {{ memberStore.userInfo.userName }}</li>
        <li>
          Email: {{ memberStore.userInfo.emailId }}@{{
            memberStore.userInfo.emailDomain
          }}
        </li>
        <li>Join Date: {{ memberStore.userInfo.joinDate }}</li>
      </ul>
    </div>
    <div class="recommendations">
      <h2>Favorite Hotplaces</h2>
      <ul>
        <li v-for="place in userRecommendList" :key="place.hotplaceId">
          {{ place.title }} - {{ place.address }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useMemberStore } from '@/store/memberStore';
import { userlistRecommend } from '@/api/hotplace';

const memberStore = useMemberStore();
const userRecommendList = ref([]);

onMounted(() => {
  if (memberStore.userInfo) {
    fetchUserRecommendations(memberStore.userInfo.userId);
  }
});

const fetchUserRecommendations = async userId => {
  userlistRecommend(
    userId,
    response => {
      userRecommendList.value = response.data;
    },
    error => {
      console.error('Failed to fetch recommendations:', error);
    },
  );
};
</script>

<style scoped>
.user-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.user-info,
.recommendations {
  margin: 10px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
</style>
