<template>
  <TheMapMainDisplay class="map-main-display"></TheMapMainDisplay>
  <TheMapSearch class="position-absolute map-search"></TheMapSearch>
  <TheMapInsertUnlocalised class="map-insert-unlocalised"></TheMapInsertUnlocalised>
</template>

<script>
import TheMapSearch from '@/components/TheMapSearch.vue'
import TheMapInsertUnlocalised from '@/components/TheMapInsertUnlocalised.vue'
import TheMapMainDisplay from '@/components/TheMapMainDisplay.vue'

export default {
  name: 'TheMap',
  components: {
    TheMapMainDisplay,
    TheMapInsertUnlocalised,
    TheMapSearch
  }
}
</script>

<style scoped>
.map-main-display {
  position: fixed;
  width: 100%;
  height: calc(100vh - 50.3px);
}

.map-search {
  position: absolute;
  margin-top: 10px;
  left: 12px;
}

.map-insert-unlocalised {
  position: absolute;
  bottom: 35px;
  right: 0;
  width: 175px;
  max-height: 50%;
  overflow: auto;
  margin-right: 10px;
  /* padding: 6px 10px 6px 6px; */
}
</style>
