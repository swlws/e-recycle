import Taro from '@tarojs/taro';

export enum ENUM_TEMPLATE_ID {
  /** 当师傅接单 */
  WHEN_USER_TAKE_TASK = 'zx06aI1Gj2s4UESFqwMgcXUK7Ck5wPN_OyDE8xokM0s',
  /** 当师傅取消订单 */
  WHEN_USER_UNTAKE_TASK = 'RgYL3cHvNJXFjDCWR_joPDx-7k7QnYuejQ7HR2khHNc',
  /** 当发布者删除任务 */
  when_delete_task = 'TV8NHyuOumNGad-rX-LqzvvUfzsr491aXKKjgvUlrww',
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
 * 当用户发布任务时，需要订阅的消息
 * @returns
 */
export function requestSubscribeMessageWhenUserPublishTask() {
  return requestSubscribeMessage([
    ENUM_TEMPLATE_ID.WHEN_USER_TAKE_TASK,
    ENUM_TEMPLATE_ID.WHEN_USER_UNTAKE_TASK,
  ]);
}

/**
 * 当师傅接单时，需要订阅的消息
 * @returns
 */
export function requestSubscribeMessageWhenUserTakeTask() {
  return requestSubscribeMessage([ENUM_TEMPLATE_ID.when_delete_task]);
}
