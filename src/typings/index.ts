/**
 * 一级页面
 */
export interface IMainPage {
  name: string;
  nameZh: string;
  component: React.FC | React.ComponentType<any>;
}

/**
 * 列表请求参数
 */
export interface ListRequest {
  page: number;
  size: number;
  [key: string]: any;
}

/**
 * 列表响应
 */
export interface ListResponse<T> {
  list: T[];
  total: number;
}
