import { Button, Dropdown, Menu } from 'ant-design-vue';
import { defineComponent } from 'vue';
import headerImg from '@/assets/images/header.jpg';

export default defineComponent({
  name: 'UserDropDown',
  setup() {
    return () => (
      <Dropdown>
        {{
          overlay: () => (
            <Menu>
              <Menu.Item>退出系统</Menu.Item>
            </Menu>
          ),
          default: () => (
            <span class="flex px-2 cursor-pointer items-center h-full min-w-min">
              <img
                class="w-6 h-6 rounded-full inline-block mr-2"
                src={headerImg}
                alt=""
              />
              <span class="flex">
                <span>Liuzhen</span>
              </span>
            </span>
          ),
        }}
      </Dropdown>
    );
  },
});
