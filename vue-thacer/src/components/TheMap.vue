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

<style>
body {
  margin: 0;
  padding: 0;
}

#map-container {
  width: 100%;
  height: 93%;
  position: fixed;
}

.map {
  position: relative;
  top: 0px;
  bottom: 0px;
  width: 100%;
  height: 100%;
  padding: 0;
}

.filter-ctrl {
  /*.position: absolute;
    top: 25px;
    right: 100px;
    z-index: 1;*/
  width: 220px;
}

.filter-ctrl input[type='text'] {
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  width: 100%;
  border: 0;
  background-color: #fff;
  margin: 0;
  color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  box-shadow: 0 0 0 0.8px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
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

.my-icon {
  top: -20px;
  left: -20px;
  border-radius: 100%;
  border-style: solid;
  border-color: #f54b36;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 35px;
  color: white;
  background: #f54b36;
  font-size: 11px;
}

.lost-icon {
  border-radius: 10%;
  border-style: solid;
  border-color: #f54b36;
  /* width: 40px;
  height: 40px; */
  /* text-align: center; */
  /* line-height: 35px; */
  color: white;
  background: #f54b36;
  font-size: 10px;
}

.EFA-icon {
  top: -20px;
  left: -20px;
  border-radius: 100%;
  border-style: solid;
  border-color: #005599;
  width: 40px;
  height: 40px;
  text-align: center;
  line-height: 35px;
  color: white;
  background: #005599;
}

.ADelt-icon {
  border-radius: 100%;
  border-style: solid;
  width: 4px;
  height: 4px;
  line-height: 15px;
}

g path:hover {
  fill-opacity: 0.2;
}

g path {
  stroke-width: 1;
}

.leaflet-popup-content {
  padding: 2px;
  line-height: 1.2;
}

.leaflet-control-layers label {
  margin-bottom: 0rem;
}

.leaflet-popup {
  bottom: 2px;
  left: 175px;
}

.leaflet-popup-tip-container {
  height: 40px;
}

.leaflet-popup-content img {
  margin: 4%;
}

.leaflet-container p {
  font-size: 10px;
  line-height: 15px;
}

.marker-cluster-medium,
.marker-cluster-small,
.marker-cluster-large,
.marker-cluster-medium div,
.marker-cluster-small div,
.marker-cluster-large div {
  background-color: rgba(245, 75, 54, 0.7);
}

.circle,
.circle div {
  background-color: rgba(0, 85, 153, 0.7);
  width: 30px;
  height: 30px;
  margin-left: 5px;
  margin-top: 5px;
  text-align: center;
  border-radius: 15px;
  font: 12px 'Helvetica Neue', Arial, Helvetica, sans-serif;
}

.circle {
  border-radius: 20px;
}

.circle div span {
  line-height: 30px;
}
</style>