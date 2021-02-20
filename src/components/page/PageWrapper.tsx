import { PageHeaderProps } from 'ant-design-vue/lib/page-header/index';
import { PageHeader, Button } from 'ant-design-vue';
import { computed, CSSProperties, defineComponent, PropType } from 'vue';
import { omit } from 'lodash';

const PageWrapperProps = Object.assign(
  {
    dense: Boolean as PropType<boolean>,
    ghost: Boolean as PropType<boolean>,
    content: String as PropType<string>,
    contentStyle: {
      type: Object as PropType<CSSProperties>,
    },
    contentBackground: Boolean as PropType<boolean>,
  },
  PageHeaderProps
);

export default defineComponent({
  name: 'PageWrapper',
  props: PageWrapperProps,
  setup(props, { slots, attrs }) {
    const getHeaderSlots = computed(() => {
      return Object.keys(
        omit(slots, 'default', 'leftFooter', 'rightFooter', 'headerContent')
      );
    });

    // 构建pageHeader插槽对象
    const pageHeaderSlots = () => {
      const slotsObj: any = {};
      if (props.content) {
        slotsObj.default = () => <div>{props.content}</div>;
      } else {
        slotsObj.default = () => slots.headerContent && slots.headerContent();
      }
      getHeaderSlots.value.forEach((slot) => {
        slotsObj[slot] = () => slots[slot]();
      });
      return slotsObj;
    };

    return () => (
      <div>
        <PageHeader {...props} {...attrs}>
          {pageHeaderSlots()}
        </PageHeader>
        <div class={`${props.dense ? 'm-0' : 'm-5'} bg-white p-5`}>
          {slots.default && slots.default()}
        </div>
      </div>
    );
  },
});
