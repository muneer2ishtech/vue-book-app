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
              <th>isActive</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="uzer in pagedUzers" :key="uzer.id">
              <td>{{ uzer.id }}</td>
              <td>{{ uzer.email }}</td>
              <td>{{ uzer.fullName }}</td>
              <td>{{ uzer.lang }}</td>
              <td>{{ uzer.isActive }}</td>
              <td>
                <button class="icon-btn" title="View" @click="view(uzer.id)">
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
import { useRouter } from 'vue-router';
import api from '../services/api';
import Navbar from '../components/Navbar.vue';
import Pagination from '../components/Pagination.vue';

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
    alert('Failed to load user profiles');
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
