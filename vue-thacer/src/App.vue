<template>
  <TheHeader></TheHeader>
  <main>
    <RouterView />
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router'

import TheHeader from '@/components/TheHeader.vue'
</script>

<style scoped></style>