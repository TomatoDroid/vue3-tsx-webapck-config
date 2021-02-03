import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
  name: 'FlatList',
  setup() {
    return () => (
      <>
        <h1>List</h1>
        <RouterView></RouterView>
      </>
    );
  },
});
