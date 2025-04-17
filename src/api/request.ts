import Taro from '@tarojs/taro';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestOptions {
  method: Method;
  header: TaroGeneral.IAnyObject;
  // 自定义的 apiName
  _apiName?: string;
  ignoreErrorTip?: boolean;
}

type ApiMethod = (
  url: string,
  data: Record<string, any>,
  options?: RequestOptions
) => Promise<{
  r0: number;
  r1: string;
  res: any;
}>;

const URL_PREFIX = 'https://api.swlws.site';
const DEFAULT_METHOD = 'GET';
const DEFAULT_HEADER = {
  'Content-Type': 'application/json',
};

function request(url: string, data: Record<string, any>, options: RequestOptions) {
  const method = options.method || DEFAULT_METHOD;
  const header = { ...DEFAULT_HEADER, ...options.header };
  return Taro.request({
    url: `${URL_PREFIX}${url}`,
    data,
    dataType: 'json',
    method,
    timeout: 60000,
    header,
  })
    .then((res) => {
      return reposeInterceptor(res);
    })
    .catch((err) => {
      if (!options?.header?.ignoreErrorTip) {
        Taro.showToast({ title: '网络错误', icon: 'none', duration: 2000 });
      }

      return Promise.reject(err);
    });
}

function reposeInterceptor(res: Taro.request.SuccessCallbackResult) {
  if (res.statusCode === 200) {
    return res.data;
  } else {
    return Promise.reject(res);
  }
}

const api = {} as Record<Method, ApiMethod>;
['GET', 'POST', 'PUT', 'DELETE'].forEach((method: Method) => {
  api[method] = (
    url: string,
    data: Record<string, any>,
    options: RequestOptions = {} as RequestOptions
  ) => {
    return request(url, data, { ...options, method });
  };
});

export default api;
