import type { AppRouteRecordRaw } from '@/routes/types';
import { defineComponent, PropType, render } from 'vue';
import { Menu } from 'ant-design-vue';

export default defineComponent({
  name: 'SimpleMenuSub',
  props: {
    item: {
      type: Object as PropType<AppRouteRecordRaw>,
      required: true,
    },
  },
  setup(props) {
    const { item } = props;

    return () => {
      const renderMenuSub = (item: AppRouteRecordRaw) => {
        if (!item.children) {
          return (
            <Menu.Item key={item.path}>
              <span>{item.meta.title}</span>
            </Menu.Item>
          );
        } else {
          return (
            <Menu.SubMenu key={item.path}>
              {{
                title: () => <span>{item.meta.title}</span>,
                default: () =>
                  item.children?.map((child) => renderMenuSub(child)),
              }}
            </Menu.SubMenu>
          );
        }
      };

      return renderMenuSub(item);
    };
  },
});
