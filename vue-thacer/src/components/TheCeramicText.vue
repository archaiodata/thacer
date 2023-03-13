<template>
  <div v-if="ceramTextData !== null">
    <h2>{{ ceramTextData.identification }}</h2>
    <p class="lead text-muted">{{ ceramTextData.inventaires }}</p>
    <p>{{ ceramTextData.familleCategorieType }}</p>
    <p>{{ ceramTextData.description }}</p>
    <p>{{ ceramTextData.biblio }}</p>
  </div>
</template>

<script>
export default {
  name: 'TheCeramicText',
  props: {
    ceramTextData: {
      type: [Object, null],
      default: null
    }
  }
}
</script>

<style scoped></style>