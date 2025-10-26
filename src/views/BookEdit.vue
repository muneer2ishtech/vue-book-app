<template>
  <div class="app-shell">
    <Navbar :collapsed="collapsed" @toggle="toggle" />
    <div class="main">
      <div class="topbar">
        <div class="breadcrumbs">
          <a @click.prevent="goHome" href="#">Home</a>
          <span class="separator">→</span>
          <a @click.prevent="goBooks" href="#">Books</a>
          <span class="separator">→</span>
          <span>{{ book.id }}</span>
        </div>
      </div>
      <div class="topbar">
        <div>
          <h2>Edit Book</h2>
        </div>
        <div>
          <button class="btn" @click="cancel">Cancel</button>
        </div>
      </div>

      <!-- Main Tile -->
      <div
        style="
          background: white;
          padding: 16px;
          border-radius: 8px;
          max-width: 640px;
        "
      >
        <form @submit.prevent="onSubmit">
          <div style="margin-bottom: 8px">
            <label>Title</label
            ><input
              v-model="book.title"
              required
              style="width: 100%; padding: 8px"
            />
          </div>
          <div style="margin-bottom: 8px">
            <label>Author</label
            ><input
              v-model="book.author"
              required
              style="width: 100%; padding: 8px"
            />
          </div>
          <div style="margin-bottom: 8px">
            <label>Year</label
            ><input
              v-model.number="book.year"
              type="number"
              min="1900"
              style="width: 100%; padding: 8px"
            />
          </div>
          <div style="margin-bottom: 8px">
            <label>Price</label
            ><input
              v-model.number="book.price"
              type="number"
              step="0.01"
              style="width: 100%; padding: 8px"
            />
          </div>
          <div style="display: flex; gap: 8px">
            <button class="btn" type="submit">Submit</button
            ><button class="btn" type="button" @click="cancel">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../services/api';
import Navbar from '../components/Navbar.vue';

const route = useRoute();
const router = useRouter();

const id = route.params.id;
const book = ref<any>({});

const collapsed = ref(false);

function toggle() {
  collapsed.value = !collapsed.value;
}

async function load() {
  try {
    const res = await api.get(`/api/v1/books/${id}`);
    book.value = res.data;
  } catch (e) {
    console.error(e);
    alert('Failed to load');
  }
}

onMounted(load);

async function onSubmit() {
  try {
    await api.put(`/api/v1/books/${id}`, book.value);
    alert('Updated Book successfully');
    router.push({ name: 'BookView', params: { id } });
  } catch (e) {
    console.error(e);
    alert('Update Book failed');
  }
}

function cancel() {
  router.push({ name: 'BookView', params: { id } });
}
</script>
