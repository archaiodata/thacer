<template>
  <main>
    <div v-if="loadingStatusData === 'loading'" class="p-5 text-center">
      <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading data...</span>
      </div>
    </div>
    <div v-else-if="loadingStatusData === 'error'" class="p-5">
      <div class="alert alert-danger" role="alert">Erreur de chargement</div>
    </div>
    <div v-else-if="loadingStatusData === 'not_found'" class="p-5">
      <div class="alert alert-warning" role="alert">Cet élément n'a pas été trouvé</div>
    </div>
    <div v-else>
      <TheCeramicText :ceramTextData="ceramTextData"></TheCeramicText>
    </div>

    <div v-if="loadingStatusImage === 'loading'" class="p-5 text-center">
      <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading images...</span>
      </div>
    </div>
    <div v-else-if="loadingStatusImage === 'error'" class="p-5">
      <div class="alert alert-danger" role="alert">Erreur de chargement des images</div>
    </div>
    <div v-else>
      <TheCeramicImages :imageUrlArrayList="imageUrlArrayList"></TheCeramicImages>
    </div>

    <div v-if="loadingStatusData === 'loading'" class="p-5 text-center">
      <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading data...</span>
      </div>
    </div>
    <div v-else-if="loadingStatusData === 'error'" class="p-5">
      <div class="alert alert-danger" role="alert">Erreur de chargement</div>
    </div>
    <div v-else-if="loadingStatusData === 'not_found'" class="p-5">
      <div class="alert alert-warning" role="alert">Cet élément n'a pas été trouvé</div>
    </div>
    <div v-else>
      <TheCeramicArchimage :ceramArchimageData="ceramArchimageData"></TheCeramicArchimage>
    </div>

    <TheCeramicChart></TheCeramicChart>
  </main>
</template>

<script>
import TheCeramicText from '@/components/TheCeramicText.vue'
import TheCeramicChart from '@/components/TheCeramicChart.vue'
import TheCeramicImages from '@/components/TheCeramicImages.vue'
import { isObject } from '@/assets/js/utils.js'
import TheCeramicArchimage from '@/components/TheCeramicArchimage.vue'

export default {
  name: 'TheCeramic',
  components: {
    TheCeramicArchimage,
    TheCeramicChart,
    TheCeramicImages,
    TheCeramicText
  },
  data() {
    return {
      loadingStatusImage: 'loading',
      loadingStatusData: 'loading',
      imageUrlArrayList: null,
      ceramTextData: null,
      ceramArchimageData: null
    }
  },
  mounted() {
    const INV = this.$route.query.INV
    const ANA = this.$route.query.ANA
    fetch(`${import.meta.env.VITE_API_URL}ceram.php?INV=${INV}&ANA=${ANA}`)
      .then((response) => response.json())
      .then((imageUrlArrayList) => {
        if (isObject(imageUrlArrayList)) {
          this.imageUrlArrayList = imageUrlArrayList
          this.loadingStatusImage = 'loaded'
        } else {
          this.loadingStatusImage = 'error'
        }
      })
      .catch((error) => {
        console.error(error)
        this.loadingStatusImage = 'error'
      })

    fetch(import.meta.env.VITE_API_URL + '/geojson/ceram.geojson')
      .then((response) => response.json())
      .then((ceramGeojson) => {
        const id = this.$route.query.ID
        const ceramProperties = this.findCeramObjectProperties(id, ceramGeojson)
        if (ceramProperties) {
          this.setCeramTextValues(ceramProperties)
          this.setCeramArchimageValues(ceramProperties)
          this.loadingStatusData = 'loaded'
        } else {
          this.loadingStatusData = 'not_found'
        }
      })
      .catch((error) => {
        console.error(error)
        this.loadingStatusData = 'error'
      })
  },
  methods: {
    findCeramObjectProperties(id, ceramGeojson) {
      const features = ceramGeojson['features']
      for (let i = 0; i < features.length; i++) {
        if (features[i].properties.ID === id) {
          return features[i].properties
        }
      }
      return null
    },
    setCeramTextValues(ceramProperties) {
      if (!ceramProperties) {
        return
      }

      this.ceramTextData = {}

      this.ceramTextData.identification = ceramProperties.Identification

      if (ceramProperties.Pi) {
        this.ceramTextData.inventaires = ceramProperties.Pi + 'Π'
      }
      if (ceramProperties.Inv_Fouille) {
        this.ceramTextData.inventaires += ' ' + ceramProperties.Inv_Fouille
      }
      if (ceramProperties.Num_Analyse) {
        this.ceramTextData.inventaires += ' - échantillon : ' + ceramProperties.Num_Analyse
      }

      if (ceramProperties.Famille) {
        this.ceramTextData.familleCategorieType = 'Famille : ' + ceramProperties.Famille
      }
      if (ceramProperties.Catégorie) {
        this.ceramTextData.familleCategorieType += ' Catégorie : ' + ceramProperties.Catégorie
      }
      if (ceramProperties.Type) {
        this.ceramTextData.familleCategorieType += +' type : ' + ceramProperties.Type
      }

      this.ceramTextData.description = 'Description : ' + ceramProperties.Description

      if (ceramProperties.Biblio) {
        this.ceramTextData.biblio = ' Publication : ' + ceramProperties.Biblio
      }
    },
    setCeramArchimageValues(ceramProperties) {
      if (!ceramProperties) {
        return
      }

      this.ceramArchimageData = {}

      if (ceramProperties.Archimage) {
        this.ceramArchimageData.archimageImageUrl =
          'https://archimage.efa.gr/action.php?kroute=image_preview_public&id=' +
          ceramProperties.Archimage +
          '&type=2&ext=.jpg'
        this.ceramArchimageData.archimageLink =
          'https://archimage.efa.gr/?kroute=fiche_publique&id=' + ceramProperties.Archimage
        if (ceramProperties.Pi) {
          this.ceramArchimageData.archimageText = 'Π' + ceramProperties.Pi
        }
      }
    }
  }
}
</script>

<style scoped></style>