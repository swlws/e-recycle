import apiRequest, { RequestOptions } from './request';
import user from './interface/user';

const apiModule = {
  user,
};

Object.keys(apiModule).forEach((key) => {
  Object.keys(apiModule[key]).forEach((item) => {
    apiModule[key][item] = apiModule[key][item].url;
  });
});

export default Object.keys(apiModule).reduce((acc, moduleName) => {
  const module = apiModule[moduleName];

  return {
    ...acc,
    [moduleName]: Object.keys(module).reduce((acc, apiName) => {
      const apiConfig = module[apiName];

      return {
        ...acc,
        [apiName]: (data: Record<string, any>, options: RequestOptions) => {
          const method = apiConfig.method || 'GET';
          return apiRequest[method](apiConfig[apiName], data, options);
        },
      };
    }, {}),
  };
}, {});
