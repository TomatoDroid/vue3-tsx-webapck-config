import type { StorePropType } from '@/store/index';

import { computed, defineComponent } from 'vue';
import { Layout } from 'ant-design-vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'LayoutMultipleHeader',
  setup() {
    const store = useStore<StorePropType>();
    const collapsedRef = computed(() => store.state.collapsed);

    const onClick = () => {
      store.commit('toggleCollapsed');
    };

    return () => (
      <Layout.Header class="bg-green-200 p-0 flex" style="height:80px">
        <span
          class="cursor-pointer flex h-full items-center"
          style="padding: 1px 10px 0 16px"
          onClick={onClick}
        >
          {collapsedRef.value ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </span>
        header
      </Layout.Header>
    );
  },
});
