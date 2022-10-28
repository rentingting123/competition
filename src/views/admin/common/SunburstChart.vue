<template>
  <div style="width: 98%; height: 660px">
    <div
      class="chart-elem"
      :class="className"
      :style="{ height: height, width: width }"
    />
  </div>
</template>

<script>
// 按需引入 引入 ECharts 主模块
var echarts = require("echarts/lib/echarts");
// 引入柱状图
require("echarts/lib/chart/bar");
// 引入提示框和标题组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
// import chartResize from './mixins/chart-resize'
import { saveDivImg } from "@/utils/util";
var data = [
  {
    name: 'Grandpa',
    children: [
      {
        name: 'Uncle Leo',
        value: 15,
        children: [
          {
            name: 'Cousin Jack',
            value: 2
          },
          {
            name: 'Cousin Mary',
            value: 5,
            children: [
              {
                name: 'Jackson',
                value: 2
              }
            ]
          },
          {
            name: 'Cousin Ben',
            value: 4
          }
        ]
      },
      {
        name: 'Father',
        value: 10,
        children: [
          {
            name: 'Me',
            value: 5
          },
          {
            name: 'Brother Peter',
            value: 1
          }
        ]
      }
    ]
  },
  {
    name: 'Nancy',
    children: [
      {
        name: 'Uncle Nike',
        children: [
          {
            name: 'Cousin Betty',
            value: 1
          },
          {
            name: 'Cousin Jenny',
            value: 2
          }
        ]
      }
    ]
  }
];
export default {
  //   mixins:[chartResize],
  props: {
    titletext: {
      type: String,
      required: false,
    },
    title1: {
      type: String,
      required: false,
    },
    title2: {
      type: String,
      required: false,
    },
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "100%",
    },
    // 父组件传递过来的图表数据
    chartData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // Echarts实例
      chart: null,
    };
  },
  watch: {
    /* 如果图表数据是后台获取的，监听父组件中的数据变化，重新触发Echarts */
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    /* 图表初始化 */
    this.$nextTick(() => {
      this.initChart();
    });
    // console.log('sunburst',this.chartData);

  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    /* 释放图表实例 */
    this.chart.dispose();
    /* dispose 会释放内部占用的一些资源和事件绑定，但是解除实例的引用我们是做不到的，所以需要重新赋值为null */
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(
        this.$el.getElementsByClassName("chart-elem")[0]
      );
      this.setOptions(this.chartData);
    },
    setOptions({ data1 } = {}) {
      this.chart.setOption({
        xAxis:[

        ],
        series: {
          // left:"center",
          type: "sunburst",
          // emphasis: {
          //     focus: 'ancestor'
          // },
          data: data1,
          radius: [0, "100%"],
          label: {
            rotate: "radial",
            normal:{
               text:10
            },

          },

        },

        title1: {
          textStyle: {
            width: 500,
            // overflow:hidden,
          },
        },
      });
    },
    saveImg() {
      saveDivImg(this.chart);
    },
  },
};
</script>
<style scoped>

</style>
