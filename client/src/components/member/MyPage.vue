<template>
  <v-container class="user-page" fluid>
    <!-- User Information Section -->
    <v-row class="user-info" justify="center">
      <v-col cols="12" md="8">
        <v-card outlined>
          <v-card-title class="headline">유저 정보</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="title"
                    >ID: {{ memberStore.userInfo.data.id }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="title"
                    >Name:
                    {{ memberStore.userInfo.data.nickname }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="title">
                    Email: {{ memberStore.userInfo.data.email }}@{{
                      memberStore.userInfo.data.emailDomain
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title class="title"
                    >Join Date:
                    {{
                      memberStore.userInfo.data.lastModifiedDate
                    }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recommendations Section -->
    <v-row class="recommendations" justify="center">
      <v-col cols="12" md="10">
        <v-card outlined>
          <v-card-title class="headline">좋아요를 누른 핫플레이스</v-card-title>
          <v-card-text>
            <div class="recommendation-container">
              <div
                v-for="place in userRecommendList"
                :key="place.hotplaceId"
                class="recommendation-item"
              >
                <v-card class="recommendation-content">
                  <v-img
                    :src="`https://86e1-121-147-32-101.ngrok-free.app/uploads/${place.saveFolder}/${place.saveFile}`"
                    alt="hotplace image"
                    class="recommendation-image"
                    height="200px"
                    width="100%"
                    cover
                  ></v-img>
                  <v-card-title>{{ place.title }}</v-card-title>
                  <v-card-subtitle>{{ place.address }}</v-card-subtitle>
                  <v-card-text>Created: {{ place.createdDate }}</v-card-text>
                </v-card>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMemberStore } from '@/store/memberStore';
import { userlistRecommend } from '@/api/hotplace';
import 'vuetify/styles'; // Vuetify styles

const memberStore = useMemberStore();
const userRecommendList = ref([]);

onMounted(() => {
  if (memberStore.userInfo) {
    console.log('memberId', memberStore.userInfo.data.id);
    fetchUserRecommendations(memberStore.userInfo.data.memberId);
  }
});

const fetchUserRecommendations = async memberId => {
  userlistRecommend(
    memberId,
    response => {
      console.log('mypage', response.data.data);
      userRecommendList.value = response.data.data;
      console.log('저장된 리스트여', userRecommendList.value);
    },
    error => {
      console.error('Failed to fetch recommendations:', error);
    },
  );
};
</script>

<style scoped>
.user-page {
  padding: 40px;
  background-color: #f8f9fa;
}

.user-info,
.recommendations {
  margin-bottom: 30px;
}

.headline {
  font-size: 24px;
  font-weight: bold;
  color: #3f51b5;
}

.title {
  font-size: 18px;
  font-weight: 500;
}

.recommendation-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.recommendation-item {
  flex: 0 0 calc(25% - 20px);
}

.recommendation-content {
  transition: transform 0.3s ease-in-out;
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.recommendation-content:hover {
  transform: scale(1.05);
}

.recommendation-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.recommendation-item .v-card-title {
  font-size: 16px;
  font-weight: bold;
}

.recommendation-item .v-card-subtitle {
  font-size: 14px;
  color: #757575;
}

.recommendation-item .v-card-text {
  font-size: 12px;
  color: #757575;
}
</style>
