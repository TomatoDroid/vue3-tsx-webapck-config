import { defineComponent, reactive, ref } from 'vue';
import styles from './login.module.less';
import { useForm } from '@ant-design-vue/use';
import logo from '@/assets/images/logo.png';

export default defineComponent({
  name: 'login',
  setup() {
    const formRef = ref({});
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
    const formLoading = ref(false);
    const autoLogoin = ref(false);

    const { validate } = useForm(formData, rules);
    const handleLogin = async () => {
      formLoading.value = true;
      try {
        const data = await validate();
        console.log(data);
      } catch (error) {
      } finally {
        formLoading.value = false;
      }
    };

    return () => {
      return (
        <div class={`w-screen h-screen ${styles.loginBg} bg-100%`}>
          <div class={`h-full ${styles.loginMask} bg-no-repeat bg-80%`}></div>
          <div class="w-full h-full flex justify-end items-center absolute inset-0">
            <div class="relative w-96 rounded px-2 py-10 mr-40 bg-white ring-8 ring-gray-200 transform -translate-y-1/4">
              <header class="flex justify-center items-center">
                <img class="w-10 mr-4" src={logo} alt="Logo" />
                <h1 class="text-3xl">Zhen Admin</h1>
              </header>
              <a-form
                class="m-auto mt-10 w-4/5"
                wrapperCol={wrapperCol}
                model={formData}
                rules={rules}
                ref={formRef}
              >
                <a-form-item name="account">
                  <a-input
                    v-model={[formData.account, 'value', ['modifier']]}
                    size="large"
                    placeholder="username"
                  ></a-input>
                </a-form-item>
                <a-form-item name="password">
                  <a-input-password
                    v-model={[formData.password, 'value', ['modifier']]}
                    size="large"
                    visibilityToggle
                    placeholder="password"
                  ></a-input-password>
                </a-form-item>
                <a-row>
                  <a-col span={12}>
                    <a-form-item>
                      <a-checkbox
                        v-model={[autoLogoin, 'value', ['modifier']]}
                        size="small"
                      >
                        自动登录
                      </a-checkbox>
                    </a-form-item>
                  </a-col>
                  <a-col span={12} class="text-right">
                    <a-form-item>
                      <a-button type="link" size="small">
                        忘记密码
                      </a-button>
                    </a-form-item>
                  </a-col>
                </a-row>
                <a-form-item>
                  <a-button
                    type="primary"
                    size="large"
                    block={true}
                    loading={formLoading.value}
                    onClick={handleLogin}
                  >
                    登录
                  </a-button>
                </a-form-item>
              </a-form>
            </div>
          </div>
        </div>
      );
    };
  },
});
