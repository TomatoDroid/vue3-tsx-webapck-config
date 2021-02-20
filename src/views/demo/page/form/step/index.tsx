import PageWrapper from '@/components/page/PageWrapper';
import { Button, Steps } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';
import Step1 from './step1';

export default defineComponent({
  name: 'StepPage',
  setup() {
    const currentRef = ref(0);
    const handleClick = () => {
      currentRef.value++;
    };
    return () => (
      <PageWrapper
        title="分步表单"
        content="将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成。"
      >
        <div style="width:750px" class="my-0 mx-auto">
          <Steps current={currentRef.value}>
            <Steps.Step title="填写转账信息"></Steps.Step>
            <Steps.Step title="确认转账信息"></Steps.Step>
            <Steps.Step title="完成"></Steps.Step>
          </Steps>
        </div>
        <div class="mt-5">
          <Step1></Step1>
        </div>
      </PageWrapper>
    );
  },
});
