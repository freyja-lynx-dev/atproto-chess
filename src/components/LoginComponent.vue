<script lang="ts" setup>
import { ref, useTemplateRef, onMounted } from 'vue'
import {
  createAuthorizationUrl,
  OAuthUserAgent,
  resolveFromIdentity,
  getSession,
  type Session,
} from '@atcute/oauth-browser-client'
import { usePersistedStore } from '@/state/store'
import { XRPC } from '@atcute/client'

const handle = ref<string>('')
const loggedIn = ref('Not logged in')
const session = ref<Session>()
const oauthAgent = ref<OAuthUserAgent>()
const AuthXRPC = ref<XRPC>()

const loginButton = useTemplateRef<HTMLButtonElement>('login-button')
const persistedStore = usePersistedStore()

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
  console.log(persistedStore.token)
  if (persistedStore.token && persistedStore.lastUser) {
    session.value = await getSession(persistedStore.lastUser, { allowStale: true })
    if (session.value) {
      oauthAgent.value = new OAuthUserAgent(session.value)
      AuthXRPC.value = new XRPC({ handler: oauthAgent.value })
    }
    loggedIn.value = 'Logged In! :>'
    loginButton.value!.disabled = true
  } else {
    loginButton.value!.disabled = false
    loggedIn.value = 'Not logged in'
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
