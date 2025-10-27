<template>
  <v-app>
    <AppNav ref="nav" />
    <v-main class="pa-4">
      <AppHeader :breadcrumbs="breadcrumbs" />

      <v-card>
        <v-card-title>
          <span class="text-h6">{{ $t('books') }}</span>
          <v-spacer></v-spacer>
          <v-btn @click="loadBooks" color="primary" icon>
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="books"
          :items-per-page="5"
          :search="search"
          item-key="id"
          class="elevation-1"
        >
          <template #top>
            <v-text-field v-model="search" :label="$t('search')" class="mx-4" />
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
import { useAuthStore } from '../../store';
import AppNav from '../../components/Layout/AppNav.vue';
import AppHeader from '../../components/Layout/AppHeader.vue';
import { getBooks, deleteBook, Book } from '../../services/book.service';

const router = useRouter();
const authStore = useAuthStore();
const token = authStore.token || '';

const nav = ref<any>(null);
const books = ref<Book[]>([]);
const search = ref('');

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Name', value: 'name' },
  { text: 'Author', value: 'author' },
  { text: 'Year', value: 'year' },
  { text: 'Price', value: 'price' },
  { text: 'Actions', value: 'actions', sortable: false },
];

const breadcrumbs = [
  { text: 'Home', disabled: false, href: '#' },
  { text: 'Books', disabled: true },
];

async function loadBooks() {
  try {
    const res = await getBooks(token);
    books.value = Array.isArray(res.data) ? res.data : [];
  } catch (err) {
    console.error(err);
    alert('Failed to load books');
  }
}

function view(id: number) {
  router.push({ name: 'BookView', params: { id } });
}

function edit(id: number) {
  router.push({ name: 'BookEdit', params: { id } });
}

async function del(id: number) {
  if (!confirm(`Delete book ${id}?`)) return;
  try {
    await deleteBook(token, id);
    await loadBooks();
    alert('Deleted');
  } catch (err: any) {
    if (err.response?.status === 410) {
      await loadBooks();
      alert('Deleted');
    } else {
      console.error(err);
      alert('Delete failed');
    }
  }
}

onMounted(loadBooks);
</script>
