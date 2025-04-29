/**
 * 需要存储在缓存中的用户信息
 */
export interface CacheUserInfo {
  _id: string;
  nickName: string;
  avatarUrl: string;
  phoneNumber: string;
  shareQrCode: string;
}

/**
 * 用户积分
 */
export interface IScoreItem {
  _id: string;
  score: number;
  type: string;
  createTime: string;
  payload: Record<string, any>;
}
