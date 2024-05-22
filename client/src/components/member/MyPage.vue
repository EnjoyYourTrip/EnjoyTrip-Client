<template>
  <v-container class="user-page" fluid>
    <!-- User Information Section -->
    <v-row class="user-info" justify="center">
      <v-col cols="12" md="8">
        <v-card outlined>
          <v-card-title>User Information</v-card-title>
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >ID: {{ memberStore.userInfo.data.id }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
                    >Name:
                    {{ memberStore.userInfo.data.nickname }}</v-list-item-title
                  >
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    Email: {{ memberStore.userInfo.data.email }}@{{
                      memberStore.userInfo.data.emailDomain
                    }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title
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
          <v-card-title>Favorite Hotplaces</v-card-title>
          <v-card-text>
            <v-slide-group
              show-arrows
              center-active
              v-model="slideGroupModel"
              class="recommendation-slide-group"
              @change="startAutoSlide"
            >
              <v-slide-item
                v-for="place in userRecommendList"
                :key="place.hotplaceId"
                class="recommendation-item"
              >
                <v-card class="recommendation-content">
                  <v-img
                    :src="`https://3e2b-121-147-32-101.ngrok-free.app/uploads/${place.saveFolder}/${place.saveFile}`"
                    alt="hotplace image"
                    class="recommendation-image"
                    height="300px"
                    contain
                  ></v-img>
                  <v-card-title>{{ place.title }}</v-card-title>
                  <v-card-subtitle>{{ place.address }}</v-card-subtitle>
                  <v-card-text>Created: {{ place.createdDate }}</v-card-text>
                </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useMemberStore } from '@/store/memberStore';
import { userlistRecommend } from '@/api/hotplace';
import 'vuetify/styles'; // Vuetify styles

const memberStore = useMemberStore();
const userRecommendList = ref([]);
const slideGroupModel = ref(0);
let slideInterval = null;

const startAutoSlide = () => {
  if (slideInterval) clearInterval(slideInterval);
  slideInterval = setInterval(() => {
    slideGroupModel.value =
      (slideGroupModel.value + 1) % userRecommendList.value.length;
  }, 3000);
};

const stopAutoSlide = () => {
  if (slideInterval) clearInterval(slideInterval);
};

onMounted(() => {
  if (memberStore.userInfo) {
    console.log('memberId', memberStore.userInfo.data.id);
    fetchUserRecommendations(memberStore.userInfo.data.memberId);
  }
  startAutoSlide();
});

onBeforeUnmount(() => {
  stopAutoSlide();
});

const fetchUserRecommendations = async memberId => {
  userlistRecommend(
    memberId,
    response => {
      console.log('mypage', response.data.data);
      userRecommendList.value = response.data.data;
      console.log('저장된 리스트여', userRecommendList.value);
      startAutoSlide();
    },
    error => {
      console.error('Failed to fetch recommendations:', error);
    },
  );
};
</script>

<style scoped>
.user-page {
  padding: 20px;
}

.user-info,
.recommendations {
  margin-bottom: 30px;
}

.recommendation-slide-group {
  display: flex;
  overflow: hidden;
}

.recommendation-item {
  min-width: 300px;
  margin-right: 10px;
}

.recommendation-image {
  border-radius: 8px;
  width: 100%;
  height: 300px;
  object-fit: cover;
}
</style>
