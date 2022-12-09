<template>
  <q-page>
    <div
      id="container"
      class="full-width full-height row wrap justify-start items-start content-start"
    >
      <div class="col-xs-12 col-sm-12 col-md-3 col-lg-3 chat-list shadow-2">
        <q-toolbar class="bg-grey-2">
          <q-btn round flat icon="settings">
            <q-menu auto-close>
              <q-list>
                <q-item clickable
                  ><q-item-section avatar>
                    <q-icon color="teal" name="person" />
                  </q-item-section>
                  <q-item-section>Chat with people</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon color="secondary" name="groups" />
                  </q-item-section>
                  <q-item-section>Chat with groups</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section avatar>
                    <q-icon color="purple" name="archive" />
                  </q-item-section>
                  <q-item-section>Archived</q-item-section>
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
          <q-btn round flat icon="add" @click="showDialogNewChat = true" />
        </q-toolbar>

        <q-scroll-area style="height: calc(100vh - 100px)">
          <ChatItem
            v-for="chat of chats"
            v-bind:key="chat?.id._serialized"
            :chat="chat"
            @selectContact="(contact: Contact) => selectedContact = contact"
          ></ChatItem>
        </q-scroll-area>
      </div>
      <div class="col-9 messages-list" v-if="selectedContact.id != null">
        <div class="row header justify-between">
          <div class="col-10 contact-info">
            <q-avatar rounded>
              <q-img
                :src="selectedContact.profilePicThumbObj?.eurl"
                placeholder-src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                style="width: 48px; height: 48px"
                loading="lazy"
              />
            </q-avatar>
            <div class="text">
              <span class="contact_name">{{
                selectedContact.formattedName
              }}</span>
              <small class="contact_status">Status text of contact</small>
            </div>
          </div>
          <div class="buttons">
            <q-btn round flat icon="search" />
            <q-btn round flat icon="more_vert">
              <q-menu auto-close :offset="[110, 0]">
                <q-list style="min-width: 150px">
                  <q-item clickable @click="toggleRightDrawer">
                    <q-item-section>Contact data</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>Block</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Select messages</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>Silence</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Erase messages</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <q-scroll-area ref="scroolMessages" style="height: calc(100vh - 204px)">
          <LoadMore></LoadMore>
          <DateHead></DateHead>
          <MessageItem
            :message="message"
            v-for="message of messages"
            v-bind:key="message.id"
          ></MessageItem>
        </q-scroll-area>

        <q-toolbar>
          <q-btn round flat icon="insert_emoticon" class="q-mr-sm" />
          <q-btn round flat @click="showAttachItemSheet">
            <q-icon name="attachment" class="rotate-135" />
          </q-btn>
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
      <div
        v-if="rightDrawerOpen && selectedContact != null"
        class="col-xs-12 col-sm-12 col-md-3 col-lg-3 contact-data shadow-2"
      >
        <q-toolbar class="bg-grey-2">
          <q-toolbar-title> WhatsApp profile </q-toolbar-title>
          <q-btn
            round
            flat
            side
            icon="close"
            @click="toggleRightDrawer"
            color="teal"
          />
        </q-toolbar>

        <q-scroll-area style="height: calc(100vh - 100px)">
          <div class="row items-center">
            <div class="avatar col-12 items-center justify-center text-center">
              <q-avatar rounded size="220px">
                <q-img
                  :src="selectedContact.profilePicThumbObj?.eurl"
                  placeholder-src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
                  style="width: 130px; height: 130px"
                  loading="lazy"
                />
              </q-avatar>
              <div class="contact-name text-h6">
                {{ selectedContact.formattedName }}
              </div>
            </div>
          </div>
          <div class="contact-info q-pa-sm">
            <div class="text-subtitle2">Name</div>
            <div class="text-body1">{{ selectedContact.name }}</div>
            <q-separator spaced="10px" />
            <div class="text-subtitle2">Phone number</div>
            <div class="text-body1">
              {{
                (selectedContact.id as unknown as string).replace('@c.us', '')
              }}
            </div>
            <q-separator spaced="10px" />
          </div>
        </q-scroll-area>
      </div>
    </div>
    <NewChat
      :isShow="showDialogNewChat"
      @editVisibility="(value: boolean) => showDialogNewChat = value"
    />
  </q-page>
