import * as Sentry from '@sentry/vue'

export const testThrowExceptionInJs = () => {
  throw new Error('SENTRY TEST : throwExceptionInJs')
}

export const testCaptureMessageInJs = () => {
  Sentry.captureMessage('SENTRY TEST : testCaptureMessageInJs')
}