<template>
  <section>
    <div id="encart-container">
      <div id="encart" class="leaflet-control-layers leaflet-container text-center p-1">
        Non localisés
        <div id="nonloc" class="d-flex flex-wrap"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'TheMapInsertUnlocalised'
}
</script>

<style>
a.unlocalised-tag {
  border-radius: 10%;
  border-style: solid;
  border-color: #f54b36;
  color: white;
  background: #f54b36;
  font-size: 10px;
}
.leaflet-container a {
  color: white;
}
</style>
