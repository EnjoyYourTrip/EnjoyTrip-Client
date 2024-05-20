<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  hotplace: {
    type: Object,
    required: true,
  },
});

const urls = ({ saveFolder, saveFile }) => {
  if (!saveFolder || !saveFile) {
    return '';
  }
  const url = `https://8655-121-147-32-101.ngrok-free.app/uploads/${saveFolder}/${saveFile}`;
  return url;
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
</style>
