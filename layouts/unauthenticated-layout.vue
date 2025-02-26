<template>
  <div class="row min-h-screen">
    <div class="col-sm-5 gt-sm bg-primary">
      <div
        class="justify-center align-center text-center text-white h-screen content-center"
      >
        Logo
      </div>
    </div>
    <div
      class="col-md-7 col-12 form-bg flex items-center self-center justify-center p-8"
    >
      <NuxtPage />
      <div class="row w-full self-end" v-if="environment != 'production'">
        <div class="col-12 text-center text-caption">
          {{ version }} @ {{ environment }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const config = useRuntimeConfig();

const version = config.public.app_version;
const environment = config.public.environment;
</script>
<style scoped></style>
