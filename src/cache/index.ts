import chooseLocation from './choose-location';
import Token from './token';
import User from './user';

class CacheMgr {
  /** token */
  token: Token;
  /** 用户信息 */
  user: User;
  /** 选择地理位置 */
  chooseLocation: chooseLocation;

  constructor() {
    this.token = new Token();
    this.user = new User();
    this.chooseLocation = new chooseLocation();
  }
}
export default new CacheMgr();
