<template>
  <div class="app-shell">
    <Navbar :collapsed="collapsed" @toggle="toggle" />
    <div class="main">
      <div class="topbar">
        <div class="breadcrumbs">
          <span>Home</span>
        </div>
      </div>

      <!-- Main Tile -->
      <div style="background: white; border-radius: 8px; overflow: hidden">
        <div class="middleOfMainTileVerticallyHorizontally">
          <h1>Welcome {{ profileName }}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import Navbar from '../components/Navbar.vue';
import { useAuthStore } from '../stores/auth';

const collapsed = ref(false);
function toggle() {
  collapsed.value = !collapsed.value;
}

const auth = useAuthStore();
const profileName = computed(
  () => auth.user.fullName || auth.user.full_name || ''
);
</script>
