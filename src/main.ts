import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles.css'
import { createPinia } from 'pinia'
import { createPersistedState } from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
pinia.use(createPersistedState())
app.use(pinia)
app.use(router)
app.mount('#app')
