<template>
  <div :class="['sidebar', { collapsed: collapsed }]">
    <div
      style="
        padding: 12px;
        display: flex;
        align-items: center;
        gap: 8px;
        justify-content: space-between;
      "
    >
      <span v-if="!collapsed" style="font-weight: 700">My Books</span>
      <button class="btn" @click="$emit('toggle')">☰</button>
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

      <!-- Admin-only link -->
      <div v-if="auth.isAdmin" class="nav-item" @click="goUsers">
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
          />
        </svg>
        <span v-if="!collapsed">Users</span>
      </div>

      <div class="nav-item" @click="goMyProfile">
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 12c2.7 0 4.9-2.2 4.9-4.9S14.7 2.2 12 2.2 7.1 4.4 7.1 7.1 9.3 12 12 12zm0 2.2c-3.2 0-9.5 1.6-9.5 4.9V22h19v-2.9c0-3.3-6.3-4.9-9.5-4.9z"
          />
        </svg>
        <span v-if="!collapsed">My Profile</span>
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

const props = defineProps<{ collapsed: boolean }>();

const router = useRouter();
const auth = useAuthStore();

function goHome() {
  router.push({ name: 'Home' });
}

function goBooks() {
  router.push({ name: 'Books' });
}

function goUsers() {
  router.push({ name: 'UserProfiles' });
}

function goMyProfile() {
  router.push({ name: 'UserProfileView', params: { id: auth.user.userId } });
}

function logout() {
  auth.logout();
  router.push({ name: 'SignIn' });
}
</script>

<style scoped>
.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
}
</style>
