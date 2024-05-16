<template>
  <div class="row">
    <div
      v-for="item in items"
      :key="item.id"
      class="col-12 col-md-3 col-lg-3 mb-4"
    >
      <slot :item="item"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    colClass: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
}
.col-12 {
  display: flex;
  justify-content: center;
}
</style>
