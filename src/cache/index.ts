import chooseLocation from './choose-location';
import fuzzyLocation from './fuzzy-location';
import Token from './token';
import User from './user';
import Session from './session';
import env from './env';

class CacheMgr {
  env: env;
  /** token */
  token: Token;
  /** 用户信息 */
  user: User;
  session: Session;
  /** 选择地理位置 */
  chooseLocation: chooseLocation;
  /** 模糊地理位置 */
  fuzzyLocation: fuzzyLocation;

  constructor() {
    this.env = new env();
    this.token = new Token();
    this.session = new Session();
    this.user = new User();
    this.chooseLocation = new chooseLocation();
    this.fuzzyLocation = new fuzzyLocation();
  }
}
export default new CacheMgr();
