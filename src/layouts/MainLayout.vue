<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> WPPConnect</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header>Menu</q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  data() {
    return {
      linksList: [
        {
          title: this.$t('chat'),
          caption: this.$t('chat_menu_caption'),
          icon: 'chat',
          link: '#',
        },
        {
          title: this.$t('contacts'),
          caption: this.$t('contacts_menu_caption'),
          icon: 'person',
          link: '/contacts',
        },
        {
          title: this.$t('groups'),
          caption: this.$t('groups_menu_caption'),
          icon: 'group',
          link: '/groups',
        },
        {
          title: this.$t('settings'),
          caption: this.$t('settings_menu_caption'),
          icon: 'settings',
          link: '/settings',
        },
      ],
    };
  },
});
</script>
