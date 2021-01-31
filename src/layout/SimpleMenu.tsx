import { Menu } from 'ant-design-vue';
import { computed, defineComponent, reactive, toRaw, watchEffect } from 'vue';
import { syncRoutes } from '@/routes/router';
import { AppRouteRecordRaw } from '@/routes/types';
import { useRoute, useRouter } from 'vue-router';
import Icon from '@/components/icon';
import useMenus from '@/hooks/useMenus';
import { useStore } from '@/store/index';
import _ from 'lodash';

export default defineComponent({
  name: 'SimpleMenu',
  setup() {
    const { menus } = useMenus(_.cloneDeep(syncRoutes));

    const menuData: { openKeys: string[]; selectedKeys: string[] } = reactive({
      openKeys: [],
      selectedKeys: [],
    });

    const rootSubmenuKeys = menus.map((route) => route.path);
    const onOpenChange = (openKeys: string[]) => {
      const latestOpenKey = openKeys.find((key) => {
        return menuData.openKeys.indexOf(key) === -1;
      });
      if (!latestOpenKey || rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        menuData.openKeys = openKeys;
      } else {
        menuData.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };

    const route = useRoute();
    const updateMenuData = () => {
      const { path, matched } = route;
      const parentKeys = matched.map((item) => item.path);
      menuData.openKeys = parentKeys;
      menuData.selectedKeys = [path];
    };
    watchEffect(() => {
      updateMenuData();
    });

    const recursionRenderSubMenu = (menus: AppRouteRecordRaw[]): any => {
      return menus.map((menu) => {
        if (menu.children) {
          return (
            <Menu.SubMenu key={menu.path}>
              {{
                title: () => (
                  <>
                    <Icon icon={menu.meta.icon}></Icon>
                    <span class="ml-2">{menu.meta.title}</span>
                  </>
                ),
                default: () =>
                  menu.children && recursionRenderSubMenu(menu.children),
              }}
            </Menu.SubMenu>
          );
        } else {
          return (
            <Menu.Item key={menu.path}>
              <Icon icon={menu.meta.icon}></Icon>
              <span class="ml-2">{menu.meta.title}</span>
            </Menu.Item>
          );
        }
      });
    };

    const router = useRouter();
    const onClick = ({ key }: { key: string }) => {
      router.push(key);
    };

    const store = useStore();
    const collapsedRef = computed(() => store.state.collapsed);
    watchEffect(() => {
      if (collapsedRef.value) {
        menuData.openKeys = [];
      } else {
        updateMenuData();
      }
    });

    return () => {
      return (
        // TODO 添加scroll
        <Menu
          class="w-full"
          theme="dark"
          mode="inline"
          openKeys={menuData.openKeys}
          v-model={[menuData.selectedKeys, 'selectedKeys', ['modifier']]}
          onOpenChange={onOpenChange}
          onClick={onClick}
          inline-collapsed={collapsedRef.value}
        >
          {recursionRenderSubMenu(menus)}
        </Menu>
      );
    };
  },
});
