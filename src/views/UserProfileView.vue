<template>
  <v-app>
    <Navbar :collapsed="collapsed" @toggle="toggle" />
    <v-main class="pa-4">
      <v-breadcrumbs :items="breadcrumbs" />

      <v-card class="mx-auto" max-width="600">
        <v-card-title>
          <span class="text-h6">User Profile</span>
        </v-card-title>

        <v-card-text>
          <v-list dense>
            <v-list-item>
              <v-list-item-content
                ><v-list-item-title>ID</v-list-item-title></v-list-item-content
              >
              <v-list-item-content>{{ user.userId }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content
                ><v-list-item-title
                  >Full Name</v-list-item-title
                ></v-list-item-content
              >
              <v-list-item-content>{{ user.fullName }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content
                ><v-list-item-title
                  >Email</v-list-item-title
                ></v-list-item-content
              >
              <v-list-item-content>{{ user.email }}</v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content
                ><v-list-item-title
                  >Roles</v-list-item-title
                ></v-list-item-content
              >
              <v-list-item-content>{{
                user.roles?.join(', ')
              }}</v-list-item-content>
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

const user = ref<any>({});

async function load() {
  try {
    const res = await api.get(`/api/v1/users/${route.params.id}`);
    user.value = res.data;
  } catch (e) {
    console.error(e);
    alert('Failed to load user');
  }
}

function back() {
  router.back();
}

onMounted(load);

const breadcrumbs = [
  { text: 'Home', disabled: false, href: '#' },
  { text: 'Users', disabled: false, href: '#' },
  { text: 'View', disabled: true },
];
</script>
