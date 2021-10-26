import { Card, Row, Col, Button, Steps, Table } from 'antd';
import { FileAddOutlined  } from '@ant-design/icons'
import type { DataItem } from '../data.d';
import { useState, useEffect } from 'react';

const { Step } = Steps

const buttonStyles = {
  display: 'flex',
  alignItems: 'center',
  height: '120px'
}

const columns = [
  // {
  //   title: '序号',
  //   dataIndex: 'index',
  //   key: 'index',
  // },
  {
    title: '协议名称',
    dataIndex: 'name',
    key: 'name',
  },
]

const ProcessCard = ({
  searchData,
}: {
  searchData: API.ContractStore[];
}) => {

  const [current, setCurrent] = useState({} as API.ContractStore);
  const [curIndex, setCurIndex] = useState(0);

  useEffect(() => {
    setCurrent(searchData[0] || {})
  }, [searchData])

  const rowSelection = {
    selectedRowKeys: [curIndex],
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      setCurrent(selectedRows[0])
      setCurIndex(selectedRowKeys[0] as number)
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: any) => ({
      // disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.keyword,
    }),
  };

  const getStatus = (cur: API.ContractStore) => {
    if (cur.status === 1) {
      return 'finish'
    }
    if (cur.status === 2) {
      return 'error'
    }
    const parts = (cur.partAddress || '').split('|')
    if(parts[cur.current] === '0xb7ea67e1cf56397cf1da2c7c6d426887134b3fac') {
      return 'process'
    } else {
      return 'wait'
    }

  }

  const getStep = (cur: API.ContractStore) => {
    if (cur.status === 1) {
      return 4
    } else if (cur.current === cur.threshold) {
      return 3
    }

    // const parts = (cur.partAddress || {})

    return cur.current
  }

  return (  
    <Card
      bordered={false}
      title="合约签署进度"
      style={{
        height: '100%',
      }}
    >
      <Row
        gutter={24}
        align="middle"
      >
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Table<any>
            rowKey={(record, index) => index || 0}
            size="small"
            rowSelection={{
              type: 'radio',
              ...rowSelection,
            }}
            columns={columns}
            dataSource={searchData}
            pagination={{
              style: { marginBottom: 0 },
              pageSize: 5,
            }}
          />
        </Col>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Steps current={getStep(current)} status={getStatus(current)}>
            <Step title="发起签署" description={current.creator} />
            <Step title="药店签署" description="" />
            {current.threshold && <Step title="担保人签署" description="" />}
            <Step title="医保签署" description="" />
            <Step title="完成签署" description="" />
          </Steps>
        </Col>
  
      </Row>
    </Card>
  );
}

export default ProcessCard;
