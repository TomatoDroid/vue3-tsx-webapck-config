import { defineComponent, ref } from 'vue';
import {
  InfoCircleOutlined,
  DownOutlined,
  UpOutlined,
} from '@ant-design/icons-vue';
import { Skeleton, Tooltip } from 'ant-design-vue';

export default defineComponent({
  name: 'CollapseContainer',
  props: {
    title: {
      type: String,
      default: '',
    },
    canExpen: {
      type: Boolean,
      default: true,
    },
    helpMessage: {
      type: String,
      default: '',
    },
    laoding: String,
    // TODO
  },
  setup() {
    const showRef = ref(true);
    const triggerExpend = () => {
      showRef.value = !showRef.value;
    };
    return {
      showRef,
      triggerExpend,
    };
  },
  render() {
    return (
      <div class="bg-white shadow-sm rounded p-3 w-full">
        <div class="flex justify-between">
          <div class="flex items-center">
            <span class="text-base font-bold text-black ml-2 select-none">
              {this.title}
            </span>
            {this.helpMessage && (
              <span class="ml-2 flex items-center text-gray-500">
                <Tooltip placement="right">
                  {{
                    default: () => <InfoCircleOutlined></InfoCircleOutlined>,
                    title: () => this.helpMessage,
                  }}
                </Tooltip>
              </span>
            )}
          </div>
          {this.canExpen && (
            <div class="cursor-pointer" onClick={this.triggerExpend}>
              {this.showRef ? <UpOutlined /> : <DownOutlined />}
            </div>
          )}
        </div>
        <div>
          {this.laoding ? (
            <Skeleton></Skeleton>
          ) : (
            this.showRef && this.$slots.default && this.$slots.default()
          )}
        </div>
      </div>
    );
  },
});
