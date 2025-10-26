<template>
  <div class="app-shell">
    <Navbar :collapsed="collapsed" @toggle="toggle" />
    <div class="main">
      <div class="topbar">
        <div>
          <div class="breadcrumbs">Home -> Books -> {{ book.id }}</div>
          <h2>View Book</h2>
        </div>
        <div>
          <button class="btn" @click="goEdit">Edit</button>
        </div>
      </div>

      <div style="background: white; padding: 16px; border-radius: 8px">
        <div><strong>ID:</strong> {{ book.id }}</div>
        <div><strong>Title:</strong> {{ book.title }}</div>
        <div><strong>Author:</strong> {{ book.author }}</div>
        <div><strong>Year:</strong> {{ book.year }}</div>
        <div><strong>Price:</strong> {{ book.price }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import api from '../services/api';

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const book = ref({});
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
function goEdit() {
  router.push({ name: 'BookEdit', params: { id } });
}
</script>
