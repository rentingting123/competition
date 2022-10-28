<template>
  <div style="width: 25%; height: 400px">
    <div
      class="chart-elem"
      :class="className"
      :style="{ height: height, width: width }"
    />
  </div>
</template>

<script>
import * as echarts from "echarts";
// import chartResize from './mixins/chart-resize'
import { saveDivImg } from "@/utils/util";

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
    setOptions(data) {
      data.list.forEach((item) => {
        item.value = item.rate;
      });
      this.chart.setOption({
        color: ["#73a0fa", "#73deb3", "#7585a2", "#f7c739"],
        tooltip: {
          trigger: "item",
        },
        // legend: {
        //   orient: 'vertical',
        //   top: '30%',
        //   right: '0%'
        // },
        graphic: {
          type: "text",
          left: "center",
          top: "center",
          style: {
            fontSize: 12,
            text: data.name,
            textAlign: "center",
            fill: "#000",
            width: 50,
            height: 50,
          },
        },
        series: [
          {
            name: data.name,
            type: "pie",
            radius: ["40%", "60%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: false,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            data: data.list,
          },
        ],
      });
    },
    saveImg() {
      saveDivImg(this.chart);
    },
  },
};
</script>
<style scoped></style>
