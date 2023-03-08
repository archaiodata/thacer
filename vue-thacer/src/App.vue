<script setup>
import { RouterView } from 'vue-router'

import TheHeader from '@/components/TheHeader.vue'
</script>

<template>
  <TheHeader></TheHeader>
  <main class="main-container">
    <RouterView />
  </main>
</template>

<style scoped>
.main-container {
  width: 100%;
  height: 93%;
  position: fixed;
}
</style>