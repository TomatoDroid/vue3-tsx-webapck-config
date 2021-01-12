import { defineComponent, ref } from 'vue';

export default defineComponent({
  setup() {
    const number = ref(0);
    const upClick = (): number => number.value++;
    const downClick = (): number => number.value--;
    return () => {
      return (
        <div>
          <h1>{number.value}</h1>
          <button onClick={upClick}>+</button>
          <button onClick={downClick}>-</button>
        </div>
      );
    };
  },
});
