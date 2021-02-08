import {
  defineComponent,
  onMounted,
  reactive,
  ref,
  toRaw,
  unref,
  watchEffect,
} from 'vue';

const obj = { name: 'liuzhen' };
const A = defineComponent({
  name: 'a',
  setup() {
    debugger;
    const r = reactive(obj);

    return () => <h1>a</h1>;
  },
});

export default defineComponent({
  name: 'test',
  setup() {
    return () => [<A></A>, <A></A>];
  },
});
