import { Line } from '@antv/g2plot';
import { defineComponent, onMounted, ref } from 'vue';
import { basicProps } from './props';

export default defineComponent({
  name: 'AnalysisLine',
  props: basicProps,
  setup(props) {
    const chartRef = ref();
    const data = [
      { year: '一月', value: 10 },
      { year: '二月', value: 20 },
      { year: '三月', value: 30 },
      { year: '四月', value: 40 },
      { year: '五月', value: 50 },
      { year: '六月', value: 60 },
      { year: '七月', value: 70 },
      { year: '八月', value: 80 },
      { year: '九月', value: 90 },
      { year: '十月', value: 100 },
      { year: '十一月', value: 110 },
      { year: '十二月', value: 120 },
    ];

    onMounted(() => {
      const line = new Line(chartRef.value, {
        data,
        xField: 'year',
        yField: 'value',
        // 自定义折线颜色
        color: '#5B8FF9',
        // 更改辅助数据点大小及样式
        point: {
          size: 5,
          shape: 'diamond',
          style: {
            lineWidth: 2,
            fillOpacity: 0.6,
          },
        },
        yAxis: {
          // 格式化 y 轴标签加单位，自定义 labal 样式
          label: {
            formatter: (v) => {
              return v + 'k';
            },
          },
        },
      });
      line.render();
    });

    return () => (
      <div
        ref={chartRef}
        style={`width:${props.width};height:${props.height}`}
      ></div>
    );
  },
});
