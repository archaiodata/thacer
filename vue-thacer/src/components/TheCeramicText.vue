<template>
  <div v-if="loadingStatus === 'loading'" class="p-5 text-center">
    <div class="spinner-border text-secondary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else-if="loadingStatus === 'error'" class="p-5">
    <div class="alert alert-danger" role="alert">Erreur de chargement</div>
  </div>
  <div v-else-if="loadingStatus === 'not_found'" class="p-5">
    <div class="alert alert-warning" role="alert">Cet élément n'a pas été trouvé</div>
  </div>
  <div v-else>
    <section class="bg-body-secondary py-3">
      <div class="container">
        <h2>{{ identification }}</h2>
        <p class="lead text-muted">{{ inventaires }}</p>
        <p>{{ familleCategorieType }}</p>
        <p>{{ description }}</p>
        <p>{{ biblio }}</p>
      </div>
    </section>

    <section class="bg-light pt-5">
      <div class="container">
        <div class="card p-2 text-center shadow-sm">
          <div v-if="archimageLink">
            <a :href="archimageLink" target="_blank">
              <img :src="archimageImageUrl" alt="image archimage" class="img-thumbnail" />
            </a>
            <div>{{ archimageText }}</div>
          </div>
          <div v-else>
            <img
              src="https://www.efa.gr/images/logo/01archimage.jpg"
              alt="logo archimage "
              class="img-thumbnail"
            />
            <div class="card-body">
              <p id="ArchimageTxt" class="card-text">
                il n'y a pas de photographie Archimage disponible pour cet exemplaire.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TheCeramicText',
  data() {
    return {
      identification: '',
      inventaires: '',
      familleCategorieType: '',
      description: '',
      biblio: '',
      archimageLink: null,
      archimageText: '',
      archimageImageUrl: null,
      loadingStatus: 'loading'
    }
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
    setCeramTemplateValues(ceramProperties) {
      if (!ceramProperties) {
        return
      }

      this.identification = ceramProperties.Identification

      if (ceramProperties.Pi) {
        this.inventaires = ceramProperties.Pi + 'Π'
      }
      if (ceramProperties.Inv_Fouille) {
        this.inventaires += ' ' + ceramProperties.Inv_Fouille
      }
      if (ceramProperties.Num_Analyse) {
        this.inventaires += ' - échantillon : ' + ceramProperties.Num_Analyse
      }

      if (ceramProperties.Famille) {
        this.familleCategorieType = 'Famille : ' + ceramProperties.Famille
      }
      if (ceramProperties.Catégorie) {
        this.familleCategorieType += ' Catégorie : ' + ceramProperties.Catégorie
      }
      if (ceramProperties.Type) {
        this.familleCategorieType += +' type : ' + ceramProperties.Type
      }

      this.description = 'Description : ' + ceramProperties.Description

      if (ceramProperties.Biblio) {
        this.biblio = ' Publication : ' + ceramProperties.Biblio
      }

      if (ceramProperties.Archimage) {
        this.archimageImageUrl =
          'https://archimage.efa.gr/action.php?kroute=image_preview_public&id=' +
          ceramProperties.Archimage +
          '&type=2&ext=.jpg'
        this.archimageLink =
          'https://archimage.efa.gr/?kroute=fiche_publique&id=' + ceramProperties.Archimage
        if (ceramProperties.Pi) {
          this.archimageText = 'Π' + ceramProperties.Pi
        }
      }
    }
  },
  mounted() {
    fetch(import.meta.env.VITE_API_URL + '/geojson/ceram.geojson')
      .then((response) => response.json())
      .then((ceramGeojson) => {
        const id = this.$route.query.ID
        const ceramProperties = this.findCeramObjectProperties(id, ceramGeojson)
        if (ceramProperties) {
          this.setCeramTemplateValues(ceramProperties)
          this.loadingStatus = 'loaded'
        } else {
          this.loadingStatus = 'not_found'
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