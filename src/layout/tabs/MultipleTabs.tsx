import { defineComponent, ref } from 'vue';
import { Tabs } from 'ant-design-vue';
import './index.less';

export default defineComponent({
  name: 'MultipleTabs',
  setup() {
    const panes = [
      { title: '首页', content: 'Content of Tab 1', key: '1' },
      { title: '工作台', content: 'Content of Tab 2', key: '2' },
    ];
    const activeKeyRef = ref('1');

    return () => (
      <div class="multiple-tabs">
        <Tabs
          type="editable-card"
          size="small"
          hideAdd={true}
          animated={false}
          tabBarGutter={3}
          v-model={[activeKeyRef.value, 'activeKey', ['modifier']]}
        >
          {panes.map((item) => (
            <Tabs.TabPane key={item.key}>
              {{
                tab: () => <span style="font-size:12px">{item.title}</span>,
              }}
            </Tabs.TabPane>
          ))}
        </Tabs>
      </div>
    );
  },
});
