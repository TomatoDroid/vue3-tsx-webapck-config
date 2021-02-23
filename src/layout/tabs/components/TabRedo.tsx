import { useRedo } from '@/hooks/web/usePage';
import { RedoOutlined } from '@ant-design/icons-vue';
import { Tooltip } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TabRedo',
  setup() {
    const handleRedo = async () => {
      loadingRef.value = true;
      await useRedo();
      loadingRef.value = false;
    };

    const loadingRef = ref(false);

    return () => (
      <Tooltip title="刷新" placement="bottom" mouseEnterDelay={0.5}>
        <span
          class="inline-block text-center border-l border-solid border-gray-300 text-gray-400 cursor-pointer text-base leading-4 hover:text-gray-600"
          style="width:36px"
          onClick={handleRedo}
        >
          <RedoOutlined spin={loadingRef.value} />
        </span>
      </Tooltip>
    );
  },
});
