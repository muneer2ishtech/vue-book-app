<template>
  <v-app>
    <AppNav />
    <v-main class="pa-4">
      <AppHeader :breadcrumbs="breadcrumbs" />

      <v-card class="mx-auto" max-width="600">
        <v-card-title>
          <span class="text-h6">{{ book.name }}</span>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="edit"
            ><v-icon>mdi-pencil</v-icon></v-btn
          >
        </v-card-title>

        <v-card-text>
          <v-list dense>
            <v-list-item>
              <v-list-item-content
                ><v-list-item-title>ID</v-list-item-title></v-list-item-content
              >
              <v-list-item-content>{{ book.id }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content
                ><v-list-item-title
                  >Name</v-list-item-title
                ></v-list-item-content
              >
              <v-list-item-content>{{ book.name }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content
                ><v-list-item-title
                  >Author</v-list-item-title
                ></v-list-item-content
              >
              <v-list-item-content>{{ book.author }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content
                ><v-list-item-title
                  >Year</v-list-item-title
                ></v-list-item-content
              >
              <v-list-item-content>{{ book.year }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content
                ><v-list-item-title
                  >Price</v-list-item-title
                ></v-list-item-content
              >
              <v-list-item-content>{{ book.price }}</v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-btn color="secondary" @click="back"
            ><v-icon left>mdi-arrow-left</v-icon>Back</v-btn
          >
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
import { getBookById, Book } from '../../services/book.service';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const token = authStore.token || '';

const book = ref<Book>({ name: '', author: '', year: 0, price: 0 });

const breadcrumbs = [
  { text: 'Home', disabled: false, href: '#' },
  { text: 'Books', disabled: false, href: '#' },
  { text: 'View', disabled: true },
];

async function loadBook() {
  const id = Number(route.params.id);
  if (!id) return;
  try {
    const res = await getBookById(token, id);
    book.value = res.data;
  } catch (err) {
    console.error(err);
    alert('Failed to load book');
  }
}

function back() {
  router.push({ name: 'BooksList' });
}

function edit() {
  const id = Number(route.params.id);
  router.push({ name: 'BookEdit', params: { id } });
}

onMounted(loadBook);
</script>
