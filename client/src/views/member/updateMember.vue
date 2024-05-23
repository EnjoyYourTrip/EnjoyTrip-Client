<template>
  <div class="update-form-wrapper">
    <update-form />
  </div>
</template>

<script setup>
import updateForm from '@/components/member/updateForm.vue';
</script>

<style lang="scss" scoped>
.update-form-wrapper {
  position: relative;
  top: -40px; /* Adjust this value as needed */
}
</style>
