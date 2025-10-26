<template>
  <div :class="['sidebar', { collapsed: collapsed }]">
    <div style="padding: 12px; display: flex; align-items: center; gap: 8px">
      <button class="btn" @click="$emit('toggle')">☰</button>
      <span v-if="!collapsed" style="font-weight: 700">My Books</span>
    </div>
    <div style="margin-top: 12px">
      <div class="nav-item" @click="goHome">
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <span v-if="!collapsed">Home</span>
      </div>
      <div class="nav-item" @click="goBooks">
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M18 2H6c-1.1 0-2 .9-2 2v16l7-3 7 3V4c0-1.1-.9-2-2-2z"
          />
        </svg>
        <span v-if="!collapsed">Books</span>
      </div>
    </div>
    <div style="margin-top: auto; padding: 12px">
      <div class="nav-item" @click="logout">
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M16 13v-2H7V8l-5 4 5 4v-3zM20 3h-8v2h8v14h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
          />
        </svg>
        <span v-if="!collapsed">Logout</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { ref } from 'vue';
const props = defineProps({ collapsed: Boolean });
const emit = defineEmits(['toggle']);
const router = useRouter();
const auth = useAuthStore();

function goHome() {
  router.push({ name: 'Home' });
}
function goBooks() {
  router.push({ name: 'Books' });
}
function logout() {
  auth.logout();
  router.push({ name: 'SignIn' });
}
</script>
