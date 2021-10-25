// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { baseRequest } from './request';

/** 签署合约 */
export async function findContracts(options?: { [key: string]: any }) {
  return baseRequest<{
    data: API.ContractStore[];
  }>('/api/agreement/find', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

export async function updateContracts(body: any, options?: { [key: string]: any }) {
  return baseRequest<{
    data: API.CurrentUser;
  }>('/api/agreement/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
