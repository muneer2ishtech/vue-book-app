<template>
  <div style="display: flex; gap: 8px; align-items: center; margin-top: 12px">
    <button class="btn" :disabled="current === 1" @click="change(current - 1)">
      Prev
    </button>
    <span>Page {{ current }} of {{ totalPages }}</span>
    <button
      class="btn"
      :disabled="current === totalPages"
      @click="change(current + 1)"
    >
      Next
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps({ total: Number, pageSize: Number, current: Number });
const emit = defineEmits(['update:current']);
const totalPages = computed(() =>
  Math.max(1, Math.ceil((props.total || 0) / (props.pageSize || 1)))
);
function change(n: number) {
  if (n >= 1 && n <= totalPages.value) emit('update:current', n);
}
</script>
