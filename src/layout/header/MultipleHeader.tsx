import { RouteLocationMatched, RouterLink } from 'vue-router';

import { computed, defineComponent, ref, toRefs, watchEffect } from 'vue';
import { Breadcrumb, Layout } from 'ant-design-vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { appStore } from '@/store/modules/app';
import { useRoute } from 'vue-router';
import useMenus from '@/hooks/useMenus';
import { REDIRECT_NAME, syncRoutes } from '@/routes/router';
import { cloneDeep } from 'lodash';
import { AppRouteRecordRaw } from '@/routes/types';
import UserDropDown from './userDropDown';
import MultipleTabs from '../tabs/MultipleTabs';
import FullScreen from './FullScreen';

export default defineComponent({
  name: 'LayoutMultipleHeader',
  setup() {
    const collapsedRef = computed(() => appStore.collapsed);

    const onClick = () => {
      appStore.commitToggleCollapsed();
    };

    const { menus } = useMenus(cloneDeep(syncRoutes));
    const { matched, name } = toRefs(useRoute());
    const routes = ref<RouteLocationMatched[]>([]);

    watchEffect(() => {
      /**
       * 广搜目标路径的菜单路径
       * @param menu
       * @param targetPath
       */
      const findMenuPathByBFS = (
        menu: AppRouteRecordRaw,
        targetPath: string
      ): AppRouteRecordRaw[] => {
        const res = [];
        const stack: AppRouteRecordRaw[] = [menu];
        while (stack.length) {
          const node = stack.pop()!;
          if (targetPath.includes(node.path)) {
            res.push(node);
          }
          if (node.children) {
            stack.push(...node.children);
          }
        }
        return res;
      };

      if (name.value === REDIRECT_NAME) return;

      const lastMatched = matched.value[matched.value.length - 1];
      const { meta, path } = lastMatched;
      const { currentActiveMenu } = meta;
      // 获取当前页面对应的菜单
      const currentMenu = menus.find((menu) => path.includes(menu.path))!;

      const breadcrumbList = findMenuPathByBFS(currentMenu, path);
      if (currentActiveMenu) {
        breadcrumbList.push(lastMatched as any);
      }
      routes.value = breadcrumbList as any;
    });

    return () => (
      <Layout.Header class="bg-white p-0 flex flex-col" style="height:80px">
        <header
          class="flex justify-between items-center border-b w-full"
          style="height:48px"
        >
          <div class="flex items-center">
            <span
              class="cursor-pointer flex h-full items-center px-3 text-base"
              onClick={onClick}
            >
              {collapsedRef.value ? (
                <MenuUnfoldOutlined />
              ) : (
                <MenuFoldOutlined />
              )}
            </span>
            <Breadcrumb routes={routes.value as any}>
              {{
                itemRender: ({ route, routes, paths }: any) =>
                  routes.indexOf(route) === routes.length - 1 ? (
                    <span>{route.meta.title}</span>
                  ) : (
                    <RouterLink to={route.path}>{route.meta.title}</RouterLink>
                  ),
              }}
            </Breadcrumb>
          </div>
          <div class="flex items-center h-full">
            <FullScreen></FullScreen>
            <UserDropDown></UserDropDown>
          </div>
        </header>
        <MultipleTabs></MultipleTabs>
      </Layout.Header>
    );
  },
});
