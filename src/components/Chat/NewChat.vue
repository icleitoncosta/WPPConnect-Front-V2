<template>
  <q-dialog v-model="showDialog">
    <q-card style="width: 700px; max-width: 80vw">
      <q-card-section>
        <div class="text-h6">New Chat</div>
      </q-card-section>

      <q-separator />

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          type="number"
          v-model="phone"
          label="Phone number *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type phone number',
            (val) => val.lenght > 6 || 'Please type a real phone number',
          ]"
        />

        <q-separator />

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            type="reset"
            color="primary"
            v-close-popup
          />
          <q-btn flat label="Open chat" color="primary" v-close-popup />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NewChat',
  props: ['isShow'],
  data() {
    return {
      phone: '',
    };
  },
  methods: {
    onSubmit(value: unknown) {
      console.log(value);
    },
    onReset(value: unknown) {
      console.log(value);
    },
  },
  computed: {
    showDialog: {
      get() {
        return this.isShow;
      },
      set(value: boolean) {
        this.$emit('editVisibility', value);
      },
    },
  },
});
</script>
