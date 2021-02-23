import { computed, defineComponent, ref, watchEffect } from 'vue';
import { Tabs } from 'ant-design-vue';
import './index.less';
import { tabStore } from '@/store/modules/tab';
import { useRouter } from 'vue-router';
import TabRedo from './components/TabRedo';

export default defineComponent({
  name: 'MultipleTabs',
  setup() {
    const getTabsStateRef = computed(() => tabStore.getTabsState);

    const activeKeyRef = computed(() => tabStore.tabActiveKey);

    const router = useRouter();

    const handleEdit = (targetKey: string) => {
      tabStore.closeTabByKeyAction(targetKey);
    };

    const handleChange = (activeKey: string) => {
      tabStore.commitSetActiveKey(activeKey);
      router.push({ path: activeKey });
    };

    return () => (
      <div class="multiple-tabs">
        <Tabs
          type="editable-card"
          size="small"
          hideAdd={true}
          animated={false}
          tabBarGutter={3}
          activeKey={activeKeyRef.value}
          onEdit={handleEdit as any}
          onChange={handleChange}
        >
          {{
            default: () =>
              getTabsStateRef.value.map((item) => (
                <Tabs.TabPane
                  key={item.path}
                  closable={!(item.meta && item.meta.affix)}
                >
                  {{
                    tab: () => (
                      <span style="font-size:12px">{item.meta.title}</span>
                    ),
                  }}
                </Tabs.TabPane>
              )),
            tabBarExtraContent: () => <TabRedo></TabRedo>,
          }}
        </Tabs>
      </div>
    );
  },
});
