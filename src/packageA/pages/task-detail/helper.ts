import { ENUM_PAGE_ALIAS } from '@/constants/route';
import { ITaskInfo } from '@/typings/task';
import CacheMgr from '@/cache';
import { ENUM_TASK_STATE } from '@/constants/public';
import api from '@/api';
import Taro from '@tarojs/taro';
import { requestSubscribeMessageWhenUserTakeTask } from '@/bridge/notify';

export interface IButtonPermission {
  deleteVisible?: boolean;
  takeVisible?: boolean;
  unTakeVisible?: boolean;
  finishVisible?: boolean;
}

/**
 * 任务中心页面按钮权限
 * @param taskInfo
 * @returns
 */
export function buttonPermissionForTaskCenterPage(taskInfo: ITaskInfo): IButtonPermission {
  const currUid = CacheMgr.user.value?._id;
  const { uid, state, pickupTime, dealWithUid } = taskInfo;

  const deleteVisible = currUid === uid;
  const finishVisible =
    new Date(pickupTime).getTime() < Date.now() && state === ENUM_TASK_STATE.WILL_RESOLVE;

  const takeVisible = currUid !== dealWithUid && state !== ENUM_TASK_STATE.INVALID;
  const unTakeVisible = currUid === dealWithUid && new Date(pickupTime).getTime() > Date.now();
  return {
    takeVisible,
    unTakeVisible,
    deleteVisible,
    finishVisible,
  };
}

/**
 * 已发布的任务页面按钮权限
 * @param taskInfo
 * @returns
 */
export function buttonPermissionForPublishedTaskPage(taskInfo: ITaskInfo): IButtonPermission {
  const currUid = CacheMgr.user.value?._id;
  const { uid, dealWithUid, pickupTime } = taskInfo;

  const unTakeVisible = currUid === dealWithUid && new Date(pickupTime).getTime() > Date.now();
  const deleteVisible = currUid === uid;

  return { deleteVisible, unTakeVisible };
}

/**
 * 交易中的任务页面按钮权限
 * @param taskInfo
 * @returns
 */
export function buttonPermissionForInTradingTaskPage(taskInfo: ITaskInfo): IButtonPermission {
  const currUid = CacheMgr.user.value?._id;
  const { uid, dealWithUid, pickupTime } = taskInfo;
  const unTakeVisible = currUid === dealWithUid && new Date(pickupTime).getTime() > Date.now();

  const deleteVisible = currUid === uid;
  return { deleteVisible, unTakeVisible };
}

/**
 * 卖出的任务页面按钮权限
 */
export function buttonPermissionForSellOutListPage(taskInfo: ITaskInfo): IButtonPermission {
  const currUid = CacheMgr.user.value?._id;
  const { uid } = taskInfo;

  const deleteVisible = currUid === uid;
  return { deleteVisible };
}

/**
 * 买进的任务页面按钮权限
 * @param taskInfo
 * @returns
 */
export function buttonPermissionForBuyInListPage(taskInfo: ITaskInfo): IButtonPermission {
  return {};
}

/**
 * 计算按钮权限
 * @param originPage
 * @param taskInfo
 * @returns
 */
export function calculateButtonPermission(
  originPage: ENUM_PAGE_ALIAS | undefined,
  taskInfo: ITaskInfo
): IButtonPermission {
  switch (originPage) {
    case ENUM_PAGE_ALIAS.TASK_CENTER: {
      return buttonPermissionForTaskCenterPage(taskInfo);
    }
    case ENUM_PAGE_ALIAS.PUBLISHED_LIST: {
      return buttonPermissionForPublishedTaskPage(taskInfo);
    }
    case ENUM_PAGE_ALIAS.IN_TRADING_LIST: {
      return buttonPermissionForInTradingTaskPage(taskInfo);
    }
    case ENUM_PAGE_ALIAS.SELL_OUT_LIST: {
      return buttonPermissionForSellOutListPage(taskInfo);
    }
    case ENUM_PAGE_ALIAS.BUY_IN_LIST: {
      return buttonPermissionForBuyInListPage(taskInfo);
    }
    default: {
      return {};
    }
  }
}

function callNavigateBack() {
  setTimeout(() => {
    Taro.navigateBack();
  }, 500);
}
``;
async function doTakeTask(taskInfo: ITaskInfo) {
  // 订阅消息
  await requestSubscribeMessageWhenUserTakeTask();

  const data = { _id: taskInfo._id };
  api.task.taskTask(data).then(({ r0, r1 }) => {
    if (r0 === 0) {
      Taro.showToast({ title: '接单成功' });
      callNavigateBack();
    }

    return Taro.showToast({ title: r1, icon: 'none' });
  });
}

function doUnTakeTask(taskInfo: ITaskInfo) {
  const data = { _id: taskInfo._id };
  api.task.unTaskTask(data).then(() => {
    Taro.showToast({ title: '已取消任务' });
    callNavigateBack();
  });
}

function doFinishTask(taskInfo: ITaskInfo) {
  const data = { _id: taskInfo._id };
  api.task.finishTask(data).then(() => {
    Taro.showToast({ title: '已完成任务' });
    callNavigateBack();
  });
}

function doRemoveTask(taskInfo: ITaskInfo) {
  const data = { _id: taskInfo._id };
  api.task.removeTask(data).then(() => {
    Taro.showToast({ title: '已删除任务' });
    callNavigateBack();
  });
}

export type IBusinessEvent = 'take' | 'unTake' | 'finish' | 'delete';

/**
 * 处理业务事件
 * @param type
 * @param taskInfo
 */
export function patchBusinessEvent(type: IBusinessEvent, taskInfo: ITaskInfo) {
  switch (type) {
    case 'take': {
      doTakeTask(taskInfo);
      break;
    }
    case 'unTake': {
      doUnTakeTask(taskInfo);
      break;
    }
    case 'finish': {
      doFinishTask(taskInfo);
      break;
    }
    case 'delete': {
      doRemoveTask(taskInfo);
      break;
    }
  }
}
