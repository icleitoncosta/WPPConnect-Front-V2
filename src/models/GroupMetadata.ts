import { Wid } from './Wid';
export interface GroupMetadata {
  id: Wid;
  creation: number;
  owner: Wid;
  desc: string;
  descId: string;
  descTime: number;
  descOwner: Wid;
  restrict: boolean;
  announce: boolean;
  noFrequentlyForwarded: boolean;
  ephemeralDuration: number;
  size: number;
  support: boolean;
  suspended: boolean;
  terminated: boolean;
  isParentGroup: boolean;
  defaultSubgroup: boolean;
  displayCadminPromotion: boolean;
  participants: any[];
  pendingParticipants: any[];
}
