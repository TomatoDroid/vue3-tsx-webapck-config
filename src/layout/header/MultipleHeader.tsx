// import type { GlobalStorePropType } from '@/store/index';
import { RouteLocationMatched, RouterLink } from 'vue-router';

import {
  computed,
  defineComponent,
  onMounted,
  ref,
  toRaw,
  toRefs,
  watchEffect,
} from 'vue';
import { Breadcrumb, Layout } from 'ant-design-vue';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
import { useStore } from '@/store/index';
import { useRoute } from 'vue-router';
import useMenus from '@/hooks/useMenus';
import { syncRoutes } from '@/routes/router';
import { cloneDeep } from 'lodash';
import { AppRouteRecordRaw } from '@/routes/types';
import UserDropDown from './userDropDown';
import MultipleTabs from '../tabs/MultipleTabs';

export default defineComponent({
  name: 'LayoutMultipleHeader',
  setup() {
    const store = useStore();
    const collapsedRef = computed(() => store.state.collapsed);

    const tabsStateRef = computed(() => store.state.tab.tabsState);

    onMounted(() => {
      console.log('tabsStateRef', toRaw(tabsStateRef.value));
    });

    const onClick = () => {
      store.commit('toggleCollapsed');
    };

    const { menus } = useMenus(cloneDeep(syncRoutes));
    const { matched } = toRefs(useRoute());
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

      const lastMatched = matched.value[matched.value.length - 1];
      // 获取当前页面对应的菜单
      const currentMenu = menus.find((menu) =>
        lastMatched.path.includes(menu.path)
      )!;

      const breadcrumbList = findMenuPathByBFS(currentMenu, lastMatched.path);
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
            <UserDropDown></UserDropDown>
          </div>
        </header>
        <MultipleTabs></MultipleTabs>
      </Layout.Header>
    );
  },
});
