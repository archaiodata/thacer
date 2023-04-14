import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import * as Sentry from '@sentry/vue'
import { BrowserTracing } from '@sentry/tracing'

import './assets/main.css'

const app = createApp(App)

Sentry.init({
  app,
  environment: import.meta.env.MODE,
  dsn: 'https://720d793acf694bf79f43181d0663f880@o4504837917048832.ingest.sentry.io/4504837920587776',
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
      tracePropagationTargets: ['thacer.archaiodata.com', /^\//]
      // Uncomment for using sentry in dev :
      // tracePropagationTargets: ['localhost', '127.0.0.1', 'thacer.archaiodata.com', /^\//]
    })
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

app.use(router)

app.mount('#app')