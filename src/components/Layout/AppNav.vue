<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-list>
      <v-list-item link @click="$router.push('/dashboard/books')">
        <v-list-item-icon><v-icon>mdi-book-open</v-icon></v-list-item-icon>
        <v-list-item-title>{{ $t('books') }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  emits: ['update:drawer'],
  setup() {
    const drawer = ref(true);
    return { drawer };
  },
});
</script>
