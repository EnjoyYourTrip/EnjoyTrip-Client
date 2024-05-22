<script setup>
import { defineProps, defineEmits, ref } from 'vue';

const props = defineProps({
  hotplace: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(['likeHotplace']);

// 좋아요 상태를 관리할 ref 변수
const isLiked = ref(false);

// 서버에서 받아온 좋아요 상태를 초기화
isLiked.value = props.hotplace.isHearted;

const urls = ({ saveFolder, saveFile }) => {
  if (!saveFolder || !saveFile) {
    return '';
  }
  // const url = `http://3e2b-121-147-32-101.ngrok-free.app/uploads/${saveFolder}/${saveFile}`;
  const url = `${import.meta.env.VITE_VUE_API_URL}/uploads/${saveFolder}/${saveFile}`;
  console.log('서버 파일 url', url);
  return url;
};

const handleLike = () => {
  isLiked.value = !isLiked.value;
  emit('likeHotplace', props.hotplace.hotplaceId);
};
</script>

<template>
  <div class="hotplace-card">
    <div class="hotplace-img-container">
      <img
        :src="
          urls({
            saveFolder: props.hotplace.saveFolder,
            saveFile: props.hotplace.saveFile,
          })
        "
        class="hotplace-img"
        :alt="props.hotplace.title"
      />
      <div class="hotplace-overlay">
        <div class="hotplace-text">
          <h3>{{ props.hotplace.title }}</h3>
          <p>{{ props.hotplace.content }}</p>
          <p>{{ props.hotplace.address }}</p>
          <p>{{ props.hotplace.createdDate }}</p>
        </div>
      </div>
      <button @click="handleLike" :class="['like-btn', { liked: isLiked }]">
        <svg
          v-if="isLiked"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="red"
          class="icon"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.hotplace-card {
  position: relative;
  width: 100%;
  max-width: 400px;
  margin: 10px;
  overflow: hidden;
  border-radius: 15px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.hotplace-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}
.hotplace-img-container {
  position: relative;
  width: 100%;
  padding-top: 100%; /* 1:1 Aspect Ratio */
}
.hotplace-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 15px;
}
.hotplace-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  border-radius: 15px;
}
.hotplace-card:hover .hotplace-overlay {
  opacity: 1;
}
.hotplace-text {
  padding: 20px;
}
.hotplace-text h3 {
  margin: 0 0 10px;
  font-size: 1.5em;
}
.hotplace-text p {
  margin: 5px 0;
  font-size: 1em;
}
.like-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
}
.icon {
  width: 24px;
  height: 24px;
}
.liked .icon {
  fill: red;
  stroke: red;
}
</style>
