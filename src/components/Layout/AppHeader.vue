<template>
  <v-app-bar app color="primary" dark>
    <v-app-bar-nav-icon @click="$emit('toggle-drawer')" />
    <v-breadcrumbs :items="breadcrumbs" class="mx-4" />
    <v-spacer />
    <v-btn icon @click="toggleDark">
      <v-icon>{{
        $vuetify.theme.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'
      }}</v-icon>
    </v-btn>
    <v-menu>
      <template #activator="{ props }">
        <v-btn v-bind="props" text>{{ currentLang.toUpperCase() }}</v-btn>
      </template>
      <v-list>
        <v-list-item @click="changeLang('en')">EN</v-list-item>
        <v-list-item @click="changeLang('fi')">FI</v-list-item>
      </v-list>
    </v-menu>
    <v-btn text @click="logout">{{ $t('logout') }}</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useAuthStore } from '../../store';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  props: { breadcrumbs: Array },
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const { locale } = useI18n();

    const toggleDark = () => {
      const theme = (window as any).vuetify.theme;
      theme.dark = !theme.dark;
    };

    const logout = () => authStore.logout();

    const currentLang = computed(() => locale.value);
    const changeLang = (lang: string) => (locale.value = lang);

    return { toggleDark, logout, currentLang, changeLang };
  },
});
</script>
