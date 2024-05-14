<template>
  <div
    id="carouselExampleCaptions"
    class="carousel slide"
    data-bs-ride="carousel"
  >
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img
          src="C:\Users\SSAFY\Desktop\EnjoyTrip\EnjoyTrip-Client\client\src\assets\image1.jpg"
          class="d-block w-100"
          alt="..."
        />
        <div class="carousel-caption d-none d-md-block">
          <h1>여행가고싶어요</h1>
        </div>
      </div>
      <div class="carousel-item">
        <img
          src="C:\Users\SSAFY\Desktop\EnjoyTrip\EnjoyTrip-Client\client\src\assets\image2.jpg"
          class="d-block w-100"
          alt="..."
        />
        <div class="carousel-caption d-none d-md-block">
          <h1>여행페이지 개발이 아니라</h1>
        </div>
      </div>
      <div class="carousel-item">
        <img
          src="C:\Users\SSAFY\Desktop\EnjoyTrip\EnjoyTrip-Client\client\src\assets\image3.jpg"
          class="d-block w-100"
          alt="..."
        />
        <div class="carousel-caption d-none d-md-block">
          <h1>여행을 가고 싶어요</h1>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</template>
<script setup></script>

<style>
.carousel-item img {
  max-height: 900px; /* 이전 값에서 높이를 늘림 */
  object-fit: cover; /* 이미지가 div의 크기에 맞추어 조정되도록 설정 */
  width: 100%; /* 이미지의 너비가 컨테이너의 100%를 차지하도록 설정 */
}
</style>
