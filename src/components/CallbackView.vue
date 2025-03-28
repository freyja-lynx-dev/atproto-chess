<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import { usePersistedStore } from '@/state/store'

const router = useRouter()

const persistedStore = usePersistedStore()

onBeforeMount(async () => {
  try {
    const urlParams = new URLSearchParams(window.location.hash.slice(1))
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
