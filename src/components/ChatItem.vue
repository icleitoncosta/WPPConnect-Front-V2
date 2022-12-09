<template>
  <q-item
    clickable
    @click="$emit('selectContact', chat)"
    v-ripple
    class="chat-item"
  >
    <q-item-section side>
      <q-avatar rounded size="48px">
        <q-img
          :src="chat.profilePicThumbObj?.eurl"
          placeholder-src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
          style="width: 48px; height: 48px"
          loading="lazy"
        />
        <!-- <q-badge floating color="teal">0</q-badge> -->
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label>{{ chat.formattedName }}</q-item-label>
      <q-item-label class="ellipsis" caption v-if="chat.msgs?.length">
        {{ chat.msgs[chat.msgs.length - 1] }}</q-item-label
      >
    </q-item-section>
    <q-item-section side>
      <q-btn round flat icon="arrow_drop_down"
        ><q-menu auto-close>
          <q-list>
            <q-item clickable
              ><q-item-section avatar>
                <q-icon color="teal" name="archive" />
              </q-item-section>
              <q-item-section>Archive</q-item-section>
            </q-item>
            <q-item clickable>
              <q-item-section avatar>
                <q-icon color="red" name="clear" />
              </q-item-section>
              <q-item-section>Delete chat</q-item-section>
            </q-item>
          </q-list>
        </q-menu></q-btn
      ></q-item-section
    >
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ChatItem',
  props: ['chat'],
});
</script>
