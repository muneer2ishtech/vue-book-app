<template>
  <div class="app-shell">
    <Navbar :collapsed="collapsed" @toggle="toggle" />
    <div class="main">
      <div class="topbar">
        <div class="breadcrumbs">
          <a @click.prevent="goHome" href="#">Home</a>
          <template v-if="isAdmin">
            <span class="separator">→</span>
            <a @click.prevent="goUzers" href="#">Users</a>
          </template>
          <span class="separator">→</span>
          <span>{{ uzer.id }}</span>
        </div>
      </div>
      <div class="topbar">
        <h2>{{ isSelf ? 'My Profile' : 'User Profile' }}</h2>
      </div>

      <!-- Main Tile -->
      <div style="background: white; border-radius: 8px; overflow: hidden">
        <div class="row-alt">
          <div>ID</div>
          <div>{{ uzer.id }}</div>
        </div>
        <div class="row-alt">
          <div>Email</div>
          <div>{{ uzer.email }}</div>
        </div>
        <div class="row-alt">
          <div>Full Name</div>
          <div>{{ uzer.fullName }}</div>
        </div>
        <div class="row-alt">
          <div>Roles</div>
          <div>{{ uzer.roles?.join(', ') }}</div>
        </div>
        <div class="row-alt">
          <div>Language</div>
          <div>{{ uzer.lang }}</div>
        </div>
        <div class="row-alt">
          <div>Active</div>
          <div>{{ uzer.isActive }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import api from '../services/api';
import Navbar from '../components/Navbar.vue';

const route = useRoute();
const router = useRouter();

const id = String(route.params.id);
const uzer = ref<any>({});

const auth = useAuthStore();
const isAdmin = computed(() => auth.isAdmin);
const isSelf = computed(() => auth.userId === id);

const collapsed = ref(false);

const toggle = () => (collapsed.value = !collapsed.value);

async function load() {
  try {
    const res = await api.get(`/api/v1/users/${id}`);
    uzer.value = res.data;
  } catch (e) {
    console.error(e);
    alert('Failed to load user profile');
  }
}

onMounted(load);

const goHome = () => router.push({ name: 'Home' });

const goUzers = () => router.push({ name: 'UserProfiles' });
</script>
