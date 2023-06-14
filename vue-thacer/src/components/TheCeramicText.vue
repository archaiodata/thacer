<template>
  <div v-if="ceramData !== null">
    <h2 class="m-0">{{ ceramTitre }}</h2>
    <p class="lead text-muted m-0">{{ ceramInv }}</p>
    <ul>
      <div v-for="(value, name, index) in ceramData" :key="index">
        <div v-if="value && name != 'ID' && name != 'Pi' && name != 'x' && name != 'y'">
          {{ name }}
          :
          {{ value }}
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TheCeramicText',
  props: {
    ceramData: {
      type: [Object, null],
      default: null
    }
  },
  computed: {
    ceramTitre: function () {
      return this.ceramData.Identification ? this.ceramData.Identification : this.ceramData.Forme
    },
    ceramInv: function () {
      let inv = 'Inv. : ' + this.ceramData.ID
      if (this.ceramData.Pi) {
        inv += ' ; Π' + this.ceramData.Pi
      }
      return inv
    }
  }
}
</script>

<style scoped></style>
