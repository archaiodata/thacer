<template>
  <div class="filter-ctrl">
    <input
      id="filter-input"
      type="text"
      name="filter"
      placeholder="Recherche. Exemples : plat id:9130 invFouille:Indéterminé"
    />

    <div id="loading-localised" class="d-none loading-text m-2 mt-3">
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      recherche d'éléments localisés en cours...
    </div>
    <div id="loading-unlocalised" class="d-none loading-text m-2">
      <div class="spinner-border spinner-border-sm" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      recherche d'éléments non-localisés en cours...
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheMapSearch'
}
</script>

<style scoped>
.filter-ctrl {
  width: 220px;
}

.loading-text {
  font-size: 10px;
}

.filter-ctrl input[type='text'] {
  font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  width: 100%;
  border: 0;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.5);
  padding: 5px;
  box-shadow: 0 0 0 0.8px rgba(0, 0, 0, 0.5);
  border-radius: 3px;
}
</style>