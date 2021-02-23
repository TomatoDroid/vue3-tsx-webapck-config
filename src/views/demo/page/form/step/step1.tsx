import { useForm } from '@ant-design-vue/use';
import { Button, Form, Input, Select } from 'ant-design-vue';
import { defineComponent, reactive, toRaw } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Step1',
  setup() {
    const formData = reactive({
      account: '770226915@qq.com',
      fac: 'l770226915@qq.com',
      pay: 'zfb',
      payName: 'liuzhen',
      money: '500',
    });

    const rules = reactive({
      account: [
        {
          required: true,
          message: '请选择付款账户',
          trigger: 'change',
        },
      ],
      fac: [
        {
          required: true,
          message: '请输入收款账户',
          trigger: 'change',
        },
      ],
      payName: [
        {
          required: true,
          message: '请输入收款人姓名',
          trigger: 'change',
        },
      ],
      money: [
        {
          required: true,
          message: '请输入转账金额',
          trigger: 'change',
        },
      ],
    });

    const { validateInfos, validate } = useForm(formData, rules);

    const onSubmit = async () => {
      try {
        await validate();
        console.log(toRaw(formData));
      } catch (error) {}
    };

    return () => (
      <div class="mx-auto my-0" style="width:450px">
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          <Form.Item label="付款账户" {...validateInfos.account}>
            <Select
              v-model={[formData.account, 'value', ['modifier']]}
              allowClear
            >
              <Select.Option value="770226915@qq.com">
                770226915@qq.com
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="收款账户" {...validateInfos.fac}>
            <Input v-model={[formData.fac, 'value', ['modifier']]} allowClear>
              {{
                addonBefore: () => (
                  <Select v-model={[formData.pay, 'value', ['modifier']]}>
                    <Select.Option value="zfb">支付宝</Select.Option>
                    <Select.Option value="yl">银联</Select.Option>
                  </Select>
                ),
              }}
            </Input>
          </Form.Item>
          <Form.Item label="收款人姓名" {...validateInfos.payName}>
            <Input
              v-model={[formData.payName, 'value', ['modifier']]}
              allowClear
            ></Input>
          </Form.Item>
          <Form.Item label="转账金额" {...validateInfos.money}>
            <Input
              v-model={[formData.money, 'value', ['modifier']]}
              allowClear
              prefix="￥"
            ></Input>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 18 }}>
            <Button type="primary" onClick={onSubmit}>
              下一步
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  },
});
