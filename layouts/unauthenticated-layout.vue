<template>
  <div class="row min-h-screen">
    <div class="col-sm-5 gt-sm bg-primary">
      <div
        class="justify-center align-center text-center text-white h-screen content-center"
      >
        Logo
      </div>
    </div>
    <div class="col-md-7 col-12 form-bg flex items-center justify-center p-8">
      <NuxtPage />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.form-bg {
  background-color: #e5e7eb;
}
</style>
