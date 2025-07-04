import env from './env';
import inviter from './inviter';
import User from './user';
import Token from './token';
import chooseLocation from './choose-location';
import fuzzyLocation from './fuzzy-location';

class CacheMgr {
  env: env;
  /** 用户信息 */
  user: User;
  /** token */
  token: Token;
  /** 选择地理位置 */
  chooseLocation: chooseLocation;
  /** 模糊地理位置 */
  fuzzyLocation: fuzzyLocation;
  /** 邀请人 */
  inviter: inviter;

  constructor() {
    this.env = new env();
    this.inviter = new inviter();
    this.user = new User();
    this.token = new Token();
    this.chooseLocation = new chooseLocation();
    this.fuzzyLocation = new fuzzyLocation();
  }
}
export default new CacheMgr();
