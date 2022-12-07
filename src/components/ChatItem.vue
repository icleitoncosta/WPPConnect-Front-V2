<template>
  <q-item clickable v-ripple>
    <q-item-section side>
      <q-avatar rounded size="48px">
        <img src="https://cdn.quasar.dev/img/avatar.png" />
        <q-badge floating color="teal">0</q-badge>
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>Mary</q-item-label>
      <q-item-label caption>{{
        $t('x_new_messages', { qnt: 1 })
      }}</q-item-label>
    </q-item-section>
    <q-item-section side> {{ $t('x_min_ago', { minutes: 1 }) }}</q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChatItem',
});
</script>
