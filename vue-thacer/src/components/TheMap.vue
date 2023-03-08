<template>
  <TheMapMainDisplay class="map-main-display"></TheMapMainDisplay>
  <TheMapSearch class="position-absolute top-0 left-0 map-search"></TheMapSearch>
  <TheMapInsertUnlocalised class="map-insert-unlocalised"></TheMapInsertUnlocalised>
</template>

<script>
import TheMapSearch from '@/components/TheMapSearch.vue'
import TheMapInsertUnlocalised from '@/components/TheMapInsertUnlocalised.vue'
import TheMapMainDisplay from '@/components/TheMapMainDisplay.vue'

export default {
  name: 'TheMap',
  components: { TheMapMainDisplay, TheMapInsertUnlocalised, TheMapSearch }
}
</script>

<style scoped></style>

<style>
.map-main-display {
  position: relative;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: 0;
}

.map-search {
  margin-top: 75px;
  margin-left: 12px;
}

.map-insert-unlocalised {
  position: absolute;
  bottom: 30px;
  right: 0;
  width: 175px;
  max-height: 50%;
  overflow: auto;
  margin-right: 10px;
  padding: 6px 10px 6px 6px;
}

/* .download {
  position: absolute;
  top: 25px;
  left: 100px;
  z-index: 1;
  width: 180px;
}

.download input[type="button" i] {
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  width: 100%;
  border: 0;
  background-color: #fff;
  margin: 0;
  color: rgba(0, 0, 0, .5);
  padding: 5px;
  box-shadow: 0 0 0 0.8px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
} */

g path:hover {
  fill-opacity: 0.2;
}

g path {
  stroke-width: 1;
}
</style>