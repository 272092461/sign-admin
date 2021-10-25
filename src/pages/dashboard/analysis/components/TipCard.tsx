import { Card, Row, Steps } from 'antd';
// import React from 'react';

const { Step } = Steps


const Step1 = () => (
  <Card title="配置合约模板" style={{ width: 150 }}>
    <p>上传合约附件</p>
    <p>设置参与方类型</p>
    <p>指定签署顺序</p>
    <p>配置签署内容</p>
  </Card>
)
const Step2 = () => (
  <Card title="完善任务信息" style={{ width: 150 }}>
    <p>导入签署人信息</p>
    <p>设置任务时间</p>
    <p>添加抄送人</p>
  </Card>
)
const Step3 = () => (
  <Card title="下发签署任务" style={{ width: 150 }}>
    <p>短信推送任务</p>
    <p>邮件推送任务</p>
    <p>参与方注册认证</p>
  </Card>
)
const Step4 = () => (
  <Card title="多方签署合约" style={{ width: 150 }}>
    <p>医药机构签署</p>
    <p>担保人签署</p>
    <p>医保局签署</p>
  </Card>
)
const Step5 = () => (
  <Card title="合约归档" style={{ width: 150 }}>
    <p>归档电子档案系统</p>
    <p>存证区块链平台</p>
    <p>通知抄送人</p>
  </Card>
)

const TipCard = () => (
  <Card
    bordered={false}
    title="合约签署流程"
    style={{
      height: '100%',
      marginTop: 24,
    }}
  >
      <Steps current={-1}>
        <Step title={Step1()} />
        <Step title={Step2()} />
        <Step title={Step3()} />
        <Step title={Step4()} />
        <Step title={Step5()} />
      </Steps>

  </Card>
);

export default TipCard;
