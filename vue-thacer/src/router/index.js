import { createRouter, createWebHashHistory } from 'vue-router'
const TheCeramic = () => import('@/components/TheCeramic.vue')
const TheMap = () => import('@/components/TheMap.vue')
const TheBiblio = () => import('@/components/TheBiblio.vue')
const NotFound404 = () => import('@/components/NotFound404.vue')

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheMap
    },
    {
      path: '/ceram',
      name: 'ceram',
      component: TheCeramic
    },
    {
      path: '/biblio',
      name: 'biblio',
      component: TheBiblio
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound404', component: NotFound404 }
  ]
})

export default router
