import { defineComponent, onMounted, ref } from 'vue';
import { Pie, measureTextWidth, PieOptions } from '@antv/g2plot';
import { basicProps } from './props';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];

function renderStatistic(containerWidth: any, text: any, style: any) {
  const { width: textWidth, height: textHeight } = measureTextWidth(
    text,
    style
  );
  const R = containerWidth / 2;
  // r^2 = (w / 2)^2 + (h - offsetY)^2
  let scale = 1;
  if (containerWidth < textWidth) {
    scale = Math.min(
      Math.sqrt(
        Math.abs(
          Math.pow(R, 2) /
            (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
        )
      ),
      1
    );
  }
  const textStyleStr = `width:${containerWidth}px;`;
  return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
    scale < 1 ? 1 : 'inherit'
  };">${text}</div>`;
}

export default defineComponent({
  name: 'AnalysisPie',
  props: basicProps,
  setup(props) {
    const domRef = ref();

    onMounted(() => {
      const piePlot = new Pie(domRef.value, {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        meta: {
          value: {
            formatter: (v) => `${v} ¥`,
          },
        },
        label: {
          type: 'inner',
          offset: '-50%',
          style: {
            textAlign: 'center',
          },
          autoRotate: false,
          content: '{value}',
        },
        // 添加 中心统计文本 交互
        interactions: [
          { type: 'element-selected' },
          { type: 'element-active' },
          { type: 'pie-statistic-active' },
        ],
        statistic: {
          title: {
            offsetY: -4,
            customHtml: (container, view, datum) => {
              const { width, height } = container.getBoundingClientRect();
              const d = Math.sqrt(
                Math.pow(width / 2, 2) + Math.pow(height / 2, 2)
              );
              const text = datum ? datum.type : '总计';
              return renderStatistic(d, text, { fontSize: 28 });
            },
          },
          content: {
            offsetY: 4,
            style: {
              fontSize: '32px',
            },
            customHtml: (container, view, datum, data) => {
              const { width } = container.getBoundingClientRect();

              const text = datum
                ? `¥ ${datum.value}`
                : `¥ ${data.reduce((r, d) => r + d.value, 0)}`;
              return renderStatistic(width, text, { fontSize: 32 });
            },
          },
        },
      } as PieOptions);

      piePlot.render();
    });

    return () => (
      <div
        ref={domRef}
        style={`width:${props.width}; height:${props.height}`}
      ></div>
    );
  },
});