</template>

<script lang="ts">
import DateHead from '../components/Chat/DateHead.vue';
import LoadMore from '../components/Chat/LoadMore.vue';
import NewChat from '../components/Chat/NewChat.vue';
import { defineComponent, ref } from 'vue';
import ChatItem from '../components/ChatItem.vue';
import MessageItem from '../components/Chat/MessageItem.vue';
import { Message } from '../models/Message';
import { QScrollArea } from 'quasar';
import { Contact } from '../models/Contact';

export default defineComponent({
  name: 'IndexPage',
  components: { ChatItem, LoadMore, DateHead, MessageItem, NewChat },
  data() {
    return {
      selectedContact: <Partial<Contact>>[],
      showDialogNewChat: false,
      message: '',
      messages: <Message[]>(<unknown>[
        {
          id: 'false_5521985232927@c.us_3AA9BD9BA0BA93C8F265',
          body: 'Oi',
          type: 'chat',
          t: 1670461591,
          notifyName: 'Cleiton',
          from: '5521985232927@c.us',
          to: '5521967865110@c.us',
          self: 'in',
          ack: 1,
          isNewMsg: true,
          star: false,
          kicNotified: false,
          recvFresh: true,
          isFromTemplate: false,
          pollInvalidated: false,
          broadcast: false,
          mentionedJidList: [],
          isVcardOverMmsDocument: false,
          isForwarded: false,
          labels: [],
          hasReaction: false,
          ephemeralOutOfSync: false,
          productHeaderImageRejected: false,
          lastPlaybackProgress: 0,
          isDynamicReplyButtonsMsg: false,
          isMdHistoryMsg: false,
          stickerSentTs: 0,
          requiresDirectConnection: false,
          pttForwardedFeaturesEnabled: true,
          chatId: '5521985232927@c.us',
          fromMe: false,
          sender: {
            id: '5521985232927@c.us',
            name: 'Cleiton Carvalho 2019',
            shortName: 'Cleiton',
            pushname: 'Cleiton',
            type: 'in',
            isBusiness: false,
            isEnterprise: false,
            labels: [],
            isContactSyncCompleted: 0,
            formattedName: 'Cleiton Carvalho 2019',
            isMe: false,
            isMyContact: true,
            isPSA: false,
            isUser: true,
            isWAContact: true,
            profilePicThumbObj: {
              eurl: 'https://pps.whatsapp.net/v/t61.24694-24/301407598_443531971163753_7382870583960884207_n.jpg?ccb=11-4&oh=01_AdRSMgnnR_DxHVko5gGjwSJN9D4hKIIr8Bho13lkgd1Xhw&oe=639E4C3E',
              id: '5521985232927@c.us',
              img: 'https://pps.whatsapp.net/v/t61.24694-24/301407598_443531971163753_7382870583960884207_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdTd-k-xKBTSeup1Zg-OH98Kuj9ymkUK8ygdos5IJ7b1yQ&oe=639E4C3E',
              imgFull:
                'https://pps.whatsapp.net/v/t61.24694-24/301407598_443531971163753_7382870583960884207_n.jpg?ccb=11-4&oh=01_AdRSMgnnR_DxHVko5gGjwSJN9D4hKIIr8Bho13lkgd1Xhw&oe=639E4C3E',
              raw: null,
              tag: '1661822366',
            },
            msgs: null,
          },
          timestamp: 1670461591,
          content: 'Oi',
          isGroupMsg: false,
          isMedia: false,
          isNotification: false,
          isPSA: false,
          mediaData: {},
        },
        {
          id: 'false_5521985232927@c.us_3AB308903F934A98B160',
          body: '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wgARCABIACEDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAECAwQG/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//aAAwDAQACEAMQAAAA9Hbm1W0TKSDBpBF1iQcldaTpWy50C88ceiJrHXWaBmtSxcJEv//EABYRAAMAAAAAAAAAAAAAAAAAABARMP/aAAgBAgEBPwCiP//EABkRAAMBAQEAAAAAAAAAAAAAAAABERACIP/aAAgBAwEBPwBqekPE4PrKXP/EACQQAAICAQMEAgMAAAAAAAAAAAECABESAxAhEyIxUTJBQmGR/9oACAEBAAE/AAO6749ShMhzxKtvkeNtIaqs/VcEE9tQEfbTJfcAvmVCDnApBujOf3/IrfVHZgRzcDkcmzOoPRitezk5nyBMm9mBj7MRjmASdtVxkQVuZLXxmSj8ZpOMqCVezo5YkVUZKBNiLplgCDERwRdVswYeCTFS/MAA8DcsB5MfWRD3XE1kc0twEHb//gADAP/Z',
          type: 'image',
          t: 1670461613,
          notifyName: 'Cleiton',
          from: '5521985232927@c.us',
          to: '5521967865110@c.us',
          self: 'in',
          ack: 1,
          isNewMsg: true,
          star: false,
          kicNotified: false,
          recvFresh: true,
          interactiveAnnotations: [],
          deprecatedMms3Url:
            'https://mmg.whatsapp.net/d/f/AmMNVJlnDhfzTZnsCLxmlJx-Gagwc7Wja2K5myrHX8rJ.enc',
          directPath:
            '/v/t62.7118-24/25615552_5658134157596336_8779730460001396336_n.enc?ccb=11-4&oh=01_AdRNVx-VNGUW1Y6Vyr64fH935hgA0t9WaNp8wQ_wt-tYnQ&oe=63B89962',
          mimetype: 'image/jpeg',
          filehash: 'lSecCAwg7OY/1RoGBYXYxldEhqiGbj+zYoyIULbKx6I=',
          encFilehash: 'RCQymip5jlZQC+0EU+K5Z57OTt8hMGI3gpHeaYtPbyM=',
          size: 156619,
          mediaKey: '8UEBkQ2qBfAbRx3Ac2iuPRVkLtqkLKOKQ1DM0MSYY7Q=',
          mediaKeyTimestamp: 1670434450,
          isViewOnce: false,
          width: 739,
          height: 1600,
          staticUrl: '',
          scanLengths: [9674, 80266, 26498, 40179],
          scansSidecar: {},
          isFromTemplate: false,
          pollInvalidated: false,
          broadcast: false,
          mentionedJidList: [],
          isVcardOverMmsDocument: false,
          isForwarded: false,
          labels: [],
          hasReaction: false,
          ephemeralOutOfSync: false,
          productHeaderImageRejected: false,
          lastPlaybackProgress: 0,
          isDynamicReplyButtonsMsg: false,
          isMdHistoryMsg: false,
          stickerSentTs: 0,
          requiresDirectConnection: false,
          pttForwardedFeaturesEnabled: true,
          chatId: '5521985232927@c.us',
          fromMe: false,
          sender: {
            id: '5521985232927@c.us',
            name: 'Cleiton Carvalho 2019',
            shortName: 'Cleiton',
            pushname: 'Cleiton',
            type: 'in',
            isBusiness: false,
            isEnterprise: false,
            labels: [],
            isContactSyncCompleted: 0,
            formattedName: 'Cleiton Carvalho 2019',
            isMe: false,
            isMyContact: true,
            isPSA: false,
            isUser: true,
            isWAContact: true,
            profilePicThumbObj: {
              eurl: 'https://pps.whatsapp.net/v/t61.24694-24/301407598_443531971163753_7382870583960884207_n.jpg?ccb=11-4&oh=01_AdRSMgnnR_DxHVko5gGjwSJN9D4hKIIr8Bho13lkgd1Xhw&oe=639E4C3E',
              id: '5521985232927@c.us',
              img: 'https://pps.whatsapp.net/v/t61.24694-24/301407598_443531971163753_7382870583960884207_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdTd-k-xKBTSeup1Zg-OH98Kuj9ymkUK8ygdos5IJ7b1yQ&oe=639E4C3E',
              imgFull:
                'https://pps.whatsapp.net/v/t61.24694-24/301407598_443531971163753_7382870583960884207_n.jpg?ccb=11-4&oh=01_AdRSMgnnR_DxHVko5gGjwSJN9D4hKIIr8Bho13lkgd1Xhw&oe=639E4C3E',
              raw: null,
              tag: '1661822366',
            },
            msgs: null,
          },
          timestamp: 1670461613,
          content:
            '/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T/2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT/wgARCABIACEDASIAAhEBAxEB/8QAGQABAAMBAQAAAAAAAAAAAAAAAAECAwQG/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//aAAwDAQACEAMQAAAA9Hbm1W0TKSDBpBF1iQcldaTpWy50C88ceiJrHXWaBmtSxcJEv//EABYRAAMAAAAAAAAAAAAAAAAAABARMP/aAAgBAgEBPwCiP//EABkRAAMBAQEAAAAAAAAAAAAAAAABERACIP/aAAgBAwEBPwBqekPE4PrKXP/EACQQAAICAQMEAgMAAAAAAAAAAAECABESAxAhEyIxUTJBQmGR/9oACAEBAAE/AAO6749ShMhzxKtvkeNtIaqs/VcEE9tQEfbTJfcAvmVCDnApBujOf3/IrfVHZgRzcDkcmzOoPRitezk5nyBMm9mBj7MRjmASdtVxkQVuZLXxmSj8ZpOMqCVezo5YkVUZKBNiLplgCDERwRdVswYeCTFS/MAA8DcsB5MfWRD3XE1kc0twEHb//gADAP/Z',
          isGroupMsg: false,
          isMedia: true,
          isNotification: false,
          isPSA: false,
          mediaData: {
            type: 'unknown',
            mediaStage: 'INIT',
            animationDuration: 0,
            animatedAsNewMsg: false,
            isViewOnce: false,
            _swStreamingSupported: false,
            _listeningToSwSupport: false,
            isVcardOverMmsDocument: false,
          },
        },
        {
          id: 'false_5521985232927@c.us_3ADA3F23059ECEB3086F',
          type: 'ptt',
          t: 1670461645,
          notifyName: 'Cleiton',
          from: '5521985232927@c.us',
          to: '5521967865110@c.us',
          self: 'in',
          ack: 1,
          isNewMsg: true,
          star: false,
          kicNotified: false,
          recvFresh: true,
          deprecatedMms3Url:
            'https://mmg.whatsapp.net/d/f/Ai5pi312HpN2cCjuhz6g-BZjzGbm9A8DuZp879xqbWox.enc',
          directPath:
            '/v/t62.7117-24/26676630_597720778780984_3237907333153694386_n.enc?ccb=11-4&oh=01_AdTFEmI6xRpQQjdwtkHU7EUinXmFnCsOo2K8Oh7jPQ9mCg&oe=63B8C041',
          mimetype: 'audio/ogg; codecs=opus',
          duration: '3',
          filehash: 'vMZ1wKfpgOavZWI10jPghg7REZIhOoKaKX3GlF0x4NA=',
          encFilehash: 'sUhYCJY46/JbICml0gvcD9BI0XYzbLPw2oAiDLrZHlY=',
          size: 7304,
          streamingSidecar: {},
          mediaKey: '1a60BwqLpZGq2o2Rg1q7C0oCy/kQbsPWbajauhp4iyU=',
          mediaKeyTimestamp: 1670461640,
          waveform: {
            '0': 2,
            '1': 2,
            '2': 3,
            '3': 3,
            '4': 3,
            '5': 3,
            '6': 3,
            '7': 3,
            '8': 3,
            '9': 4,
            '10': 6,
            '11': 35,
            '12': 63,
            '13': 92,
            '14': 100,
            '15': 100,
            '16': 100,
            '17': 100,
            '18': 100,
            '19': 100,
            '20': 99,
            '21': 92,
            '22': 85,
            '23': 78,
            '24': 74,
            '25': 72,
            '26': 69,
            '27': 72,
            '28': 82,
            '29': 91,
            '30': 100,
            '31': 100,
            '32': 100,
            '33': 100,
            '34': 96,
            '35': 93,
            '36': 89,
            '37': 82,
            '38': 72,
            '39': 62,
            '40': 52,
            '41': 45,
            '42': 39,
            '43': 32,
            '44': 30,
            '45': 28,
            '46': 26,
            '47': 38,
            '48': 61,
            '49': 83,
            '50': 97,
            '51': 88,
            '52': 78,
            '53': 69,
            '54': 77,
            '55': 87,
            '56': 96,
            '57': 100,
            '58': 100,
            '59': 100,
            '60': 98,
            '61': 95,
            '62': 92,
            '63': 89,
          },
          isFromTemplate: false,
          pollInvalidated: false,
          broadcast: false,
          mentionedJidList: [],
          isVcardOverMmsDocument: false,
          isForwarded: false,
          labels: [],
          hasReaction: false,
          ephemeralOutOfSync: false,
          productHeaderImageRejected: false,
          lastPlaybackProgress: 0,
          isDynamicReplyButtonsMsg: false,
          isMdHistoryMsg: false,
          stickerSentTs: 0,
          requiresDirectConnection: false,
          pttForwardedFeaturesEnabled: true,
          chatId: '5521985232927@c.us',
          fromMe: false,
          sender: {
            id: '5521985232927@c.us',
            name: 'Cleiton Carvalho 2019',
            shortName: 'Cleiton',
            pushname: 'Cleiton',
            type: 'in',
            isBusiness: false,
            isEnterprise: false,
            labels: [],
            isContactSyncCompleted: 0,
            formattedName: 'Cleiton Carvalho 2019',
            isMe: false,
            isMyContact: true,
            isPSA: false,
            isUser: true,
            isWAContact: true,
            profilePicThumbObj: {
              eurl: 'https://pps.whatsapp.net/v/t61.24694-24/301407598_443531971163753_7382870583960884207_n.jpg?ccb=11-4&oh=01_AdRSMgnnR_DxHVko5gGjwSJN9D4hKIIr8Bho13lkgd1Xhw&oe=639E4C3E',
              id: '5521985232927@c.us',
              img: 'https://pps.whatsapp.net/v/t61.24694-24/301407598_443531971163753_7382870583960884207_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdTd-k-xKBTSeup1Zg-OH98Kuj9ymkUK8ygdos5IJ7b1yQ&oe=639E4C3E',
              imgFull:
                'https://pps.whatsapp.net/v/t61.24694-24/301407598_443531971163753_7382870583960884207_n.jpg?ccb=11-4&oh=01_AdRSMgnnR_DxHVko5gGjwSJN9D4hKIIr8Bho13lkgd1Xhw&oe=639E4C3E',
              raw: null,
              tag: '1661822366',
            },
            msgs: null,
          },
          timestamp: 1670461645,
          isGroupMsg: false,
          isMedia: false,
          isNotification: false,
          isPSA: false,
          mediaData: {
            type: 'unknown',
            mediaStage: 'INIT',
            animationDuration: 0,
            animatedAsNewMsg: false,
            isViewOnce: false,
            _swStreamingSupported: false,
            _listeningToSwSupport: false,
            isVcardOverMmsDocument: false,
          },
        },
        {
          id: 'true_5521985232927@c.us_3AAADD0AC7BB8F91DE72',
          body: 'Oie',
          type: 'chat',
          t: 1670462461,
          notifyName: 'Cleiton',
          from: '5521967865110@c.us',
          to: '5521985232927@c.us',
          self: 'in',
          ack: 1,
          isNewMsg: true,
          star: false,
          kicNotified: false,
          recvFresh: true,
          isFromTemplate: false,
          pollInvalidated: false,
          broadcast: false,
          mentionedJidList: [],
          isVcardOverMmsDocument: false,
          isForwarded: false,
          labels: [],
          hasReaction: false,
          ephemeralOutOfSync: false,
          productHeaderImageRejected: false,
          lastPlaybackProgress: 0,
          isDynamicReplyButtonsMsg: false,
          isMdHistoryMsg: false,
          stickerSentTs: 0,
          requiresDirectConnection: false,
          pttForwardedFeaturesEnabled: true,
          chatId: '5521985232927@c.us',
          fromMe: true,
          sender: {
            id: '5521967865110@c.us',
            name: 'TitanWhats',
            shortName: 'TitanWhats',
            pushname: 'Cleiton',
            type: 'in',
            verifiedName: 'Cleiton',
            isBusiness: true,
            isEnterprise: false,
            verifiedLevel: 0,
            privacyMode: null,
            labels: [],
            isContactSyncCompleted: 0,
            forcedBusinessUpdateFromServer: true,
            formattedName: 'Você',
            isMe: true,
            isMyContact: true,
            isPSA: false,
            isUser: true,
            isWAContact: true,
            profilePicThumbObj: null,
            msgs: null,
          },
          timestamp: 1670462461,
          content: 'Oie',
          isGroupMsg: false,
          isMedia: false,
          isNotification: false,
          isPSA: false,
          mediaData: {},
        },
      ]),
      chats: <Partial<Contact[]>>(<unknown>[
        {
          id: '5521997409725@c.us',
          name: 'Gian - Colaborador',
          shortName: 'Gian',
          pushname: 'Gian Carlos',
          type: 'in',
          isBusiness: false,
          isEnterprise: false,
          labels: [],
          formattedName: 'Gian - Colaborador',
          isMe: false,
          isMyContact: true,
          isPSA: false,
          isUser: true,
          isWAContact: true,
          profilePicThumbObj: {},
          msgs: null,
        },
      ]),
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
        if (rightDrawerOpen.value) {
          document
            .getElementsByClassName('messages-list')[0]
            .classList.remove('col-9');
          document
            .getElementsByClassName('messages-list')[0]
            .classList.add('col-6');
        } else {
          document
            .getElementsByClassName('messages-list')[0]
            .classList.add('col-9');
          document
            .getElementsByClassName('messages-list')[0]
            .classList.remove('col-6');
        }
      },
    };
  },
  mounted() {
    /**
     * (this.$refs.scroolMessages as QScrollArea).setScrollPosition(
      'vertical',
      2000
    );
    */
  },
  methods: {
    showAttachItemSheet() {
      this.$q
        .bottomSheet({
          message: 'Send attachments',
          grid: true,
          actions: [
            {
              label: 'Poll Votes',
              icon: 'poll',
              color: 'purple',
              id: 'poll',
            },
            {
              label: 'Reply messages',
              icon: 'bolt',
              color: 'indigo',
              id: 'replymsg',
            },
            {
              label: 'Buttons',
              icon: 'dialpad',
              color: 'blue',
              id: 'buttons',
            },
            {
              label: 'List Message',
              icon: 'list',
              color: 'light-green-10',
              id: 'listmsg',
            },
            {
              label: 'Catalog',
              icon: 'shop',
              color: 'deep-purple',
              id: 'catalog',
            },
            {
              label: 'Document',
              icon: 'edit_document',
              color: 'purple',
              id: 'document',
            },
            {
              label: 'Images and videos',
              icon: 'image',
              color: 'primary',
              id: 'image',
            },
          ],
        })
        .onOk((action) => {
          if (action.id != 'document' && action.id != 'image') {
            this.$q.dialog({
              message: 'This function is not implemented yeat',
            });
          }
        })
        .onCancel(() => {
          //
        })
        .onDismiss(() => {
          //
        });
    },
  },
});
</script>
