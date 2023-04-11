import * as Sentry from '@sentry/vue'

export const isObject = (o) => {
  return typeof o === 'object' && !Array.isArray(o) && o !== null
}

export const notifyProgrammaticError = (message) => {
  console.error(message)
  Sentry.captureMessage(message)
}