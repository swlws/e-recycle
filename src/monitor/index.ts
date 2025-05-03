import api from '@/api';
import { getCurrentInstance } from '@tarojs/runtime';

export enum ENUM_LOG_TYPE {
  CUSTOM = 'custom',
  SYSTEM = 'system',
}

/**
 * 日志参数
 */
export interface LogPayload {
  // 日志类型
  type: ENUM_LOG_TYPE;
  // 页面路径
  page?: string;
  // 页面标题
  pageTitle?: string;
  // 其它字段
  [key: string]: any;
}

let lastUploadTimestamp = 0;
const reocredList: LogPayload[] = [];

/**
 * 上传日志
 * @returns
 */
function uploadRecord() {
  if (reocredList.length === 0) return;

  if (Date.now() - lastUploadTimestamp < 3000) return;
  lastUploadTimestamp = Date.now();

  const list = reocredList.splice(0, reocredList.length);

  const page = getCurrentInstance().router?.path;

  list.forEach((item) => {
    item.page = page;
  });

  api.log.uploadRecordList({ list });
}

/**
 * 记录日志
 * @param payload
 */
export function addRecond(payload: LogPayload | LogPayload[]) {
  console.log(`log record: ${payload}`);

  if (Array.isArray(payload)) {
    reocredList.push(...payload);
  } else {
    reocredList.push(payload);
  }

  uploadRecord();
}
