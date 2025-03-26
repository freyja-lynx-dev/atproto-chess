<script lang="ts" setup>
import { ref, useTemplateRef, onMounted } from 'vue'
import {
  configureOAuth,
  createAuthorizationUrl,
  finalizeAuthorization,
  // getSession,
  OAuthUserAgent,
  resolveFromIdentity,
  // type Session,
} from '@atcute/oauth-browser-client'

configureOAuth({
  metadata: {
    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URI,
    // client_id: 'http://localhost',
    // redirect_uri: 'http://127.0.0.1:12520',
  },
})

const handle = ref<string>('')
const loggedIn = ref('Not logged in')

const loginButton = useTemplateRef<HTMLButtonElement>('login-button')

const login = async () => {
  loginButton.value!.disabled = true
  const resolved = await resolveFromIdentity(handle.value)

  const authUrl = await createAuthorizationUrl({
    scope: import.meta.env.VITE_OAUTH_SCOPE,
    ...resolved,
  })

  await new Promise((resolve) => setTimeout(resolve, 250))
  location.assign(authUrl)
}
onMounted(async () => {
  await new Promise((resolve) => setTimeout(resolve, 250))
  const params = new URLSearchParams(location.hash.slice(1))

  history.replaceState(null, '', location.pathname + location.search)

  const session = await finalizeAuthorization(params)
  const did = session.info.sub
  console.log(did)

  if (session) {
    const agent = new OAuthUserAgent(session)
    loggedIn.value = await agent.handle(
      '/xrpc/com.atproto.identity.resolveHandle?handle=freyja-lynx.dev',
    )
    console.log('resolved handle')
  }
})
</script>

<template>
  <div>
    <label>
      account handle: <input type="text" placeholder="your.handle.here" v-model="handle" />
    </label>
    <br />
    <button @click="login" ref="login-button">log in with oauth</button>
    <p>status: {{ loggedIn }}</p>
  </div>
</template>
