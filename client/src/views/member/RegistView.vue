<template>
  <div class="regist-form-wrapper">
    <registForm></registForm>
  </div>
</template>

<script setup>
import registForm from '@/components/member/RegistForm.vue';
</script>

<style lang="scss" scoped>
.regist-form-wrapper {
  position: relative;
  top: -40px; /* Adjust this value as needed */
}
</style>
