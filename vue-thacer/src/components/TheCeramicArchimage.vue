<template>
  <div v-if="ceramArchimageData !== null">
    <h4>Archimage</h4>
    <div class="card">
      <div v-if="ceramArchimageData.archimageLink" class="text-center p-2">
        <a :href="ceramArchimageData.archimageLink" target="_blank">
          <img
            :src="ceramArchimageData.archimageImageUrl"
            alt="image archimage"
            class="img-thumbnail"
          />
        </a>
        <div>{{ ceramArchimageData.archimageText }}</div>
      </div>
      <div v-else>
        <img
          src="https://www.efa.gr/images/logo/01archimage.jpg"
          alt="logo archimage "
          class="pt-3 ps-3"
        />
        <div class="card-body">
          <p id="ArchimageTxt" class="card-text">
            il n'y a pas de photographie Archimage disponible pour cet exemplaire.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheCeramicArchimage',
  props: {
    ceramArchimageData: {
      type: [Object, null],
      default: null
    }
  }
}
</script>

<style scoped></style>