<template>
  <v-app>
    <Navbar :collapsed="collapsed" @toggle="toggle" />
    <v-main class="pa-4">
      <v-breadcrumbs :items="breadcrumbs" />

      <v-card class="mx-auto" max-width="600">
        <v-card-title>
          <span class="text-h6">Book Details</span>
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
                  >Title</v-list-item-title
                ></v-list-item-content
              >
              <v-list-item-content>{{ book.title }}</v-list-item-content>
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
import api from '../services/api';
import Navbar from '../components/Navbar.vue';

const router = useRouter();
const route = useRoute();
const collapsed = ref(false);

function toggle() {
  collapsed.value = !collapsed.value;
}

const book = ref<any>({});

const bookId = route.params.id;

async function load() {
  try {
    const res = await api.get(`/api/v1/books/${bookId}`);
    book.value = res.data;
  } catch (e) {
    console.error(e);
    alert('Failed to load book');
  }
}

function back() {
  router.back();
}

function edit() {
  router.push({ name: 'BookEdit', params: { id: bookId } });
}

onMounted(load);

const breadcrumbs = [
  { text: 'Home', disabled: false, href: '#' },
  { text: 'Books', disabled: false, href: '#' },
  { text: 'View', disabled: true },
];
</script>
