import { createRouter, createWebHistory } from 'vue-router'
import TheCeramic from '@/components/TheCeramic.vue'
import TheMap from '@/components/TheMap.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheMap
    },
    {
      path: '/ceramic',
      name: 'about',
      component: TheCeramic
    }
  ]
})

export default router
