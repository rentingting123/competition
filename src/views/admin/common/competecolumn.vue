<template>
  <div class="content1" style="width: 98%">
    <div class="title">
      <div>
        {{ title1 }}
        <span class="small">{{ title2 }}</span>
      </div>
      <div class="pic">
        <div @click="saveImg" style="margin-right: 33px">导出图片</div>
        <!-- <div>下载数据</div> -->
      </div>
    </div>
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
    setOptions({ days, data1, data2, data3, data4 } = {}) {
      const posList = [
        "left",
        "right",
        "top",
        "bottom",
        "inside",
        "insideTop",
        "insideLeft",
        "insideRight",
        "insideBottom",
        "insideTopLeft",
        "insideTopRight",
        "insideBottomLeft",
        "insideBottomRight",
      ];
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        
        legend: {
          data: ["参赛省份", "本科", "高职", "其他"],
        },
        //   toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //       mark: { show: true },
        //       dataView: { show: true, readOnly: false },
        //       magicType: { show: true, type: ['line', 'bar', 'stack'] },
        //       restore: { show: true },
        //       saveAsImage: { show: true }
        //     }
        //   },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: days,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "参赛省份",
            type: "bar",
            barGap: 0,
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              color: "#73a0fb",
            },
            data: data1,
          },
          {
            name: "本科",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              color: "#7685a2",
            },
            data: data2,
          },
          {
            name: "高职",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              color: "#f7c639",
            },
            data: data3,
          },
          {
            name: "其他",
            type: "bar",
            emphasis: {
              focus: "series",
            },
            itemStyle: {
              color: "#ec7e65",
            },
            data: data4,
            
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
<style scoped>
.title .pic {
  font-size: 16px;
  font-weight: 400;
  color: #0078e1;
  display: flex;
  justify-content: space-between;
  margin-right: 15px;
  cursor: pointer;
}
.title {
  width: 100%;
  text-align: left;
  color: black;
  font-size: 16px;
  font-weight: 800;
  position: relative;
  padding-left: 10px;
  display: flex;
  justify-content: space-between;
  letter-spacing: 1px;
}
.title .small {
  font-size: 14px;
  color: #999999;
  display: inline-block;
  margin-left: 20px;
  font-weight: 400;
}
.title::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 2px;
  width: 4px;
  height: 22px;
  background-color: #0078e1;
}
.content1 {
  padding: 15px;
  height: 550px;
  background: #fff;
  margin-bottom: 20px;
}
</style>
