<template>
  <div class="q-pa-md q-gutter-sm items-center justify-center row">
    <q-btn color="primary col-8">
      {{ $t('load_more') }}
    </q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoadMore',
});
</script>
