<template>
  <div v-if="imagesUrls !== null" class="album py-5 bg-light">
    <div class="container">
      <h4>Photographie</h4>
      <div
        v-if="
          'PHOTO' in imagesUrls && Array.isArray(imagesUrls.PHOTO) && imagesUrls.PHOTO.length > 0
        "
        class="row"
      >
        <div v-for="imageUrl in imagesUrls.PHOTO" :key="imageUrl" class="col-md-4 col-sm-6">
          <div class="card mb-4 shadow-sm">
            <img
              :src="imageUrl"
              :alt="`photo ${getImageNameFromUrl(imageUrl)}`"
              class="img-thumbnail"
            />
            <div class="card-body">
              <p class="card-text">{{ getImageNameFromUrl(imageUrl) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="card mb-4 shadow-sm">
        <div class="card-body">
          <p class="card-text">il n'y a pas de photographie disponible pour cet exemplaire.</p>
        </div>
      </div>

      <h4>Macrophoto</h4>
      <div
        v-if="
          'THA_MACRO_PHOTO' in imagesUrls &&
          Array.isArray(imagesUrls.THA_MACRO_PHOTO) &&
          imagesUrls.THA_MACRO_PHOTO.length > 0
        "
        class="row"
      >
        <div
          v-for="imageUrl in imagesUrls.THA_MACRO_PHOTO"
          :key="imageUrl"
          class="col-md-4 col-sm-6"
        >
          <div class="card mb-4 shadow-sm">
            <img
              :src="imageUrl"
              :alt="`photo ${getImageNameFromUrl(imageUrl)}`"
              class="img-thumbnail"
            />
            <div class="card-body">
              <p class="card-text">Echantillon : {{ getImageNameFromUrl(imageUrl) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="card mb-4 shadow-sm">
        <div class="card-body">
          <p class="card-text">il n'y a pas de macrophoto pour cet exemplaire.</p>
        </div>
      </div>

      <h4>Profils</h4>
      <div
        v-if="
          'Profils' in imagesUrls &&
          Array.isArray(imagesUrls.Profils) &&
          imagesUrls.Profils.length > 0
        "
        class="row"
      >
        <div v-for="imageUrl in imagesUrls.Profils" :key="imageUrl" class="col-md-4 col-sm-6">
          <div class="card mb-4 shadow-sm">
            <img
              :src="imageUrl"
              :alt="`photo ${getImageNameFromUrl(imageUrl)}`"
              class="img-thumbnail"
            />
            <div class="card-body">
              <p class="card-text">{{ getImageNameFromUrl(imageUrl) }}</p>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="card mb-4 shadow-sm">
          <div class="card-body">
            <p class="card-text">il n'y a pas de profil disponible pour cet exemplaire.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheCeramicImages',
  props: {
    imagesUrls: {
      type: [Object, null],
      default: null
    }
  },
  methods: {
    getImageNameFromUrl(imageUrl) {
      const filename = imageUrl.split('/').pop()
      return filename.split('.')[0]
    }
  }
}
</script>

<style scoped></style>