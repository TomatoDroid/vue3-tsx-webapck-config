import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  name: 'BreadcrumbChildrenDetailDemo',
  setup() {
    return () => (
      <>
        <h1>
          ChildrenListDetail <input type="text" />
        </h1>
        <div>
          <RouterLink to="/feat/breadcrumb/children">返回</RouterLink>
        </div>
      </>
    );
  },
});
