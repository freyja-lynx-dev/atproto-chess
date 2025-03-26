import { createMemoryHistory, createRouter } from 'vue-router'
import HomeView from './components/HomeView.vue'
import ProfileView from './components/ProfileView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/', component: ProfileView },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router
