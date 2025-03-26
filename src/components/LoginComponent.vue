<script lang="ts" setup>
import { ref, useTemplateRef } from 'vue'
import {
  configureOAuth,
  createAuthorizationUrl,
  finalizeAuthorization,
  // getSession,
  // OAuthUserAgent,
  resolveFromIdentity,
  // type Session,
} from '@atcute/oauth-browser-client'

configureOAuth({
  metadata: {
    client_id: import.meta.env.VITE_OAUTH_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URL,
  },
})

const handle = ref<string>('')
const loggedIn = ref<string>('Not logged in')

const loginButton = useTemplateRef<HTMLButtonElement>('login-button')

const login = async () => {
  try {
    setNotice(`Resolving your identity...`)
    const resolved = await resolveFromIdentity(handle.value)

    setNotice(`Contacting your data server...`)
    const authUrl = await createAuthorizationUrl({
      scope: import.meta.env.VITE_OAUTH_SCOPE,
      ...resolved,
    })

    setNotice(`Redirecting...`)
    await new Promise((resolve) => setTimeout(resolve, 250))
    location.assign(authUrl)

    const params = new URLSearchParams(location.hash.slice(1))

    const session = await finalizeAuthorization(params)

    const agent = new OAuthUserAgent(session)
    loggedIn.value = await agent.handle(
      '/xrpc/com.atproto.identity.resolveHandle?handle=freyja-lynx.dev',
    )
  } catch (e) {
    setNotice(`Error during OAuth login: ${e}`)
    loginButton.value!.disabled = false
  }
}
</script>

<template>
  <div>
    <label>
      account handle: <input type="text" :placeholder="your.handle.here" v-model="handle" />
    </label>
    <br />
    <button @click="login" ref="login-button">log in with oauth</button>
  </div>
</template>
