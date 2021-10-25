import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Input, Drawer, Modal } from 'antd';
import React, { useState, useRef } from 'react';
import { useIntl, FormattedMessage } from 'umi';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import type { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import ProDescriptions from '@ant-design/pro-descriptions';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import { rule, addRule, updateRule, removeRule } from '@/services/ant-design-pro/api';
import { findContracts, updateContracts } from '@/services/store-service/api'
import { signContract, verifyContract } from '../../../services/sign-service/api'

/**
 * @en-US Add node
 * @zh-CN 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.ContractStore) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

/**
 * @en-US Update node
 * @zh-CN 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('Configuring');
  try {
    await updateRule({
      name: fields.name,
      desc: fields.desc,
      key: fields.key,
    });
    hide();

    message.success('Configuration is successful');
    return true;
  } catch (error) {
    hide();
    message.error('Configuration failed, please try again!');
    return false;
  }
};

/**
 *  Delete node
 * @zh-CN 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.ContractStore[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const TableList: React.FC = () => {
  /**
   * @en-US Pop-up window of new window
   * @zh-CN 新建窗口的弹窗
   *  */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /**
   * @en-US The pop-up window of the distribution update window
   * @zh-CN 分布更新窗口的弹窗
   * */
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);

  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<API.ContractStore>();
  const [selectedRowsState, setSelectedRows] = useState<API.ContractStore[]>([]);

  /**
   * @en-US International configuration
   * @zh-CN 国际化配置
   * */
  const intl = useIntl();

  const columns: ProColumns<API.ContractStore>[] = [
    {
      title: '合约编号',
      dataIndex: 'id',
      // tip: 'The rule name is the unique key',
      // render: (dom, entity) => {
      //   return (
      //     <a
      //       onClick={() => {
      //         setCurrentRow(entity);
      //         setShowDetail(true);
      //       }}
      //     >
      //       {dom}
      //     </a>
      //   );
      // },
    },
    {
      title: '合约名称',
      dataIndex: 'name',
      valueType: 'textarea',
    },
    {
      title: '发起方',
      dataIndex: 'creator',
    },
    {
      title: '经办人',
      dataIndex: 'operator',
    },
    {
      title: '参与方',
      dataIndex: 'participant',
    },
    {
      title: '发起时间',
      dataIndex: 'createAt',
    },
    {
      title: '结束时间',
      dataIndex: 'finishAt',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueEnum: {
        0: {
          text: '申请中',
          status: 'Processing',
        },
        1: {
          text: '已通过',
          status: 'Success',
        },
        2: {
          text: '已拒绝',
          status: 'Error',
        },
      }
    },
    {
      title: '医保经办人',
      dataIndex: 'insureOperator',
    },
    {
      title: <FormattedMessage id="pages.searchTable.titleOption" defaultMessage="Operating" />,
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        record.status === 0 && (
          <Button type="link">
            撤回
          </Button>
        ),
        <a
          onClick={() => {
            setCurrentRow(record);
            setShowDetail(true);
          }}
        >
          查看
        </a>,
        <Button type="link" danger>
          删除
        </Button>,
      ],
    },
  ];


  // 签署
  const signConfig = {
    title: '合约签署',
    content: (
      <>
        确认对这些合约进行签署？
      </>
    ),
    onOk: async () => {
      const result = await Promise.all(selectedRowsState.map(async item => {
        // 区块链签署
        await signContract({ cid: item.hash })
        // 区块链验证
        await verifyContract({ cid: item.hash })
        // 保存到mysql
        await updateContracts({
          ...item,
          status: 1,
        })
      }))

      setSelectedRows([]);
      actionRef.current?.reloadAndRest?.();
      message.success('签署成功')
    }
  }
  // 拒签
  const unsignConfig = {
    title: '拒绝签署',
    content: (
      <>
        确认对拒绝签署这些合约？
      </>
    ),
    onOk: async () => {
      const result = await Promise.all(selectedRowsState.map(async item => {
        // 区块链签署
        // await signContract({ cid: item.hash })
        // 区块链验证
        // await verifyContract({ cid: item.hash })
        // 保存到mysql
        await updateContracts({
          ...item,
          status: 2,
        })
      }))

      setSelectedRows([]);
      actionRef.current?.reloadAndRest?.();
      message.success('处理成功')
    }
  }
  const [modal, modalCtx] = Modal.useModal()

  return (
    <PageContainer>
      {modalCtx}
      <ProTable<API.ContractStore, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.searchTable.title',
          defaultMessage: 'Enquiry form',
        })}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={findContracts}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          // extra={
          //   <div>
          //     <FormattedMessage id="pages.searchTable.chosen" defaultMessage="Chosen" />{' '}
          //     <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{' '}
          //     <FormattedMessage id="pages.searchTable.item" defaultMessage="项" />
          //     &nbsp;&nbsp;
          //     <span>
          //       <FormattedMessage
          //         id="pages.searchTable.totalServiceCalls"
          //         defaultMessage="Total number of service calls"
          //       />{' '}
          //       {selectedRowsState.reduce((pre, item) => pre + item.callNo!, 0)}{' '}
          //       <FormattedMessage id="pages.searchTable.tenThousand" defaultMessage="万" />
          //     </span>
          //   </div>
          // }
        >
          <Button
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary" onClick={() => modal.confirm(signConfig)}>
            批量签署
          </Button>
          <Button type="primary" danger onClick={() => modal.confirm(unsignConfig)}>
            批量拒绝
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title={intl.formatMessage({
          id: 'pages.searchTable.createForm.newRule',
          defaultMessage: 'New rule',
        })}
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.ContractStore);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: (
                <FormattedMessage
                  id="pages.searchTable.ruleName"
                  defaultMessage="Rule name is required"
                />
              ),
            },
          ]}
          width="md"
          name="name"
        />
        <ProFormTextArea width="md" name="desc" />
      </ModalForm>
      <UpdateForm
        onSubmit={async (value) => {
          const success = await handleUpdate(value);
          if (success) {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleUpdateModalVisible(false);
          if (!showDetail) {
            setCurrentRow(undefined);
          }
        }}
        updateModalVisible={updateModalVisible}
        values={currentRow || {}}
      />

      <Drawer
        width={600}
        visible={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.name && (
          <ProDescriptions<API.ContractStore>
            column={2}
            title={currentRow?.name}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.name,
            }}
            columns={columns as ProDescriptionsItemProps<API.ContractStore>[]}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
