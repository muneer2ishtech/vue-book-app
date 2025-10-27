<template>
  <v-app>
    <AppNav />
    <v-main class="pa-4">
      <AppHeader :breadcrumbs="breadcrumbs" />

      <v-card class="mx-auto" max-width="600">
        <v-card-title>
          <span class="text-h6">{{
            isEdit ? 'Edit Book' : 'Create Book'
          }}</span>
        </v-card-title>

        <v-card-text>
          <v-form ref="formRef" v-model="valid">
            <v-text-field
              label="Name"
              v-model="book.name"
              :rules="[rules.required]"
            />
            <v-text-field
              label="Author"
              v-model="book.author"
              :rules="[rules.required]"
            />
            <v-text-field
              label="Year"
              type="number"
              v-model.number="book.year"
              :rules="[rules.required, rules.year]"
            />
            <v-text-field
              label="Price"
              type="number"
              v-model.number="book.price"
              :rules="[rules.required, rules.price]"
            />
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-btn color="primary" @click="submit">{{
            isEdit ? 'Update' : 'Create'
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
import { useAuthStore } from '../../store';
import AppNav from '../../components/Layout/AppNav.vue';
import AppHeader from '../../components/Layout/AppHeader.vue';
import {
  getBookById,
  createBook,
  updateBook,
  Book,
} from '../../services/book.service';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const token = authStore.token || '';

const book = ref<Book>({ name: '', author: '', year: 0, price: 0 });
const formRef = ref<any>(null);
const valid = ref(false);
const isEdit = ref(false);

const rules = {
  required: (v: any) => !!v || 'Required',
  year: (v: number) => v > 0 || 'Invalid year',
  price: (v: number) => v >= 0 || 'Invalid price',
};

const breadcrumbs = [
  { text: 'Home', disabled: false, href: '#' },
  { text: 'Books', disabled: false, href: '#' },
  { text: isEdit.value ? 'Edit' : 'Create', disabled: true },
];

async function loadBook() {
  const id = Number(route.params.id);
  if (!id) return;
  isEdit.value = true;
  try {
    const res = await getBookById(token, id);
    book.value = res.data;
  } catch (err) {
    console.error(err);
    alert('Failed to load book');
  }
}

async function submit() {
  if (!formRef.value.validate()) return;
  try {
    if (isEdit.value && route.params.id) {
      await updateBook(token, Number(route.params.id), book.value);
      alert('Updated successfully');
    } else {
      await createBook(token, book.value);
      alert('Created successfully');
    }
    router.push({ name: 'BooksList' });
  } catch (err) {
    console.error(err);
    alert('Operation failed');
  }
}

function back() {
  router.push({ name: 'BooksList' });
}

onMounted(loadBook);
</script>
