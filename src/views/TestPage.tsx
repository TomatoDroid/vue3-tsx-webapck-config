import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'TestPage',
  setup() {
    const route = useRoute();
    return () => <h1>{route.path}</h1>;
  },
});
