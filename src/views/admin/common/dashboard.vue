<template>
  <div style="width: 100%; height: 860px">
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
    setOptions({ series, data1 } = {}) {
      const gaugeData = [
        {
          value: 20,
          name: "Perfect",
          title: {
            offsetCenter: ["0%", "-30%"],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "-20%"],
          },
        },
        {
          value: 40,
          name: "Good",
          title: {
            offsetCenter: ["0%", "0%"],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "10%"],
          },
        },
        {
          value: 60,
          name: "Commonly",
          title: {
            offsetCenter: ["0%", "30%"],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["0%", "40%"],
          },
        },
        {
          value: 60,
          name: "Co2mmonly",
          title: {
            offsetCenter: ["-45%", "30%"],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["-45%", "40%"],
          },
        },
        {
          value: 60,
          name: "Co2mmonly1",
          title: {
            offsetCenter: ["-45%", "0%"],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["-45%", "10%"],
          },
        },
        {
          value: 60,
          name: "Co2mmonsly1",
          title: {
            offsetCenter: ["-45%", "-30%"],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["-45%", "-20%"],
          },
        },
        {
          value: 60,
          name: "Co2mmons3ly1",
          title: {
            offsetCenter: ["45%", "-30%"],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["45%", "-20%"],
          },
        },
        {
          value: 60,
          name: "Co2smons3ly1",
          title: {
            offsetCenter: ["45%", "0%"],
          },
          detail: {
            valueAnimation: true,
            offsetCenter: ["45%", "10%"],
          },
        },
      ];
      let arr = gaugeData.splice(0, series.length);
      arr.forEach((item, index) => {
        item.name = series[index].name;
        item.value = series[index].value;
      });
      this.chart.setOption({
        series: [
          {
            type: "gauge",
            startAngle: 90,
            endAngle: -270,
            pointer: {
              show: false,
            },
            progress: {
              show: true,
              overlap: false,
              roundCap: true,
              clip: false,
              itemStyle: {
                borderWidth: 1,
                borderColor: "#464646",
              },
            },
            axisLine: {
              lineStyle: {
                width: 40,
              },
            },
            splitLine: {
              show: false,
              distance: 0,
              length: 10,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
              distance: 50,
            },
            data: arr,
            title: {
              fontSize: 14,
            },
            detail: {
              width: 50,
              height: 14,
              fontSize: 14,
              color: "auto",
              borderColor: "auto",
              borderRadius: 20,
              borderWidth: 1,
              formatter: "{value}%",
            },
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
