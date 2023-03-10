<template>
  <main>
    <TheCeramicText></TheCeramicText>

    <div v-if="loadingStatus === 'loading'" class="p-5 text-center">
      <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading images...</span>
      </div>
    </div>
    <div v-else-if="loadingStatus === 'error'" class="p-5">
      <div class="alert alert-danger" role="alert">Erreur de chargement des images</div>
    </div>
    <div v-else>
      <TheCeramicImages :imagesUrls="imagesUrls"></TheCeramicImages>
    </div>

    <TheCeramicChart></TheCeramicChart>
  </main>
</template>

<script>
import TheCeramicText from '@/components/TheCeramicText.vue'
import TheCeramicChart from '@/components/TheCeramicChart.vue'
import TheCeramicImages from '@/components/TheCeramicImages.vue'
import { isObject } from '@/assets/js/utils.js'

export default {
  name: 'TheCeramic',
  components: { TheCeramicChart, TheCeramicImages, TheCeramicText },
  data() {
    return {
      loadingStatus: 'loading',
      imagesUrls: null
    }
  },
  mounted() {
    const INV = this.$route.query.INV
    const ANA = this.$route.query.ANA
    fetch(`${import.meta.env.VITE_API_URL}ceram.php?INV=${INV}&ANA=${ANA}`)
      .then((response) => response.json())
      .then((imagesUrls) => {
        if (isObject(imagesUrls)) {
          this.imagesUrls = imagesUrls
          this.loadingStatus = 'loaded'
        } else {
          this.loadingStatus = 'error'
        }
      })
      .catch((error) => {
        console.error(error)
        this.loadingStatus = 'error'
      })
  }
}
</script>

<style scoped></style>