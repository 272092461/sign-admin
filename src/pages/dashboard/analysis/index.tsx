import type { FC } from 'react';
import { Suspense } from 'react';
// import { signContract, verifyContract } from '../../../services/sign-service/api'
import { Col, Row } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import IntroduceRow from './components/IntroduceRow';
// import SalesCard from './components/SalesCard';
// import TopSearch from './components/TopSearch';
import PendingData from './components/PendingData'
import ProcessCard from './components/ProcessCard'
import CreateCard from './components/CreateCard'
import TipCard from './components/TipCard'
// import ProportionSales from './components/ProportionSales';
// import OfflineData from './components/OfflineData';
import { useRequest, Link } from 'umi';

import { findContracts } from '../../../services/store-service/api'
import PageLoading from './components/PageLoading';
import type { AnalysisData } from './data.d';
import styles from './style.less';

type AnalysisProps = {
  dashboardAndanalysis: AnalysisData;
  loading: boolean;
};


const Analysis: FC<AnalysisProps> = () => {
  // const { loading, data } = useRequest(fakeChartData);
  // const cid = '0x7465737400000000000000000000000000000000000000000000000000012312'
  const { loading, data } = useRequest(findContracts)
  // const { loading, data } = useRequest(() => signContract({ cid }))
  // const { loading, data } = useRequest(() => verifyContract({ cid }))
  // let salesPieData;
  // if (salesType === 'all') {
  //   salesPieData = data?.salesTypeData;
  // } else {
  //   salesPieData = salesType === 'online' ? data?.salesTypeDataOnline : data?.salesTypeDataOffline;
  // }

  const dropdownGroup = (
    <span className={styles.iconGroup}>
      <Link to="/dashboard/TableList">更多</Link>
    </span>
  );


  return (
    <GridContent>
      <>
        <Suspense fallback={<PageLoading />}>
          <IntroduceRow loading={loading} visitData={data || []} />
        </Suspense>

        
        {/* <Suspense fallback={null}>
          <SalesCard
            rangePickerValue={rangePickerValue}
            salesData={data?.salesData || []}
            isActive={isActive}
            handleRangePickerChange={handleRangePickerChange}
            loading={loading}
            selectDate={selectDate}
          />
        </Suspense> */}

        <Row
          gutter={24}
        >
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <PendingData
                loading={loading}
                searchData={data || []}
                dropdownGroup={dropdownGroup}
              />
            </Suspense>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <CreateCard />
            </Suspense>
          </Col>

        </Row>

        <div
          style={{
            marginTop: 24,
          }}
        >
          <Suspense
          fallback={null}
          >
            <ProcessCard searchData={data || []} />
          </Suspense>
        </div>


        {/* <Row
          gutter={24}
          style={{
            marginTop: 24,
          }}
        >
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <TopSearch
                loading={loading}
                visitData2={data?.visitData2 || []}
                searchData={data?.searchData || []}
                dropdownGroup={dropdownGroup}
              />
            </Suspense>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Suspense fallback={null}>
              <ProportionSales
                dropdownGroup={dropdownGroup}
                salesType={salesType}
                loading={loading}
                salesPieData={salesPieData || []}
                handleChangeSalesType={handleChangeSalesType}
              />
            </Suspense>
          </Col>
        </Row>
         */}
        <Suspense fallback={null}>
          <TipCard />
        </Suspense>
        {/* <Suspense fallback={null}>
          <OfflineData
            activeKey={activeKey}
            loading={loading}
            offlineData={data?.offlineData || []}
            offlineChartData={data?.offlineChartData || []}
            handleTabChange={handleTabChange}
          />
        </Suspense> */}
      </>
    </GridContent>
  );
};

export default Analysis;
