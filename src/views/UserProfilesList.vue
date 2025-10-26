<template>
  <v-app>
    <Navbar :collapsed="collapsed" @toggle="toggle" />
    <v-main class="pa-4">
      <v-breadcrumbs :items="breadcrumbs" />

      <v-card>
        <v-card-title>
          <span class="text-h6">Users</span>
          <v-spacer></v-spacer>
          <v-btn @click="refresh" color="primary" icon>
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="users"
          :items-per-page="5"
          class="elevation-1"
          :search="search"
          item-key="userId"
        >
          <template #top>
            <v-text-field
              v-model="search"
              label="Search Users"
              class="mx-4"
            ></v-text-field>
          </template>
          <template #item.actions="{ item }">
            <v-icon small class="mr-2" @click="view(item.userId)"
              >mdi-eye</v-icon
            >
          </template>
        </v-data-table>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';
import Navbar from '../components/Navbar.vue';

const router = useRouter();

const collapsed = ref(false);

function toggle() {
  collapsed.value = !collapsed.value;
}

const users = ref<any[]>([]);
const search = ref('');

const headers = [
  { text: 'ID', value: 'userId' },
  { text: 'Full Name', value: 'fullName' },
  { text: 'Email', value: 'email' },
  { text: 'Roles', value: 'roles' },
  { text: 'Actions', value: 'actions', sortable: false },
];

async function load() {
  try {
    const res = await api.get('/api/v1/users');
    users.value = Array.isArray(res.data) ? res.data : res.data || [];
  } catch (e) {
    console.error(e);
    alert('Failed to load');
  }
}

onMounted(load);

function refresh() {
  load();
}

function view(id: number | string) {
  router.push({ name: 'UserProfileView', params: { id } });
}

const breadcrumbs = [
  { text: 'Home', disabled: false, href: '#' },
  { text: 'Users', disabled: true },
];
</script>
