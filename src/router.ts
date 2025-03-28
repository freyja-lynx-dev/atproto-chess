import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '@/components/HomeView.vue'
// import ProfileView from '@/components/ProfileView.vue'
import CallbackView from '@/components/CallbackView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  // { path: '/profile', component: ProfileView },
  { path: '/callback', name: 'callback', component: CallbackView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
