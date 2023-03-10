<template>
  <h4>{{ title }}</h4>
  <div v-if="Array.isArray(imageUrlArray) && imageUrlArray.length > 0" class="row">
    <div v-for="imageUrl in imageUrlArray" :key="imageUrl" class="col-md-4 col-sm-6">
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
      <p class="card-text">{{ noImageMessage }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheCeramicImagesSubGroup',
  props: {
    title: {
      type: String,
      default: ''
    },
    imageUrlArray: {
      type: Array,
      default() {
        return []
      }
    },
    noImageMessage: {
      type: String,
      default: ''
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