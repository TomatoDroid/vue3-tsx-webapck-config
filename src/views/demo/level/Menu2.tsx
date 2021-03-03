import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Menu2',
  setup() {
    return () => (
      <div class="p-5">
        多层级缓存-页面2
        <br />
        <input></input>
      </div>
    );
  },
});
