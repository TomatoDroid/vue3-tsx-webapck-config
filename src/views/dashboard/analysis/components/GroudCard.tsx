import { Statistic } from 'ant-design-vue';
import CountTo from '@/components/countTo';
import { defineComponent, PropType } from 'vue';
import riseSvg from '@/assets/svg/dashboard/analysis-rise.svg';
import downSvg from '@/assets/svg/dashboard/analysis-down.svg';
import type { GrowCardItem } from '../data';
import './GroudCard.module.less';

export default defineComponent({
  name: 'GroudCard',
  props: {
    info: {
      type: Object as PropType<GrowCardItem>,
      required: true,
    },
  },
  render() {
    return (
      <div class="p-3 container flex flex-col bg-white rounded-sm shadow-sm cursor-pointer">
        <div class="flex justify-between mb-5">
          <div>
            <p class="text-lg text-black text-opacity-80 mb-2 ml-1">
              {this.info.title}
            </p>
            <CountTo
              class="text-3xl"
              endVal={this.info.price}
              startVal={1}
            ></CountTo>
          </div>
          <img src={this.info.icon} alt="" />
        </div>
        <div class={`flex footer ${this.info.up ? 'is-up' : null}`}>
          <Statistic value={this.info.percent}>
            {{
              prefix: () => <img src={this.info.up ? riseSvg : downSvg}></img>,
            }}
          </Statistic>
          <span class="ml-3 text-xs flex items-center text-gray-800">
            {this.info.mom}
          </span>
        </div>
      </div>
    );
  },
});
