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
        <img src="@/assets/image1.jpg" class="d-block w-100" alt="..." />
        <div class="carousel-caption custom-caption d-none d-md-block">
          <h1>나만 알고 있는 여행지, 함께 공유해요</h1>
          <p>여행의 즐거움을 다른 사람들과 나누세요</p>
          <p>#비밀여행지 #추억공유 #여행이야기</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="@/assets/image2.jpg" class="d-block w-100" alt="..." />
        <div class="carousel-caption custom-caption d-none d-md-block">
          <h1>당신의 특별한 순간을 기록하세요</h1>
          <p>사진과 이야기를 통해 여행을 되새기세요</p>
          <p>#여행사진 #여행블로그 #스토리텔링</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="@/assets/image3.jpg" class="d-block w-100" alt="..." />
        <div class="carousel-caption custom-caption d-none d-md-block">
          <h1>함께 만들어가는 여행 커뮤니티</h1>
          <p>다른 여행자들과 소통하며 정보를 나누세요</p>
          <p>#커뮤니티 #여행정보 #친구찾기</p>
        </div>
      </div>
    </div>
    <button
      class="carousel-control-prev custom-carousel-btn"
      type="button"
      data-bs-target="#carouselExampleCaptions"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next custom-carousel-btn"
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

<style scoped>
.carousel-item img {
  width: 100vw; /* Full viewport width */
  height: 100vh; /* Full viewport height */
  object-fit: cover; /* Cover the entire area */
}

.custom-carousel-btn {
  background: none !important;
  border: none !important;
  padding: 0 !important;
}

.custom-carousel-btn:hover {
  background: none !important;
  padding: 0 !important;
}

.carousel-caption.custom-caption {
  position: absolute;
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
  text-align: left;
  color: #fff;
}

.carousel-caption.custom-caption h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

.carousel-caption.custom-caption p {
  font-size: 1.5rem;
}
</style>
