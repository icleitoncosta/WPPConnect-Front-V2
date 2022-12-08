import { Chat } from './Chat';
import { Contact } from './Contact';
export declare enum MessageType {
  NOTIFICATION = 'notification',
  NOTIFICATION_TEMPLATE = 'notification_template',
  GROUP_NOTIFICATION = 'group_notification',
  /**
   * Group data modification, like subtitle or description and group members (join, leave)
   * See {@link GroupNotificationType}
   */
  GP2 = 'gp2',
  BROADCAST_NOTIFICATION = 'broadcast_notification',
  E2E_NOTIFICATION = 'e2e_notification',
  CALL_LOG = 'call_log',
  PROTOCOL = 'protocol',
  CHAT = 'chat',
  LOCATION = 'location',
  PAYMENT = 'payment',
  VCARD = 'vcard',
  CIPHERTEXT = 'ciphertext',
  MULTI_VCARD = 'multi_vcard',
  REVOKED = 'revoked',
  OVERSIZED = 'oversized',
  GROUPS_V4_INVITE = 'groups_v4_invite',
  HSM = 'hsm',
  TEMPLATE_BUTTON_REPLY = 'template_button_reply',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  PTT = 'ptt',
  STICKER = 'sticker',
  DOCUMENT = 'document',
  PRODUCT = 'product',
  ORDER = 'order',
  LIST = 'list',
  LIST_RESPONSE = 'list_response',
  BUTTONS_RESPONSE = 'buttons_response',
  UNKNOWN = 'unknown',
}
export declare enum MediaType {
  IMAGE = 'Image',
  VIDEO = 'Video',
  AUDIO = 'Audio',
  PTT = 'Audio',
  DOCUMENT = 'Document',
  STICKER = 'Image',
}

export interface Message {
  id: string;
  body: string;
  type: MessageType;
  /**
   * When type is GP2: {@link GroupNotificationType}
   */
  subtype: string;
  t: number;
  notifyName: string;
  fromMe: boolean;
  from: string;
  to: string;
  author: string;
  self: string;
  ack: number;
  invis: boolean;
  isNewMsg: boolean;
  star: boolean;
  recvFresh: boolean;
  interactiveAnnotations: any[];
  kicNotified: boolean;
  clientUrl: string;
  deprecatedMms3Url: string;
  directPath: string;
  mimetype: string;
  filehash: string;
  uploadhash: string;
  size: number;
  mediaKey: string;
  mediaKeyTimestamp: number;
  width: number;
  height: number;
  broadcast: boolean;
  mentionedJidList: any[];
  isForwarded: boolean;
  isFromTemplate: boolean;
  pollInvalidated: boolean;
  isVcardOverMmsDocument: boolean;
  hasReaction: boolean;
  ephemeralOutOfSync: boolean;
  productHeaderImageRejected: boolean;
  lastPlaybackProgress: boolean;
  isDynamicReplyButtonsMsg: boolean;
  isMdHistoryMsg: boolean;
  stickerSentTs: number;
  requiresDirectConnection: boolean;
  pttForwardedFeaturesEnabled: boolean;
  labels: any[];
  sender: Contact;
  timestamp: number;
  content: string;
  isGroupMsg: boolean;
  isMMS: boolean;
  isMedia: boolean;
  isNotification: boolean;
  isPSA: boolean;
  /**
   * @deprecated Use o getChat para obter detalhes do chat
   */
  chat: Chat;
  lastSeen: null | number | boolean;
  chatId: string;
  /**
   * @deprecated Use o atributo quotedMsgId em getMessageById para obter detalhes da mensagem
   */
  quotedMsgObj: null;
  quotedMsgId: null;
  mediaData: MediaData;
  recipients?: string[];
}
export interface MediaData {
  type: string;
  mediaStage: string;
  animationDuration: number;
  animatedAsNewMsg: boolean;
  _swStreamingSupported: boolean;
  _listeningToSwSupport: boolean;
}
