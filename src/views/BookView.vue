<template>
  <div class="app-shell">
    <Navbar :collapsed="collapsed" @toggle="toggle" />
    <div class="main">
      <!-- Topbar with breadcrumb and Edit button -->
      <div class="topbar">
        <div class="breadcrumbs">
          <a @click.prevent="goHome" href="#">Home</a>
          <span class="separator">→</span>
          <a @click.prevent="goBooks" href="#">Books</a>
          <span class="separator">→</span>
          <span>{{ book.id }}</span>
        </div>
        <div>
          <button class="btn btn-edit" @click="goEdit">Edit</button>
        </div>
      </div>

      <!-- Book details in tabular layout with alternate row shades -->
      <div style="background: white; border-radius: 8px; overflow: hidden">
        <div class="row-alt">
          <div>ID:</div>
          <div>{{ book.id }}</div>
        </div>
        <div class="row-alt">
          <div>Title:</div>
          <div>{{ book.title }}</div>
        </div>
        <div class="row-alt">
          <div>Author:</div>
          <div>{{ book.author }}</div>
        </div>
        <div class="row-alt">
          <div>Year:</div>
          <div>{{ book.year }}</div>
        </div>
        <div class="row-alt">
          <div>Price:</div>
          <div>{{ book.price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import api from '../services/api';

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

function goEdit() {
  router.push({ name: 'BookEdit', params: { id } });
}

function goHome() {
  router.push({ name: 'Home' });
}

function goBooks() {
  router.push({ name: 'Books' });
}
</script>
