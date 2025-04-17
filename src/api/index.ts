import apiRequest, { RequestOptions } from './request';
import user from './interface/user';
import task from './interface/task';

type ApiConfig = {
  [key in keyof typeof apiModule]: {
    [apiName in keyof (typeof apiModule)[key]]: ApiMethod;
  };
};

type ApiMethod = (
  data?: Record<string, any>,
  options?: RequestOptions
) => Promise<{
  r0: number;
  r1: string;
  res: any;
}>;

const apiModule = {
  user,
  task,
};

export default Object.keys(apiModule).reduce((acc, moduleName) => {
  const module = apiModule[moduleName];

  return {
    ...acc,
    [moduleName]: Object.keys(module).reduce((acc, apiName) => {
      const apiConfig = module[apiName];

      return {
        ...acc,
        [apiName]: (data?: Record<string, any>, options?: RequestOptions) => {
          if (!options) {
            options = {} as RequestOptions;
          }

          Object.assign(options, {
            header: apiConfig.header,
          });

          options._apiName = apiName;
          const method = (apiConfig.method || 'GET').toUpperCase();
          return apiRequest[method](apiConfig.url, data, options);
        },
      };
    }, {}),
  };
}, {} as ApiConfig);
