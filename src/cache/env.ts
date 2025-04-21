import Taro from '@tarojs/taro';

export default class {
  get value(): 'trial' | 'develop' | 'release' {
    return Taro.getAccountInfoSync().miniProgram.envVersion;
  }
}
