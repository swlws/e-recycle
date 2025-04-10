import { IChooseLocation } from './bridge';

export interface ITaskInfo {
  /** ID */
  _id?: string;
  person: string;
  phoneNumber: string;
  address: IChooseLocation;
  goods: string[];
  remark: string;
}
