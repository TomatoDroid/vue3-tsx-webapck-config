import { Layout } from 'ant-design-vue';
import { computed, defineComponent, Ref, ref } from 'vue';
import SimpleMenu from './SimpleMenu';
import logo from '@/assets/images/logo.png';
import { RouterView } from 'vue-router';
import MultipleHeader from './header/MultipleHeader';
import { appStore } from '@/store/modules/app';

export default defineComponent({
  name: '',
  setup() {
    const siderStyle = {
      background: '#001529',
    };

    const collapsedRef = computed(() => appStore.collapsed);

    const renderLogoHeader = () => {
      return (
        <div
          style="height: 48px; padding:10px;"
          class="flex justify-center items-center cursor-pointer"
        >
          <img src={logo} style="height:32px; width:32px;"></img>
          {!collapsedRef.value ? (
            <div class="text-base pl-4" style="color: #fff">
              Zhen Admin
            </div>
          ) : null}
        </div>
      );
    };
    return () => {
      return (
        <Layout class="h-full">
          <Layout.Sider
            style={siderStyle}
            collapsed={collapsedRef.value}
            collapsedWidth={80}
            trigger={null}
            width={230}
            class="h-full flex flex-col"
          >
            {renderLogoHeader()}
            <SimpleMenu style="height: 'calc(100% - 48px)'"></SimpleMenu>
          </Layout.Sider>
          <Layout class="h-full">
            <MultipleHeader></MultipleHeader>
            <Layout.Content>
              <RouterView></RouterView>
            </Layout.Content>
            {/* <Layout.Footer>footer</Layout.Footer> */}
          </Layout>
        </Layout>
      );
    };
  },
});
