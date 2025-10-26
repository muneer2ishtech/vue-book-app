<template>
  <div class="app-shell">
    <Navbar :collapsed="collapsed" @toggle="toggle" />
    <div class="main">
      <div class="topbar">
        <div class="breadcrumbs">
          <a @click.prevent="goHome" href="#">Home</a>
          <span class="separator">→</span>
          <span>Books</span>
        </div>
      </div>
      <div class="topbar">
        <div>
          <h2>Books</h2>
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
              <th>Title</th>
              <th>Author</th>
              <th>Year</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in pagedBooks" :key="book.id">
              <td>{{ book.id }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.year }}</td>
              <td>{{ book.price }}</td>
              <td>
                <button class="icon-btn" title="View" @click="view(book.id)">
                  👁️
                </button>
                <button class="icon-btn" title="Edit" @click="edit(book.id)">
                  ✏️
                </button>
                <button class="icon-btn" title="Delete" @click="del(book.id)">
                  🗑️
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <Pagination
          :total="books.length"
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

const page = ref(1);
const pageSize = ref(5);

async function load() {
  try {
    const res = await api.get('/api/v1/books');
    // If backend returns array or object
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

const pagedBooks = computed(() => {
  const start = (page.value - 1) * pageSize.value;
  return books.value.slice(start, start + pageSize.value);
});

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
    // delete may return 410, but axios treats non-2xx as error; if success, reload
    await load();
    alert('Deleted');
  } catch (e: any) {
    if (e.response && e.response.status === 410) {
      await load();
      alert('Deleted');
    } else {
      console.error(e);
      alert('Delete failed');
    }
  }
}
</script>
