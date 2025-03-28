<script setup lang="ts">
import { configureOAuth } from '@atcute/oauth-browser-client'
configureOAuth({
  metadata: {
    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URI,
  },
})
</script>

<template>
  <h1>Atproto Chess</h1>
  <p><strong>current route path:</strong> {{ $route.fullPath }}</p>

  <main><RouterView /></main>
</template>
