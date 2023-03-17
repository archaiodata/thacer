<template>
  <div class="filter-ctrl">
    <input
      id="filter-input"
      type="text"
      name="filter"
      placeholder="Recherche. Exemples : plat id:9130 invFouille:Indéterminé"
    />
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