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

// const URL_PREFIX = 'https://swlws.site';
const URL_PREFIX = 'http://localhost:8808';
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
    .then((response) => {
      return reposeInterceptor(response, options);
    })
    .catch((err) => {
      if (!options?.header?.ignoreErrorTip) {
        Taro.showToast({ title: '网络错误', icon: 'none', duration: 2000 });
      }

      return Promise.reject(err);
    });
}

function reposeInterceptor(response: Taro.request.SuccessCallbackResult, options: RequestOptions) {
  if (response.statusCode === 200) {
    const { r0, r1, res } = response.data;

    // 允许显示错误信息
    if (!options?.header?.ignoreErrorTip) {
      if (r0 !== 0 && r1) {
        Taro.showToast({ title: r1, icon: 'none', duration: 2000 });
      }
    }

    return { r0, r1, res };
  } else {
    return Promise.reject(response);
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
