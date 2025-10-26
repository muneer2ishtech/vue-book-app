<template>
  <v-navigation-drawer v-model="drawer" app :mini-variant="collapsed">
    <v-list nav dense>
      <v-list-item>
        <v-list-item-title class="font-weight-bold">My Books</v-list-item-title>
        <v-btn icon @click="$emit('toggle')">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-list-item>

      <v-list-item link @click="goHome">
        <v-list-item-icon><v-icon>mdi-home</v-icon></v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-item link @click="goBooks">
        <v-list-item-icon
          ><v-icon>mdi-book-open-page-variant</v-icon></v-list-item-icon
        >
        <v-list-item-title>Books</v-list-item-title>
      </v-list-item>

      <v-list-item v-if="auth.isAdmin" link @click="goUsers">
        <v-list-item-icon><v-icon>mdi-account-group</v-icon></v-list-item-icon>
        <v-list-item-title>Users</v-list-item-title>
      </v-list-item>

      <v-divider></v-divider>

      <v-list-item @click="toggleDropdown">
        <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
        <v-list-item-title>{{ uzerShortName }}</v-list-item-title>
        <v-menu v-model="dropdownOpen" bottom>
          <v-list>
            <v-list-item @click="goMyProfile">
              <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
              <v-list-item-title>My Profile</v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-icon><v-icon>mdi-logout</v-icon></v-list-item-icon>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const props = defineProps<{ collapsed: boolean }>();
const router = useRouter();
const auth = useAuthStore();

const drawer = ref(true);
const dropdownOpen = ref(false);

const uzerShortName = computed(() => {
  if (!auth.user) return '';
  return auth.user.firstName || auth.user.fullName || auth.user.sub;
});

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

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}
</script>
