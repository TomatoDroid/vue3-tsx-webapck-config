import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  name: 'ChildrenList',
  setup() {
    return () => (
      <>
        <h1>ChildrenList</h1>
        <RouterLink to="/feat/breadcrumb/children/childrenDetail">
          详情
        </RouterLink>
      </>
    );
  },
});
