<script setup lang="ts"></script>

<template>
  <h1>Atproto Chess</h1>
  <p><strong>current route path:</strong> {{ $route.fullPath }}</p>
  <nav>
    <RouterLink to="/">home</RouterLink>
    <RouterLink to="/profile">profile</RouterLink>
  </nav>

  <main><RouterView /></main>
</template>
