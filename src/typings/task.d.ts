import { ENUM_TASK_STATE } from '@/constants/public';
import { IChooseImage, IChooseLocation } from './bridge';

export interface ITaskInfo {
  /** ID */
  _id?: string;
  location: IChooseLocation;
  uid: string;
  person: string;
  phoneNumber: string;
  pickupTime: string;
  goods: string[];
  snapshot: IChooseImage[];
  remark: string;
  /** 执行者 UID */
  dealWithUid: string;
  /** 执行者姓名 */
  dealwithPerson: string;
  /** 执行者电话 */
  dealWithPhoneNumber: string;
  state: ENUM_TASK_STATE;
}
