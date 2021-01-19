import { defineComponent, onMounted, ref, toRaw, unref } from 'vue';

export default defineComponent({
  name: 'test',
  setup() {
    const text = ref('123');
    const hRef = ref({});

    // onMounted(() => {
    //   console.log(hRef);
    //   console.log(unref(hRef));
    // });
    const handleClick = () => {
      console.log(hRef);
      console.log(unref(hRef));
    };

    return () => {
      return (
        <>
          <a-input v-model={[text.value, 'value', ['modifier']]}></a-input>
          <h1 ref={hRef}>{text.value}</h1>
          <button onClick={handleClick}>按钮</button>
        </>
      );
    };
  },
});
