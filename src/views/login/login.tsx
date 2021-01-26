import { defineComponent, reactive, ref, Ref } from 'vue';
import styles from './login.module.less';
import { useForm } from '@ant-design-vue/use';
import logo from '@/assets/images/logo.png';
import { Checkbox, Col, Form, Input, Row, Button } from 'ant-design-vue';

export default defineComponent({
  name: 'login',
  setup() {
    const formRef: Ref = ref('');
    const wrapperCol = {
      span: 24,
    };
    const formData = reactive({
      account: '',
      password: '',
    });
    const rules = reactive({
      account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
      password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
    });
    const formLoadingRef: Ref = ref(false);
    const autoLogoinRef = ref(false);

    const { validate, validateInfos } = useForm(formData, rules);
    const handleLogin = async () => {
      formLoadingRef.value = true;
      try {
        const data = await validate();
        console.log(data);
      } catch (error) {
      } finally {
        formLoadingRef.value = false;
      }
    };

    return {
      wrapperCol,
      formData,
      rules,
      formRef,
      validateInfos,
      autoLogoinRef,
      formLoadingRef,
      handleLogin,
    };
  },
  render() {
    return (
      <div class={`w-screen h-screen ${styles.loginBg} bg-100%`}>
        <div
          class={`h-full ${styles.loginMask} bg-no-repeat bg-80% hidden lg:block`}
        ></div>
        <div class="w-full h-full flex justify-center lg:justify-end items-center absolute inset-0">
          <div class="relative w-96 rounded px-2 py-10 lg:mr-40 bg-white ring-8 ring-gray-200 transform -translate-y-1/4">
            <header class="flex justify-center items-center">
              <img class="w-10 mr-4" src={logo} alt="Logo" />
              <h1 class="text-3xl">Zhen Admin</h1>
            </header>
            <Form
              class="m-auto mt-10 w-4/5"
              wrapperCol={this.wrapperCol}
              model={this.formData}
              rules={this.rules}
              ref={this.formRef}
            >
              <Form.Item {...this.validateInfos.account}>
                <Input
                  v-model={[this.formData.account, 'value', ['modifier']]}
                  size="large"
                  placeholder="username"
                ></Input>
              </Form.Item>
              <Form.Item {...this.validateInfos.password} name="password">
                <Input.Password
                  v-model={[this.formData.password, 'value', ['modifier']]}
                  size="large"
                  placeholder="password"
                ></Input.Password>
              </Form.Item>
              <Row>
                <Col span={12}>
                  <Form.Item>
                    <Checkbox
                      v-model={[
                        this.autoLogoinRef,
                        'checked',
                        ['modifier'],
                      ]}
                    >
                      自动登录
                    </Checkbox>
                  </Form.Item>
                </Col>
                <Col span={12} class="text-right">
                  <Form.Item>
                    <Button type="link" size="small">
                      忘记密码
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item>
                <Button
                  type="primary"
                  size="large"
                  block={true}
                  loading={this.formLoadingRef}
                  onClick={this.handleLogin}
                >
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  },
});
