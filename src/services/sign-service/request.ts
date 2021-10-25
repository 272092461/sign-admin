/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { request } from 'umi';

export function baseRequest<T>(url: string, options?: { [key: string]: any }) {
  return request<T>(`${url}`, {
    ...(options || {}),
  });
}
