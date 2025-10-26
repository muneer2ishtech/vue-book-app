<template>
  <v-app>
    <Navbar :collapsed="collapsed" @toggle="toggle" />
    <v-main class="pa-4">
      <v-breadcrumbs :items="breadcrumbs" />

      <v-card class="mx-auto" max-width="600">
        <v-card-title>
          <span class="text-h6">{{ isNew ? 'Create Book' : 'Edit Book' }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="formRef" v-model="valid">
            <v-text-field
              v-model="book.title"
              label="Title"
              :rules="[(v) => !!v || 'Required']"
            />
            <v-text-field
              v-model="book.author"
              label="Author"
              :rules="[(v) => !!v || 'Required']"
            />
            <v-text-field
              v-model.number="book.year"
              label="Year"
              type="number"
              :rules="[(v) => v > 0 || 'Must be valid year']"
            />
            <v-text-field
              v-model.number="book.price"
              label="Price"
              type="number"
              :rules="[(v) => v >= 0 || 'Must be non-negative']"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="save">{{
            isNew ? 'Create' : 'Update'
          }}</v-btn>
          <v-btn color="secondary" @click="back">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import api from '../services/api';
import Navbar from '../components/Navbar.vue';

const router = useRouter();
const route = useRoute();
const collapsed = ref(false);

function toggle() {
  collapsed.value = !collapsed.value;
}

const book = ref<any>({});
const isNew = !route.params.id;
const valid = ref(false);
const formRef = ref(null);

async function load() {
  if (!isNew) {
    try {
      const res = await api.get(`/api/v1/books/${route.params.id}`);
      book.value = res.data;
    } catch (e) {
      console.error(e);
      alert('Failed to load book');
    }
  }
}

async function save() {
  if (!(formRef.value as any).validate()) return;
  try {
    if (isNew) await api.post('/api/v1/books', book.value);
    else await api.put(`/api/v1/books/${route.params.id}`, book.value);
    router.push({ name: 'Books' });
  } catch (e) {
    console.error(e);
    alert('Save failed');
  }
}

function back() {
  router.back();
}

onMounted(load);

const breadcrumbs = [
  { text: 'Home', disabled: false, href: '#' },
  { text: 'Books', disabled: false, href: '#' },
  { text: isNew ? 'Create' : 'Edit', disabled: true },
];
</script>
