import { defineComponent, ref } from 'vue';
import Helloworld from '@/components/Helloworld';
import global from './global.module.less'

export default defineComponent({
  setup() {
    const number = ref(0);
    const upClick = (): number => number.value++;
    const downClick = (): number => number.value--
    return () => {
      return (
        <div>
          <h1>{number.value}</h1>
          <button onClick={upClick}>+</button>
          <button onClick={downClick}>-</button>
          <div class="global-class-name">global-class-name</div>
          <div class={global.localClassName}>local-class-name</div>
          <Helloworld msg={'知道啥呀'}></Helloworld>
        </div>
      );
    };
  },
});
