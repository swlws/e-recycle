import Taro from '@tarojs/taro';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface RequestOptions {
  method: Method;
  header: TaroGeneral.IAnyObject;
}

const DEFAULT_METHOD = 'GET';
const DEFAULT_HEADER = {
  'Content-Type': 'application/json',
};

function request(url: string, data: Record<string, any>, options: RequestOptions) {
  const method = options.method || DEFAULT_METHOD;
  const header = { ...DEFAULT_HEADER, ...options.header };
  return Taro.request({
    url,
    data,
    dataType: 'json',
    method,
    timeout: 60000,
    header,
  }).then((res) => {
    return reposeInterceptor(res);
  });
}

function reposeInterceptor(res: Taro.request.SuccessCallbackResult) {
  if (res.statusCode === 200) {
    return res.data;
  } else {
    return Promise.reject(res);
  }
}

const api = ['GET', 'POST', 'PUT', 'DELETE'].map((method: Method) => {
  return (url: string, data: Record<string, any>, options: RequestOptions) => {
    return request(url, data, { ...options, method });
  };
});

export default api;
