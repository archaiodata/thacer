<template>
  <div v-if="imageUrlArrayList.PHOTO.length != 0">
    <TheCeramicImagesSubGroup
      title="Photographie"
      :imageUrlArray="imageUrlArrayList.PHOTO"
      noImageMessage="il n'y a pas de photographie disponible pour cet exemplaire."
    ></TheCeramicImagesSubGroup>
  </div>
  <div v-if="imageUrlArrayList.THA_MACRO_PHOTO.length != 0">
    <TheCeramicImagesSubGroup
      title="Macrophoto"
      :imageUrlArray="imageUrlArrayList.THA_MACRO_PHOTO"
      noImageMessage="il n'y a pas de macrophoto pour cet exemplaire."
    ></TheCeramicImagesSubGroup>
  </div>
  <div v-if="imageUrlArrayList.Profils.length != 0">
    <TheCeramicImagesSubGroup
      title="Profils"
      :imageUrlArray="imageUrlArrayList.Profils"
      noImageMessage="il n'y a pas de profil disponible pour cet exemplaire."
    ></TheCeramicImagesSubGroup>
  </div>
</template>

<script>
import TheCeramicImagesSubGroup from '@/components/TheCeramicImagesSubGroup.vue'

export default {
  name: 'TheCeramicImages',
  components: { TheCeramicImagesSubGroup },
  props: {
    imageUrlArrayList: {
      type: [Object, null],
      default: null
    }
  }
}
</script>

<style scoped></style>
