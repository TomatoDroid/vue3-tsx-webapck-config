import type { BaseTransitionProps } from 'vue';
import { defineComponent, Transition } from 'vue';
import './ExpandTransition.module.less';
// 过渡类名
const tranClassName = 'expand-transition';

export default defineComponent({
  name: 'ExpandTransition',
  setup(_, { slots }) {
    const props: BaseTransitionProps = {
      onBeforeEnter(el: any) {
        el.classList.add(tranClassName);
        el.style.height = '0';
      },
      onEnter(el) {
        el.style.height = el.scrollHeight + 'px';
        el.style.overflow = 'hidden';
      },
      onAfterEnter(el) {
        el.classList.remove(tranClassName);
        el.style.height = '';
        el.style.overflow = '';
      },
      onBeforeLeave(el) {
        el.classList.add(tranClassName);
        el.style.height = el.scrollHeight + 'px';
        el.style.overflow = 'hidden';
      },
      onLeave(el) {
        el.style.height = 0;
      },
      onAfterLeave(el) {
        el.classList.remove(tranClassName);
        el.style.height = '';
        el.style.overflow = '';
      },
    };
    return () => (
      <Transition {...props}>{slots.default && slots.default()}</Transition>
    );
  },
});
