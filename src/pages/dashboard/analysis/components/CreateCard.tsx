import { Card, Row, Col, Button } from 'antd';
import { FileAddOutlined  } from '@ant-design/icons'
// import React from 'react';

const buttonStyles = {
  display: 'flex',
  alignItems: 'center',
  height: '120px'
}

const CreateCard = () => (
  <Card
    bordered={false}
    title="发起合约"
    style={{
      height: '100%',
    }}
  >
    <Row
      gutter={24}
      style={{
        marginTop: 24,
      }}
    >
      <Col xl={12} lg={24} md={24} sm={24} xs={24}>
        <Button type="primary" style={buttonStyles} ghost block size="large" icon={<FileAddOutlined style={{ fontSize: "64px" }} />}>发起签署</Button>
      </Col>
      <Col xl={12} lg={24} md={24} sm={24} xs={24}>
        <Button type="primary" style={buttonStyles} ghost block size="large" icon={<FileAddOutlined style={{ fontSize: "64px" }} />}>创建模板</Button>
      </Col>

    </Row>
  </Card>
);

export default CreateCard;
