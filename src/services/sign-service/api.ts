// @ts-ignore
/* eslint-disable */
import { request } from 'umi';
import { baseRequest } from './request';

/** 签署合约 */
export async function signContract(body: { cid: string }, options?: { [key: string]: any }) {
  return baseRequest<{
    data: API.CurrentUser;
  }>('/WeBASE-Node-Manager/contract/transaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      cnsName: '',
      contractAbi: [
        {
          constant: true,
          inputs: [{ name: 'hash', type: 'bytes32' }],
          name: 'getApplyData',
          outputs: [
            { name: '', type: 'bytes32' },
            { name: 'creator', type: 'address' },
            { name: 'ext', type: 'bytes' },
            { name: 'voted', type: 'uint8' },
            { name: 'threshold', type: 'uint8' },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            { name: 'hash', type: 'bytes32' },
            { name: 'ext', type: 'bytes' },
          ],
          name: 'createApply',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: '_CertificateRepo',
          outputs: [{ name: '', type: 'address' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: '_ApplyRepo',
          outputs: [{ name: '', type: 'address' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: 'hash', type: 'bytes32' }],
          name: 'voteApply',
          outputs: [{ name: '', type: 'bool' }],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: 'hash', type: 'bytes32' }],
          name: 'getCertificate',
          outputs: [
            { name: '', type: 'bytes32' },
            { name: '', type: 'address' },
            { name: '', type: 'uint256' },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { name: 'threshold', type: 'uint8' },
            { name: 'voterArray', type: 'address[]' },
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'hash', type: 'bytes32' },
            { indexed: false, name: 'creator', type: 'address' },
          ],
          name: 'CreateApply',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'hash', type: 'bytes32' },
            { indexed: false, name: 'voter', type: 'address' },
            { indexed: false, name: 'complete', type: 'bool' },
          ],
          name: 'VoteApply',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [{ indexed: true, name: 'hash', type: 'bytes32' }],
          name: 'CertificateSaved',
          type: 'event',
        },
      ],
      contractAddress: '0xa72e8a0c75e3078f98ff0f15f904696222293af2',
      contractId: 5,
      contractName: 'Certificate',
      funcName: 'voteApply',
      funcParam: [body.cid],
      groupId: '1',
      useCns: false,
      user: '0xb7ea67e1cf56397cf1da2c7c6d426887134b3fac',
      version: '',
    },
    ...(options || {}),
  });
}

/** 验证合约 */
export async function verifyContract(body: { cid: string }, options?: { [key: string]: any }) {
  return baseRequest<{
    data: API.CurrentUser;
  }>('/WeBASE-Node-Manager/contract/transaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      cnsName: '',
      contractAbi: [
        {
          constant: true,
          inputs: [{ name: 'hash', type: 'bytes32' }],
          name: 'getApplyData',
          outputs: [
            { name: '', type: 'bytes32' },
            { name: 'creator', type: 'address' },
            { name: 'ext', type: 'bytes' },
            { name: 'voted', type: 'uint8' },
            { name: 'threshold', type: 'uint8' },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [
            { name: 'hash', type: 'bytes32' },
            { name: 'ext', type: 'bytes' },
          ],
          name: 'createApply',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: '_CertificateRepo',
          outputs: [{ name: '', type: 'address' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: true,
          inputs: [],
          name: '_ApplyRepo',
          outputs: [{ name: '', type: 'address' }],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          constant: false,
          inputs: [{ name: 'hash', type: 'bytes32' }],
          name: 'voteApply',
          outputs: [{ name: '', type: 'bool' }],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          constant: true,
          inputs: [{ name: 'hash', type: 'bytes32' }],
          name: 'getCertificate',
          outputs: [
            { name: '', type: 'bytes32' },
            { name: '', type: 'address' },
            { name: '', type: 'uint256' },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [
            { name: 'threshold', type: 'uint8' },
            { name: 'voterArray', type: 'address[]' },
          ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'constructor',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'hash', type: 'bytes32' },
            { indexed: false, name: 'creator', type: 'address' },
          ],
          name: 'CreateApply',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [
            { indexed: true, name: 'hash', type: 'bytes32' },
            { indexed: false, name: 'voter', type: 'address' },
            { indexed: false, name: 'complete', type: 'bool' },
          ],
          name: 'VoteApply',
          type: 'event',
        },
        {
          anonymous: false,
          inputs: [{ indexed: true, name: 'hash', type: 'bytes32' }],
          name: 'CertificateSaved',
          type: 'event',
        },
      ],
      contractAddress: '0xa72e8a0c75e3078f98ff0f15f904696222293af2',
      contractId: 5,
      contractName: 'Certificate',
      funcName: 'getCertificate',
      funcParam: [body.cid],
      groupId: '1',
      useCns: false,
      user: '0xb7ea67e1cf56397cf1da2c7c6d426887134b3fac',
      version: '',
    },
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
