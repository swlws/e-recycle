import Taro from '@tarojs/taro';

export enum ENUM_TEMPLATE_ID {
  /** 收到师傅接单通知 */
  USER_TAKE_TASK = 'zx06aI1Gj2s4UESFqwMgcU_LnPB4s9pRYKdqfJQCIU8',
  /** 订单取消通知 */
  USER_UNTAKE_TASK = 'TV8NHyuOumNGad-rX-LqzuxWIBWXJCL8Y35l97Nzbwo',
}

/**
 * 订阅消息
 * @param tmplIds
 * @returns
 */
export function requestSubscribeMessage(tmplIds: ENUM_TEMPLATE_ID[]): Promise<boolean> {
  return new Promise((resolve, reject) => {
    Taro.requestSubscribeMessage({
      tmplIds: tmplIds,
      entityIds: tmplIds, // Add required entityIds property as empty array
      success: (res) => {
        console.log('授权结果:', res);
        resolve(true);
      },
      fail: (err) => {
        console.error('授权失败:', err);
        reject(err);
      },
    });
  });
}

/**
 * 发布任务时，需要订阅的消息
 * @returns
 */
export function requestSubscribeMessageWhenPublishTask() {
  return requestSubscribeMessage([
    ENUM_TEMPLATE_ID.USER_TAKE_TASK,
    ENUM_TEMPLATE_ID.USER_UNTAKE_TASK,
  ]);
}
