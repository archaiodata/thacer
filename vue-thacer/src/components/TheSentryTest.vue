<template>
  <div>
    <button @click="testThrowExceptionInJs">testThrowExceptionInJs</button>
  </div>
  <div>
    <button @click="testCaptureMessageInJs">testCaptureMessageInJs</button>
  </div>
  <div>
    <button @click="testThrowExceptionInVue">testThrowExceptionInVue</button>
  </div>
  <div>
    <button @click="testCaptureMessageInVue">testCaptureMessageInVue</button>
  </div>
</template>

<script>
import { testThrowExceptionInJs, testCaptureMessageInJs } from '@/assets/js/sentry-test'
import * as Sentry from '@sentry/vue'

export default {
  name: 'TheSentrySentry',
  methods: {
    testCaptureMessageInJs,
    testThrowExceptionInJs,
    testThrowExceptionInVue() {
      throw new Error('SENTRY TEST : throwExceptionInVue')
    },

    testCaptureMessageInVue() {
      Sentry.captureMessage('SENTRY TEST : testCaptureMessageInVue')
    }
  }
}
</script>

<style scoped></style>