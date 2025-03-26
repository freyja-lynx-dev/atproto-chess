<script lang="ts" setup>
import { useRouter } from 'vue-router'
import LoginComponent from './LoginComponent.vue'

const router = useRouter()

const navigateTo = async (url: string) => {
  await router.push(url)
}
</script>

<template>
  <h2>log in to play!</h2>
  <br />
  <LoginComponent />
  <br />
  <button @click="navigateTo('/profile')">Profile</button>
</template>
