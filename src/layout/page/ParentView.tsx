import { defineComponent } from 'vue';
import { renderRouterView } from './index';
import { useCache } from './useCache';

export default defineComponent({
  setup() {
    const { getCaches } = useCache(false);
    return {
      getCaches,
    };
  },
  render() {
    return renderRouterView(this.getCaches);
  },
});
