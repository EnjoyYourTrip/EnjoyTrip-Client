<template>
  <div
    @click="fire"
    :class="`${filter} filter-item`"
    :style="`background-image:url(${image})`"
  >
    <!--
      slot으로 부모 -> 자식 데이터전송법
          1. 자식은 구멍 뚫기(slot)
          2. <컴포넌트> 태그 사이에 데이터넣기 -> 넣은 데이터는 전부 slot으로 넘어감
    -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'filterbox',
  methods: {
    /**
           mitt로 데이터 전송하는 법
              1. this.emitter.emit()으로 발사하고
              2. this.emitter.on()으로 수신하면 됩니다.
           
           */
    // fire() {
    //   this.emitter.emit('clickFilter', this.필터);
    // },
  },
  props: {
    image: String,
    filter: String,
  },
};
</script>

<style>
.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color: white;
  background-size: cover;
  background-position: center;
}
</style>
