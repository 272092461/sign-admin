import { Card, Table } from 'antd';
import React from 'react';
import type { DataItem } from '../data.d';

// import Trend from './Trend';
// import styles from '../style.less';

const columns = [
  {
    title: '协议名称',
    dataIndex: 'name',
    key: 'name',
    // render: (text: React.ReactNode) => <a href="/">{text}</a>,
  },
  {
    title: '参与方',
    dataIndex: 'participant',
    key: 'participant',
  },
  {
    title: '开始日期',
    dataIndex: 'createAt',
    key: 'createAt',
    sorter: (a: { count: number }, b: { count: number }) => a.count - b.count,
    // className: styles.alignRight,
    // TODO: 时间转换
    render: (text: React.ReactNode) => text
  },
  {
    title: '截止日期',
    dataIndex: 'expiration',
    key: 'expiration',
    sorter: (a: { range: number }, b: { range: number }) => a.range - b.range,
    // render: (text: React.ReactNode, record: { status: number }) => (
    //   <Trend flag={record.status === 1 ? 'down' : 'up'}>
    //     <span style={{ marginRight: 4 }}>{text}%</span>
    //   </Trend>
    // ),
  },
];

const TopSearch = ({
  loading,
  searchData,
  dropdownGroup,
}: {
  loading: boolean;
  dropdownGroup: React.ReactNode;
  searchData: DataItem[];
}) => (
  <Card
    loading={loading}
    bordered={false}
    title="待办事项"
    extra={dropdownGroup}
    style={{
      height: '100%',
    }}
  >
    <Table<any>
      rowKey={(record) => record.index}
      size="small"
      columns={columns}
      dataSource={searchData}
      pagination={{
        style: { marginBottom: 0 },
        pageSize: 5,
      }}
    />
  </Card>
);

export default TopSearch;
