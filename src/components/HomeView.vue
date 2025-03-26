<script lang="ts">
export default {
  methods: {
    goToProfile() {
      this.$router.push('/profile')
    },
  },
}
</script>

<template>
  <h2>log in to play!</h2>
  <button @click="goToProfile">Profile</button>
</template>
