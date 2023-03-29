import { createRouter, createWebHistory } from 'vue-router'
import TheCeramic from '@/components/TheCeramic.vue'
import TheMap from '@/components/TheMap.vue'
import NotFound404 from '@/components/NotFound404.vue'
import TheSentryTest from '@/components/TheSentryTest.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheMap
    },
    {
      path: '/ceram',
      name: 'about',
      component: TheCeramic
    },
    {
      path: '/sentry-test',
      name: 'sentry-test',
      component: TheSentryTest
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound404', component: NotFound404 }
  ]
})

export default router