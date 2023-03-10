<template>
  <div v-if="imageUrlArrayList !== null" class="album py-5 bg-light">
    <div class="container">
      <TheCeramicImagesSubGroup
        title="Photographie"
        :imageUrlArray="imageUrlArrayList.PHOTO"
        noImageMessage="il n'y a pas de photographie disponible pour cet exemplaire."
      ></TheCeramicImagesSubGroup>

      <TheCeramicImagesSubGroup
        title="Macrophoto"
        :imageUrlArray="imageUrlArrayList.THA_MACRO_PHOTO"
        noImageMessage="il n'y a pas de macrophoto pour cet exemplaire."
      ></TheCeramicImagesSubGroup>

      <TheCeramicImagesSubGroup
        title="Profils"
        :imageUrlArray="imageUrlArrayList.Profils"
        noImageMessage="il n'y a pas de profil disponible pour cet exemplaire."
      ></TheCeramicImagesSubGroup>
    </div>
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