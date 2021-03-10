import type { AxiosRequestConfig } from 'axios';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  perfix?: string;
}

export interface Result<T = any> {
  code: string;
  type: 'success' | 'error' | 'warning';
  message: string;
  result: T;
}
