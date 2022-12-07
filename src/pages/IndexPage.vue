<template>
  <q-page>
    <div
      id="container"
      class="full-width full-height row wrap justify-start items-start content-start"
    >
      <div class="col-3 chat-list">
        <q-toolbar class="bg-grey-2">
          <q-btn round flat icon="settings">
            <q-menu auto-close>
              <q-list style="min-width: 150px">
                <q-item clickable
                  ><q-item-section avatar>
                    <q-icon color="teal" name="person" />
                  </q-item-section>
                  <q-item-section>Chat with people</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon color="red" name="groups" />
                  </q-item-section>
                  <q-item-section>Chat with groups</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
          <q-input
            rounded
            outlined
            dense
            class="full-width"
            bg-color="white"
            v-model="search"
            :placeholder="$t('search_text')"
          >
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <q-btn round flat icon="message" />
        </q-toolbar>

        <q-scroll-area style="height: calc(100vh - 100px)">
          <ChatItem v-for="item of 10" v-bind:key="item"></ChatItem>
        </q-scroll-area>
      </div>
      <div class="col-9 messages-list">
        <div class="row header justify-between">
          <div class="col-10 contact-info">
            <q-avatar rounded size="48px">
              <img src="https://cdn.quasar.dev/img/avatar.png" />
            </q-avatar>
            <div class="text">
              <span class="contact_name">Contact Name</span>
              <small class="contact_status">Status text of contact</small>
            </div>
          </div>
          <div class="buttons">
            <q-btn round flat icon="search" />
            <q-btn round flat>
              <q-icon name="attachment" class="rotate-135" />
            </q-btn>
            <q-btn round flat icon="more_vert">
              <q-menu auto-close :offset="[110, 0]">
                <q-list style="min-width: 150px">
                  <q-item clickable>
                    <q-item-section>Contact data</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Block</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Select messages</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Silence</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Clear messages</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Erase messages</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <q-scroll-area style="height: calc(100vh - 204px)">
          <LoadMore></LoadMore>
          <DateHead></DateHead>

          <q-chat-message
            name="me"
            avatar="https://cdn.quasar.dev/img/avatar4.jpg"
            :text="['hey, how are you?']"
            sent
            stamp="7 minutes ago"
          ></q-chat-message>
          <q-chat-message
            name="Jane"
            avatar="https://cdn.quasar.dev/img/avatar3.jpg"
            :text="['doing fine, how r you?']"
            stamp="4 minutes ago"
          ></q-chat-message>
          <div class="bg-grey-3 text-black row"></div>
        </q-scroll-area>

        <q-toolbar>
          <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
          <q-input
            rounded
            outlined
            dense
            class="WAL__field col-grow q-mr-sm"
            bg-color="white"
            v-model="message"
            :placeholder="$t('type_message')"
          />
          <q-btn round flat icon="mic" />
        </q-toolbar>
      </div>
    </div>
    <q-drawer v-model="rightDrawerOpen" side="right" bordered>
      Aqui entra dados do contato
    </q-drawer>
  </q-page>
</template>

<script lang="ts">
import DateHead from 'src/components/Chat/DateHead.vue';
import LoadMore from 'src/components/Chat/LoadMore.vue';
import { defineComponent, ref } from 'vue';
import ChatItem from '../components/ChatItem.vue';

export default defineComponent({
  name: 'IndexPage',
  components: { ChatItem, LoadMore, DateHead },
  data() {
    return {
      message: '',
      search: '',
      typeChat: 'person',
    };
  },
  setup() {
    const rightDrawerOpen = ref(false);
    return {
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
    };
  },
});
</script>
