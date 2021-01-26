import { Menu } from 'ant-design-vue';
import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRaw,
  unref,
  watchEffect,
} from 'vue';

interface MenusDataType {
  openKeys: string[];
  selectedKeys: string[];
}

export default defineComponent({
  name: 'test',
  setup() {
    const menuData: MenusDataType = reactive({
      openKeys: [],
      selectedKeys: [],
    });

    const onOpenChange = (openKeys: string[]) => {
      menuData.openKeys = openKeys;
    };

    watchEffect(() => {
      console.log('openKeys', toRaw(menuData.openKeys));
      console.log('selectedKeys', toRaw(menuData.selectedKeys));
    });

    return () => (
      <div class="w-2/4">
        <Menu
          theme="dark"
          mode="inline"
          openKeys={menuData.openKeys}
          v-models={[
            [menuData.openKeys, 'openKeys', 'modifier'],
            [menuData.selectedKeys, 'selectedKeys', 'modifier']
          ]}
          onOpenChange={onOpenChange}
        >
          <Menu.Item key="1">menu1</Menu.Item>
          <Menu.Item key="2">menu2</Menu.Item>
          <Menu.SubMenu key="sub-1" title="sub-1">
            <Menu.Item key="1-1">menu1-1</Menu.Item>
            <Menu.Item key="1-2">menu1-2</Menu.Item>
            <Menu.Item key="1-3">menu1-3</Menu.Item>
          </Menu.SubMenu>
        </Menu>
      </div>
    );
  },
});
