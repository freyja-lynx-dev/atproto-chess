<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'
import { usePersistedStore } from '@/state/store'
import { finalizeAuthorization } from '@atcute/oauth-browser-client'

const router = useRouter()

const persistedStore = usePersistedStore()

onBeforeMount(async () => {
  try {
    const urlParams = new URLSearchParams(window.location.hash.slice(1))
    history.replaceState(null, '', location.pathname + location.search)
    const session = await finalizeAuthorization(urlParams)
    const did = session.info.sub
    persistedStore.lastUser = did
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
