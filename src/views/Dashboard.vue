<template>
  <v-app>
    <AppNav />
    <v-main class="pa-4">
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import AppNav from '../components/Layout/AppNav.vue';
</script>
