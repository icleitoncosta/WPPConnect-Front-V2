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
          type="tel"
          v-model="phone"
          maxlength="15"
          label="Phone number * (Please, insert DDI)"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type phone number',
            (val) => val.length > 10 || 'Please type a real phone number',
            (val) => /^[0-9]+$/.test(val) || 'Please insert only number',
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
          <q-btn flat label="Open chat" color="primary" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { Contact } from 'src/models/Contact';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NewChat',
  props: ['isShow'],
  data() {
    return {
      phone: '',
      contact: <Contact>{
        id: {
          server: '@c.us',
          user: '',
          _serialized: '',
        },
        formattedName: '',
        isBusiness: false,
        isEnterprise: false,
        isHighLevelVerified: false,
        isMe: false,
        isMyContact: false,
        isPSA: false,
        isUser: false,
        isVerified: false,
        isWAContact: true,
        labels: [],
        msgs: [],
        profilePicThumbObj: {
          eurl: '',
          img: '',
          id: {
            server: '@c.us',
            user: '',
            _serialized: '',
          },
          imgFull: '',
          raw: null,
          tag: '',
        },
        plaintextDisabled: false,
        pushname: '',
        sectionHeader: '',
        shortName: '',
        statusMute: false,
        type: 'in',
        verifiedLevel: 0,
        verifiedName: '',
      },
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
