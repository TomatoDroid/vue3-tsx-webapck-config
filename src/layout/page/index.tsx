import { defineComponent, KeepAlive } from 'vue';
import { RouterView } from 'vue-router';
import { useCache } from './useCache';

export const renderRouterView = (getCaches: string[]) => (
  <div>
    <RouterView>
      {{
        default: ({ Component, route }: any) => (
          <KeepAlive include={getCaches}>
            {/* jsx写法没有动态组件<component is={} /> */}
            <Component />
          </KeepAlive>
        ),
      }}
    </RouterView>
  </div>
);

export default defineComponent({
  name: 'PageLayout',
  setup() {
    const { getCaches } = useCache(true);
    return {
      getCaches,
    };
  },
  render() {
    return renderRouterView(this.getCaches);
  },
});
