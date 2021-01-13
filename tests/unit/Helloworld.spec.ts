import { shallowMount } from '@vue/test-utils';
import Helloworld from '@/components/Helloworld';

describe('Helloworld.tsx', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(Helloworld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
