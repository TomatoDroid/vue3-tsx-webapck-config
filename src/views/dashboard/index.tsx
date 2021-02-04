import { defineComponent, ref } from 'vue';
import CountTo from '@/components/countTo';
import { Button } from 'ant-design-vue';

export default defineComponent({
  name: 'DashboardPage',
  setup() {
    const countRef = ref('');

    const reset = () => {
      countRef.value.reset();
    };
    const pause = () => {
      countRef.value.pause();
    };

    const resume = () => {
      countRef.value.resume();
    };
    const start = () => {
      countRef.value.start();
    };
    const endVal = ref(10000000000);
    const change = () => {
      endVal.value = 999999;
    };
    return {
      endVal,
      countRef,
      start,
      reset,
      pause,
      resume,
      change,
    };
  },
  render() {
    return (
      <>
        <CountTo
          endVal={this.endVal}
          startVal={0}
          ref={this.countRef}
        ></CountTo>
        <p>
          <Button onClick={this.start}>start</Button>
          <Button onClick={this.reset}>reset</Button>
          <Button onClick={this.pause}>pause</Button>
          <Button onClick={this.resume}>resume</Button>
          <Button onClick={this.change}>改变值</Button>
        </p>
      </>
    );
  },
});
