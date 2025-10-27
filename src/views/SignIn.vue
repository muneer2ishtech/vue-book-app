<template>
  <v-app>
    <v-container class="fill-height" justify="center" align="center">
      <v-card width="400">
        <v-card-title>{{ $t('signIn') }}</v-card-title>
        <v-card-text>
          <v-text-field v-model="email" :label="$t('email')" />
          <v-text-field
            v-model="password"
            :label="$t('password')"
            type="password"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn @click="submit" color="primary">{{ $t('signIn') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store';
import { signIn } from '../services/auth.service';

const email = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

async function submit() {
  try {
    const data = await signIn({ email: email.value, password: password.value });
    authStore.setToken(data.token);
    router.push({ path: '/dashboard' });
  } catch (err) {
    console.error(err);
    alert('Login failed');
  }
}
</script>
