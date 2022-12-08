import { Wid } from './Wid';
export interface MessageId {
  fromMe: boolean;
  id: string;
  remote: Wid;
  _serialized: string;
}
