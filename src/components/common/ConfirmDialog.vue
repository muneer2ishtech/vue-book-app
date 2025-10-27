<template>
  <v-dialog v-model="show" max-width="400">
    <v-card>
      <v-card-title class="text-h6">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text color="primary" @click="$emit('cancel')">Cancel</v-btn>
        <v-btn text color="red" @click="$emit('confirm')">Confirm</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
export default defineComponent({
  props: { title: String, message: String, modelValue: Boolean },
  emits: ['update:modelValue', 'confirm', 'cancel'],
  setup(props, { emit }) {
    const show = ref(props.modelValue);
    watch(
      () => props.modelValue,
      (val) => (show.value = val)
    );
    watch(show, (val) => emit('update:modelValue', val));
    return { show };
  },
});
</script>
