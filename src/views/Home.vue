<template>
  <div class="app-shell">
    <Navbar :collapsed="collapsed" @toggle="toggle" />
    <div class="main">
      <div class="topbar">
        <div>
          <div class="breadcrumbs">Home</div>
          <h1>{{ welcome }}</h1>
        </div>
        <div>
          <span v-if="profileName">{{ profileName }}</span>
        </div>
      </div>
      <div>
        <p>Use the sidebar to navigate to Books.</p>
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
const welcome = computed(() =>
  profileName.value
    ? `Welcome ${profileName.value}`
    : `Welcome ${auth.user.sub || auth.user.email || ''}`
);
</script>
