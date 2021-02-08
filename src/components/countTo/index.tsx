import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  reactive,
  toRef,
  watch,
} from 'vue';

export default defineComponent({
  name: 'CountTo',
  props: {
    startVal: {
      type: Number,
      default: 1,
    },
    endVal: {
      type: Number,
      default: 2021,
    },
    duration: {
      type: Number,
      default: 1300,
    },
    autoPlay: {
      type: Boolean,
      default: true,
    },
    decimals: {
      type: Number,
      required: true,
      default: 0,
      validate: (value: number) => value >= 0,
    },
    decimal: {
      type: String,
      default: '.',
    },
    separator: {
      type: String,
      default: ',',
    },
    prefix: {
      type: String,
      default: '￥',
    },
    suffix: {
      type: String,
      default: '',
    },
    useEasing: {
      type: Boolean,
      default: true,
    },
    easingFu: {
      type: Function as PropType<
        (t: number, b: number, c: number, d: number) => number
      >,
      default: (t: number, b: number, c: number, d: number) => {
        return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
      },
    },
  },
  emits: ['mounted', 'callback'],
  setup(props, { emit }) {
    const state = reactive<{
      localStartVal: number;
      printVal: number | null;
      displayVal: string;
      paused: boolean;
      localDuration: number;
      startTime: number | null;
      timestamp: number | null;
      remaining: number | null;
      rAF: any;
    }>({
      localStartVal: props.startVal,
      displayVal: formatNumber(props.startVal),
      printVal: null,
      paused: false,
      localDuration: props.duration,
      startTime: null,
      timestamp: null,
      remaining: null,
      rAF: null,
    });

    onMounted(() => {
      if (props.autoPlay) {
        start();
        emit('mounted');
      }
    });

    const getCountDown = computed(() => props.startVal > props.endVal);

    watch([() => props.startVal, () => props.endVal], () => {
      if (props.autoPlay) {
        start();
      }
    });

    function start() {
      const { startVal, duration } = props;
      state.localStartVal = startVal;
      state.localDuration = duration;
      state.paused = false;
      state.rAF = requestAnimationFrame(count);
    }

    function pauseResume() {
      if (state.paused) {
        resume();
        state.paused = false;
      } else {
        pause();
        state.paused = true;
      }
    }
    function pause() {
      state.rAF && cancelAnimationFrame(state.rAF);
    }
    function resume() {
      state.startTime = null;
      state.localDuration = +(state.remaining as number);
      state.localStartVal = +(state.printVal as number);
      state.rAF = requestAnimationFrame(count);
    }
    function reset() {
      state.startTime = null;
      state.rAF && cancelAnimationFrame(state.rAF);
      state.displayVal = formatNumber(props.startVal);
    }

    function count(timestamp: number) {
      const { endVal, useEasing, easingFu } = props;
      !state.startTime && (state.startTime = timestamp);
      state.timestamp = timestamp;
      const progress = timestamp - state.startTime;
      state.remaining = state.localDuration - progress;

      if (useEasing) {
        if (getCountDown.value) {
          state.printVal =
            state.localStartVal -
            easingFu(
              progress,
              0,
              state.localStartVal - endVal,
              state.localDuration
            );
        } else {
          state.printVal = easingFu(
            progress,
            state.localStartVal,
            endVal - state.localStartVal,
            state.localDuration
          );
        }
      } else {
        if (getCountDown.value) {
          state.printVal =
            state.localStartVal -
            (state.localStartVal - endVal) * (progress / state.localDuration);
        } else {
          state.printVal =
            state.localStartVal +
            (endVal - state.localStartVal) * (progress / state.localDuration);
        }
      }

      if (getCountDown.value) {
        state.printVal = state.printVal < endVal ? endVal : state.printVal;
      } else {
        state.printVal = state.printVal > endVal ? endVal : state.printVal;
      }

      state.displayVal = formatNumber(state.printVal);

      if (progress < state.localDuration) {
        state.rAF = requestAnimationFrame(count);
      } else {
        emit('callback');
      }
    }

    function formatNumber(num: number | string): string {
      const { prefix, suffix, decimals, decimal, separator } = props;
      num = Number(num).toFixed(decimals);
      const x = num.split('.');
      let x1 = x[0];
      let x2 = x.length > 1 ? decimal + x[1] : '';
      const reg = /(\d+)(\d{3})/;
      while (reg.test(x1)) {
        x1 = x1.replace(reg, `$1${separator}$2`);
      }
      return prefix + x1 + x2 + suffix;
    }

    return {
      start,
      pause,
      resume,
      reset,
      pauseResume,
      displayVal: toRef(state, 'displayVal'),
    };
  },
  render() {
    return <h1>{this.displayVal}</h1>;
  },
});
