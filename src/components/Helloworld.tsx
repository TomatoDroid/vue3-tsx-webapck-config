import { defineComponent, PropType } from 'vue';
import styles from './Helloworld.module.less';

export default defineComponent({
  name: 'Helloworld',
  props: {
    msg: {
      type: String as PropType<string>,
    },
  },
  setup(props) {
    return () => {
      return <div class={(styles.red, styles.someClass)}>{props.msg}</div>;
    };
  },
});
