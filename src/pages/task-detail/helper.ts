import { ENUM_PAGE_ALIAS } from '@/constants/route';
import { ITaskInfo } from '@/typings/task';
import CacheMgr from '@/cache';
import { ENUM_TASK_STATE } from '@/constants/public';

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
  const { uid, state, pickupTime } = taskInfo;

  const deleteVisible = currUid === uid;
  const finishVisible =
    new Date(pickupTime).getTime() < Date.now() && state !== ENUM_TASK_STATE.RESOLVE;
  return {
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
  const { uid } = taskInfo;

  const deleteVisible = currUid === uid;
  return { deleteVisible };
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
