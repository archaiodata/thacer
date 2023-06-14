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
#nonloc a {
  font-size: 11px;
  color: white;
  text-decoration: none;
  background: #f54b36;
}
</style>
