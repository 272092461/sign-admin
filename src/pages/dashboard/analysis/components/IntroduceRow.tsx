import { InfoCircleOutlined, AuditOutlined, ScheduleFilled, AlertFilled, StopFilled, SafetyCertificateFilled } from '@ant-design/icons';
import { TinyArea, TinyColumn, Progress } from '@ant-design/charts';
import { Col, Row, Tooltip } from 'antd';

import numeral from 'numeral';
import { ChartCard, Field } from './Charts';
import type { DataItem } from '../data.d';
import Trend from './Trend';
// import Yuan from '../utils/Yuan';
import styles from '../style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 4,
  style: { marginBottom: 24 },
};

const IntroduceRow = ({ loading, visitData }: { loading: boolean; visitData: API.ContractStore[] }) => {
  let process = 0;
  let waiting = 0;
  let timeout = 0;
  let pass = 0;
  let fail = 0;

  visitData.forEach(item => {
    if (item.status === 1) {
      return pass++;
    } else if (item.status === 2) {
      return fail++;
    }
    const parts = (item.partAddress || '').split('|')
    if(parts[item.current] === '0xb7ea67e1cf56397cf1da2c7c6d426887134b3fac') {
      waiting++;
    } else {
      process++;
    }
  })

  return (
    <Row gutter={24}>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          title="待我签"
          icon={ <AuditOutlined style={{color: '#0092ff'}} /> }
          loading={loading}
          total={numeral(process).format('0,0')}
          contentHeight={56}
        />
      </Col>

      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="待他人签"
          icon={ <ScheduleFilled style={{color: '#0092ff'}} /> }
          total={numeral(waiting).format('0,0')}
          contentHeight={56}
        />
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="快超时"
          icon={ <AlertFilled style={{color: '#0092ff'}} /> }
          total={numeral(timeout).format('0,0')}
          contentHeight={56}
        />
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="已拒签"
          icon={ <StopFilled style={{color: '#0092ff'}} /> }
          total={numeral(fail).format('0,0')}
          contentHeight={56}
        />
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          bordered={false}
          loading={loading}
          title="已完成"
          icon={ <SafetyCertificateFilled style={{color: '#0092ff'}} /> }
          total={numeral(pass).format('0,0')}
          contentHeight={56}
        />
      </Col>
      <Col {...topColResponsiveProps}>
        <ChartCard
          loading={loading}
          bordered={false}
          title="办结进度"
          action={
            <Tooltip title="指标说明">
              <InfoCircleOutlined />
            </Tooltip>
          }
          total={ ((pass+fail) * 100 / visitData.length).toFixed(0) + '%' }
          footer={
            <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
              <Trend flag="up" style={{ marginRight: 16 }}>
                共办结: 
                <span className={styles.trendText}>{ numeral(pass+fail).format('0,0') }</span>
                件
              </Trend>
            </div>
          }
          contentHeight={46}
        >
          <Progress
            height={46}
            percent={(pass+fail) / visitData.length}
            color="#13C2C2"
            forceFit
            size={8}
            marker={[
              {
                value: 0.8,
                style: {
                  stroke: '#13C2C2',
                },
              },
            ]}
          />
        </ChartCard>
      </Col>
    </Row>
  )
};

export default IntroduceRow;
