import apiRequest, { RequestOptions } from './request';
import ops from './interface/ops';
import auth from './interface/auth';
import task from './interface/task';
import share from './interface/share';
import score from './interface/score';

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
  ops,
  auth,
  task,
  share,
  score,
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
