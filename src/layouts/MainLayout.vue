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

        <q-toolbar-title> {{ config.NAME }}</q-toolbar-title>
        <q-separator dark vertical />
        <q-btn
          href="https://wppconnect.io/"
          target="_blank"
          stretch
          flat
          label="WPPCONNECT"
          icon="gamepad"
        />
        <q-separator dark vertical />
        <q-btn
          stretch
          flat
          label="DISCORD"
          icon="discord"
          href="https://discord.com/invite/JU5JGGKGNG"
          target="_blank"
        />
        <q-separator dark vertical />
        <q-btn
          flat
          stretch
          icon="fullscreen"
          @click="tooggleFullScreen()"
          v-if="$q.platform.is.desktop"
        />
        <q-separator dark vertical />
        <q-btn stretch flat label="Username" icon="person">
          <q-menu auto-close>
            <q-list style="min-width: 150px">
              <q-item clickable>
                <q-item-section>Profile</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" bordered>
      <q-list>
        <q-item-label header class="text-weight-bold text-uppercase">
          Chat's and contacts menu
        </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
        <q-separator class="q-my-md" />
        <q-item-label header class="text-weight-bold text-uppercase">
          Settings
        </q-item-label>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Settings</q-item-label>
            <q-item-label caption>Edit your preferences</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="setDarkMode()">
          <q-item-section avatar>
            <q-icon name="light" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Dark Mode</q-item-label>
            <q-item-label caption>Enable and disable dark mode</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Profile</q-item-label>
            <q-item-label caption>Edit your profile</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>

          <q-item-section>
            <q-item-label>Logout</q-item-label>
            <q-item-label caption>Logout of your panel</q-item-label>
          </q-item-section>
        </q-item>
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
import config from '../config/config';
import { showLoadingFull, hide } from '../helpers/Loading';

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      config,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  mounted() {
    showLoadingFull();
    hide();
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
      ],
    };
  },
  methods: {
    setDarkMode() {
      this.$q.dark.set(!this.$q.dark.isActive);
    },
    tooggleFullScreen() {
      if (this.$q.fullscreen.isActive) {
        this.$q.fullscreen.exit();
      } else {
        this.$q.fullscreen.request();
      }
    },
  },
});
</script>
