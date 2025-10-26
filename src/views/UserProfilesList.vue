<template>
  <div class="app-shell">
    <Navbar :collapsed="collapsed" @toggle="toggle" />
    <div class="main">
      <div class="topbar">
        <div class="breadcrumbs">
          <a @click.prevent="goHome" href="#">Home</a>
          <span class="separator">→</span>
          <span>Users</span>
        </div>
      </div>

      <div class="topbar">
        <div>
        <h2>Users</h2>
        </div>
        <div>
        <button class="btn" @click="refresh">Refresh</button>
        </div>
      </div>

      <!-- Main Tile -->
      <div>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Language</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in pagedUzers" :key="u.id">
            <td>{{ u.id }}</td>
            <td>{{ u.email }}</td>
            <td>{{ u.fullName }}</td>
            <td>{{ u.lang }}</td>
            <td>
              <button class="icon-btn" title="View" @click="view(u.id)">
                👁️
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <Pagination
        :total="uzers.length"
        :pageSize="pageSize"
        :current="page"
        @update:current="page = $event"
      />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import Navbar from '../components/Navbar.vue';
import Pagination from '../components/Pagination.vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const collapsed = ref(false);
const toggle = () => (collapsed.value = !collapsed.value);

interface Uzer {
  id: number;
  email: string;
  fullName: string;
  lang: string;
}

const uzers = ref<Uzer[]>([]);
const page = ref(1);
const pageSize = ref(5);

async function load() {
  try {
    const res = await api.get('/api/v1/users');
    uzers.value = Array.isArray(res.data) ? res.data : [];
  } catch (e) {
    console.error(e);
  }
}
onMounted(load);

const refresh = () => load();

const pagedUzers = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return uzers.value.slice(start, start + pageSize.value);
});

const view = (id: number) => {
  router.push({ name: 'UserProfileView', params: { id } });
};

const goHome = () => router.push({ name: 'Home' });
</script>
