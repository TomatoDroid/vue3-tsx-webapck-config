import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Menu12',
  setup() {
    return () => (
      <div class="p-5">
        多层级缓存-页面1-2
        <br />
        <input></input>
      </div>
    );
  },
});
