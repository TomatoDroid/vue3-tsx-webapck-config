import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Menu111',
  setup() {
    return () => (
      <div class="p-5">
        多层级缓存-页面1-1-1
        <br />
        <input></input>
      </div>
    );
  },
});
