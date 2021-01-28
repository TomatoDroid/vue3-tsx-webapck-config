import { computed, CSSProperties, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Icon',
  props: {
    icon: String as PropType<string>,
    color: String as PropType<string>,
    size: {
      type: [String, Number] as PropType<string | number>,
      default: 16,
    },
  },
  setup(props) {
    const getWrapperStyle = computed(
      (): CSSProperties => {
        const { color, size } = props;
        return {
          color,
          fontSize: `${size}px`,
          display: 'inline-block',
        };
      }
    );
    return {
      getWrapperStyle,
    };
  },
  render() {
    return (
      // anticon为了解决收缩菜单自定义菜单的title不收缩的问题
      <span class="anticon">
        <span
          class="iconify-inline"
          data-icon={this.icon}
          style={this.getWrapperStyle}
        ></span>
      </span>
    );
  },
});
