import { AxiosRequestConfig } from 'axios';
import { VAxios } from './Axios';

function createAxios(opt?: AxiosRequestConfig) {
  return new VAxios(opt || {});
}

export const defHttp = createAxios();
