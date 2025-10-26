<template>
  <v-app>
    <Navbar :collapsed="collapsed" @toggle="toggle" />
    <v-main class="pa-4">
      <v-breadcrumbs :items="breadcrumbs" />

      <v-card>
        <v-card-title>
          <span class="text-h6">Books</span>
          <v-spacer></v-spacer>
          <v-btn @click="refresh" color="primary" icon>
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="books"
          :items-per-page="5"
          class="elevation-1"
          show-select
          :search="search"
          item-key="id"
        >
          <template #top>
            <v-text-field
              v-model="search"
              label="Search"
              class="mx-4"
            ></v-text-field>
          </template>
          <template #item.actions="{ item }">
            <v-icon small class="mr-2" @click="view(item.id)">mdi-eye</v-icon>
            <v-icon small class="mr-2" @click="edit(item.id)"
              >mdi-pencil</v-icon
            >
            <v-icon small @click="del(item.id)">mdi-delete</v-icon>
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

interface Book {
  id?: number;
  title?: string;
  author?: string;
  year?: number;
  price?: number;
}

const books = ref<Book[]>([]);
const search = ref('');

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Title', value: 'title' },
  { text: 'Author', value: 'author' },
  { text: 'Year', value: 'year' },
  { text: 'Price', value: 'price' },
  { text: 'Actions', value: 'actions', sortable: false },
];

async function load() {
  try {
    const res = await api.get('/api/v1/books');
    books.value = Array.isArray(res.data) ? res.data : res.data || [];
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
  router.push({ name: 'BookView', params: { id } });
}

function edit(id: number | string) {
  router.push({ name: 'BookEdit', params: { id } });
}

async function del(id: number | string) {
  if (!confirm('Delete book ' + id + '?')) return;
  try {
    await api.delete(`/api/v1/books/${id}`);
    await load();
    alert('Deleted');
  } catch (e: any) {
    if (e.response?.status === 410) {
      await load();
      alert('Deleted');
    } else {
      console.error(e);
      alert('Delete failed');
    }
  }
}

const breadcrumbs = [
  { text: 'Home', disabled: false, href: '#' },
  { text: 'Books', disabled: true },
];
</script>
