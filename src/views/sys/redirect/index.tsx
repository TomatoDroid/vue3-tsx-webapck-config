import { defineComponent, unref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'redirectPage',
  setup() {
    const { replace, currentRoute } = useRouter();
    const {
      params: { path },
      query,
    } = unref(currentRoute);

    const _path = Array.isArray(path) ? path.join('/') : path;

    replace({
      path: `/${_path}`,
      query,
    });
    return () => <div></div>;
  },
});
