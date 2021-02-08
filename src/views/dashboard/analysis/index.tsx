import CollapseContainer from '@/components/container/CollapseContainer';
import { Col, Row } from 'ant-design-vue';
import { defineComponent } from 'vue';
import GroudCard from './components/GroudCard';
import { growCardList } from './data';

export default defineComponent({
  name: 'DashboardPage',
  setup() {
    return {};
  },
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
              helpMessage="tooltip消息"
              canExpen={true}
            >
              <h1>我是content</h1>
            </CollapseContainer>
          </Col>
        </Row>
      </div>
    );
  },
});
