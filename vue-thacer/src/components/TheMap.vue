<template>
  <main role="main">
    <div id="map-container">
      <div id="map" class="map"></div>
    </div>
  </main>
  <div id="encart-container">
    <div
      id="encart"
      class="encart leaflet-control-layers leaflet-container"
      style="
        position: absolute;
        bottom: 30px;
        right: 0px;
        width: 175px;
        max-height: 50%;
        overflow: auto;
        margin-right: 10px;
        padding: 6px 10px 6px 6px;
      "
    >
      Non localisés
      <div id="nonloc" class="d-flex flex-wrap"></div>
    </div>
  </div>
  
  <div class="filter-ctrl" style="right: 100px; position: absolute">
    <input
      id="filter-input"
      type="text"
      name="filter"
      placeholder="ex. 2085, 2057, plat, cratère, amphore..."
    />
  </div>
</template>

<script>
export default {
  name: 'TheMap'
}
</script>

<style scoped></style>
