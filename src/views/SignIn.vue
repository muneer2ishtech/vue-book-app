<template>
  <div
    style="
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
    "
  >
    <div
      style="
        width: 360px;
        background: white;
        padding: 24px;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
      "
    >
      <h2>Sign in</h2>
      <form @submit.prevent="onSubmit">
        <div style="margin-bottom: 12px">
          <label>Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            style="width: 100%; padding: 8px; margin-top: 6px"
          />
        </div>
        <div style="margin-bottom: 12px">
          <label>Password</label>
          <input
            v-model="form.password"
            type="password"
            required
            style="width: 100%; padding: 8px; margin-top: 6px"
          />
        </div>
        <div style="display: flex; gap: 8px; align-items: center">
          <button class="btn" type="submit">Sign in</button>
          <div v-if="error" style="color: #b91c1c">{{ error }}</div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const auth = useAuthStore();
const form = reactive({ email: '', password: '' });
const error = ref('');

async function onSubmit() {
  error.value = '';
  try {
    await auth.signin({ email: form.email, password: form.password });
    router.push({ name: 'Home' });
  } catch (e: any) {
    console.error(e);
    if (e.response && e.response.status === 403)
      error.value = 'Invalid credentials';
    else error.value = 'Sign in failed';
  }
}
</script>
