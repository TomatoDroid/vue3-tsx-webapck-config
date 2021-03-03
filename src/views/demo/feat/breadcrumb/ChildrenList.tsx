import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

export default defineComponent({
  name: 'BreadcrumbChildren',
  setup() {
    return () => (
      <>
        <h1>ChildrenList</h1>
        <input type="text"/>
        <RouterLink to="/feat/breadcrumb/children/childrenDetail">
          详情
        </RouterLink>
      </>
    );
  },
});
