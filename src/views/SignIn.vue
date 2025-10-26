<template>
  <v-app>
    <v-main class="d-flex align-center justify-center" style="height: 100vh">
      <v-card class="pa-6" max-width="400" elevation="10">
        <v-card-title class="justify-center text-h5"> Sign In </v-card-title>

        <v-card-text>
          <v-form ref="formRef" v-model="valid">
            <v-text-field
              v-model="username"
              label="Username"
              prepend-inner-icon="mdi-account"
              :rules="[(v) => !!v || 'Username is required']"
            />
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              prepend-inner-icon="mdi-lock"
              :rules="[(v) => !!v || 'Password is required']"
            />
            <v-checkbox v-model="rememberMe" label="Remember me" class="mt-2" />
          </v-form>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-btn color="primary" @click="signin" :loading="loading" block
            >Sign In</v-btn
          >
        </v-card-actions>

        <v-card-subtitle class="text-center mt-4">
          <small>Forgot your password? <a href="#">Reset</a></small>
        </v-card-subtitle>
      </v-card>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const username = ref('');
const password = ref('');
const rememberMe = ref(false);
const valid = ref(false);
const formRef = ref(null);
const loading = ref(false);

async function signin() {
  if (!(formRef.value as any).validate()) return;
  loading.value = true;
  try {
    const res = await api.post('/api/v1/auth/signin', {
      username: username.value,
      password: password.value,
      rememberMe: rememberMe.value,
    });
    // save token and redirect
    localStorage.setItem('authToken', res.data.token);
    router.push({ name: 'Books' }); // redirect to default page
  } catch (e: any) {
    console.error(e);
    alert(e.response?.data?.message || 'Sign in failed');
  } finally {
    loading.value = false;
  }
}
</script>
