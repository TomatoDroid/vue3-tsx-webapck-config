import CollapseContainer from '@/components/container/CollapseContainer';
import { Col, Row } from 'ant-design-vue';
import { defineComponent } from 'vue';
import AnalysisLine from './components/AnalysisLine';
import AnalysisPie from './components/AnalysisPie';
import GroudCard from './components/GroudCard';
import { growCardList } from './data';

export default defineComponent({
  name: 'DashboardPage',
  render() {
    return (
      <div class="p-4">
        <Row>
          {growCardList.map((item, index) => (
            <Col xl={6} md={12} sm={24} class="pr-2 mb-2" key={index}>
              <GroudCard info={item}></GroudCard>
            </Col>
          ))}
        </Row>
        <Row>
          <Col md={24} xl={17}>
            <CollapseContainer
              title="产品成交额"
              helpMessage="产品成交额"
              canExpen={true}
            >
              <AnalysisLine></AnalysisLine>
            </CollapseContainer>
            <Row class="mt-3">
              <Col md={12} xl={12}>
                <CollapseContainer title="产品成交额">
                  <AnalysisPie></AnalysisPie>
                </CollapseContainer>
              </Col>
              <Col md={12} xl={12}></Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  },
});
