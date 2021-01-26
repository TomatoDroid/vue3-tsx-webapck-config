import { Menu } from 'ant-design-vue';
import { defineComponent, reactive, toRaw, watchEffect } from 'vue';

import { syncRoutes } from '@/routes/router';
import { AppRouteRecordRaw } from '@/routes/types';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'SimpleMenu',
  setup() {
    const recursionJionMenuPath = (
      menu: AppRouteRecordRaw,
      parentPath = ''
    ) => {
      parentPath = parentPath ? `${parentPath}/${menu.path}` : menu.path;
      if (menu.children) {
        menu.children.forEach((child) => {
          recursionJionMenuPath(child, parentPath);
        });
      }
      menu.path = parentPath;
      return menu;
    };

    const menus = syncRoutes.map((route) => recursionJionMenuPath(route));
    const rootSubmenuKeys = syncRoutes.map((route) => route.path);

    const menuData: { openKeys: string[]; selectedKeys: string[] } = reactive({
      openKeys: [],
      selectedKeys: [],
    });

    const onOpenChange = (openKeys: string[]) => {
      const a = toRaw(menuData.openKeys);
      debugger;
      const latestOpenKey = openKeys.find((key) => {
        return menuData.openKeys.indexOf(key) === -1;
      });
      if (!latestOpenKey || rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        menuData.openKeys = openKeys;
      } else {
        menuData.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    };

    watchEffect(() => {
      const { path, matched } = useRoute();
      const parentKeys = matched.map((item) => item.path);
      menuData.openKeys = parentKeys;
      menuData.selectedKeys = [path];
    });

    const recursionRenderSubMenu = (menus: AppRouteRecordRaw[]) => {
      return menus.map((menu) => {
        if (!menu.children) {
          return <Menu.Item key={menu.path}>{menu.meta.title}</Menu.Item>;
        } else {
          return (
            <Menu.SubMenu key={menu.path}>
              {{
                title: () => <span>{menu.meta.title}</span>,
                default: () =>
                  menu.children && recursionRenderSubMenu(menu.children),
              }}
            </Menu.SubMenu>
          );
        }
      });
    };

    return () => {
      return (
        <Menu
          theme="dark"
          mode="inline"
          openKeys={menuData.openKeys}
          v-model={[menuData.selectedKeys, 'selectedKeys', ['modifier']]}
          onOpenChange={onOpenChange}
          // onClick={onClick}
        >
          {recursionRenderSubMenu(menus)}
        </Menu>
      );
    };
  },
});
