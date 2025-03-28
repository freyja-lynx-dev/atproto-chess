<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { onBeforeMount, onMounted } from 'vue'
import { usePersistedStore } from '@/state/store'

const router = useRouter()

const persistedStore = usePersistedStore()

onBeforeMount(async () => {
  console.log('before mount')
})
onMounted(async () => {
  console.log('mounted')
  try {
    const urlParams = new URLSearchParams(window.location.search)
    history.replaceState(null, '', location.pathname + location.search)
    persistedStore.token = urlParams.get('code')
  } catch {
    persistedStore.token = null
  } finally {
    await router.replace('/')
  }
})
</script>

<template>
  <div>oauth callback</div>
</template>
