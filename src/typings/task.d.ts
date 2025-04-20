import { ENUM_TASK_STATE } from '@/constants/public';
import { IChooseImage, IChooseLocation } from './bridge';

export interface ITaskInfo {
  /** ID */
  _id?: string;
  person: string;
  phoneNumber: string;
  address: IChooseLocation;
  goods: string[];
  remark: string;
  pickupTime: string;
  snapshot: IChooseImage[];
  state: ENUM_TASK_STATE;
  uid: string;
}
