<template>
  <q-chat-message
    v-if="message.type == 'chat'"
    :name="message.fromMe ? 'me' : message?.sender?.formattedName"
    :avatar="
      message.sender?.profilePicThumbObj?.eurl
        ? message.sender?.profilePicThumbObj?.eurl
        : 'https://www.ddmcheb.cz/template/img/avatar.jpeg'
    "
    :text="[message.body]"
    :sent="message.fromMe"
    :stamp="getStampHTML(message)"
    :stamp-html="true"
  ></q-chat-message>
  <q-chat-message
    v-if="message.type == 'ptt'"
    :name="message.fromMe ? 'me' : message?.sender?.formattedName"
    :avatar="
      message.sender?.profilePicThumbObj?.eurl
        ? message.sender?.profilePicThumbObj?.eurl
        : 'https://www.ddmcheb.cz/template/img/avatar.jpeg'
    "
    :text="[
      '<audio controls><source src=' +
        message.deprecatedMms3Url +
        ' type=' +
        message.mimetype +
        '></audio>',
    ]"
    :text-html="true"
    :sent="message.fromMe"
    :stamp="getStampHTML(message)"
    :stamp-html="true"
  ></q-chat-message>
  <q-chat-message
    v-if="message.type == 'image'"
    :name="message.fromMe ? 'me' : message?.sender?.formattedName"
    :avatar="
      message.sender?.profilePicThumbObj?.eurl
        ? message.sender?.profilePicThumbObj?.eurl
        : 'https://www.ddmcheb.cz/template/img/avatar.jpeg'
    "
    :text="[
      '<img class=\'q-img__image q-img__image--with-transition q-img__image--loaded\' loading=\'lazy\' fetchpriority=\'auto\' src=data:' +
        message.mimetype +
        ';base64,' +
        message.body +
        ' style=\'object-fit: cover; object-position: 50% 50%; width: 130px; height: 130px; cursor: pointer;\'>',
    ]"
    :text-html="true"
    :sent="message.fromMe"
    :stamp="getStampHTML(message)"
    :stamp-html="true"
  ></q-chat-message>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Message } from '../../models/Message';

export default defineComponent({
  name: 'MessageItem',
  props: ['message'],
  methods: {
    getStampHTML(message: Message) {
      if (!message.fromMe) {
        return this.getHourByTimestamp(message.timestamp);
      } else {
        return (
          this.formatAckMessageHTML(message.ack) +
          ' ' +
          this.getHourByTimestamp(message.timestamp)
        );
      }
    },
    formatAckMessageHTML(ack: number) {
      if (ack == 0) return "<span class='material-icons'>schedule</span>";
      if (ack == 1) return "<span class='material-icons'>done</span>";
      if (ack == 2) return "<span class='material-icons'>done_all</span>";
    },
    getHourByTimestamp(timestamp: number) {
      var date = new Date(timestamp * 1000);
      return date.toLocaleTimeString('default');
    },
  },
});
</script>
