import { Layout } from 'ant-design-vue';
import { defineComponent, Ref, ref } from 'vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import SimpleMenu from './SimpleMenu';
import logo from '@/assets/images/logo.png';

export default defineComponent({
  name: '',
  setup() {
    const collapsedRef: Ref = ref(false);
    const siderStyle = {
      background: '#001529',
    };

    const renderHeader = () => {
      return (
        <div
          style="height: 48px; padding:10px;"
          class="flex items-center cursor-pointer"
        >
          <img src={logo} style="height:32px; width:32px;"></img>
          <div class="text-sm pl-4" style="color: #fff">
            Zhen Admin
          </div>
        </div>
      );
    };
    return () => {
      return (
        <Layout class="h-full">
          <Layout.Sider
            style={siderStyle}
            v-model={[collapsedRef.value, 'collapsed', ['modifier']]}
            collapsedWidth={80}
            collapsed={true}
            trigger={null}
            width={230}
            class="h-full flex flex-col"
          >
            {renderHeader()}
            <SimpleMenu style="height: 'calc(100% - 48px)'"></SimpleMenu>
          </Layout.Sider>
          <Layout class="h-full">
            <Layout.Header class="bg-green-200 p-0 flex" style="height:80px">
              <span
                class="cursor-pointer flex h-full items-center"
                style="padding: 1px 10px 0 16px"
                onClick={() => (collapsedRef.value = !collapsedRef.value)}
              >
                {collapsedRef.value ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )}
              </span>
              header
            </Layout.Header>
            <Layout.Content>content</Layout.Content>
            <Layout.Footer>footer</Layout.Footer>
          </Layout>
        </Layout>
      );
    };
  },
});
