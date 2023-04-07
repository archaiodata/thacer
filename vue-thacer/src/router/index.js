import { createRouter, createWebHistory } from 'vue-router'
const TheCeramic = () => import('@/components/TheCeramic.vue')
const TheMap = () => import('@/components/TheMap.vue')
const NotFound404 = () => import('@/components/NotFound404.vue')

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
    { path: '/:pathMatch(.*)*', name: 'NotFound404', component: NotFound404 }
  ]
})

export default router
