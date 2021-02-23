import { Tooltip } from 'ant-design-vue';
import { computed, defineComponent, ref } from 'vue';
import {
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons-vue';
import { useFullScreen } from '@/hooks/web/useFullScreen';

export default defineComponent({
  name: 'FullScreen',
  setup() {
    const { toggleFullScreen, isFullScreenRef } = useFullScreen();

    const getTitle = computed(() =>
      isFullScreenRef.value ? '退出全屏' : '全屏'
    );

    return () => (
      <Tooltip title={getTitle.value} placement="bottom" mouseEnterDelay={0.5}>
        <span
          onClick={toggleFullScreen}
          class="cursor-pointer h-full flex items-center justify-center w-8 hover:bg-gray-100"
        >
          {isFullScreenRef.value ? (
            <FullscreenExitOutlined />
          ) : (
            <FullscreenOutlined />
          )}
        </span>
      </Tooltip>
    );
  },
});
