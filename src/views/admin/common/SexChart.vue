<template>
  <div class="content1" style="width: 98%;">
    <div class="title">
      <div>
        {{title1}}
        <span class="small">{{title2}}</span>
      </div>
      <!-- <div class="pic">
        <div @click="saveImg" style="margin-right: 33px;">导出图片</div>
        <div>下载数据</div>
      </div>-->
    </div>
    <div class="chart-elem" :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import * as echarts from 'echarts';
// import chartResize from './mixins/chart-resize'
import { saveDivImg } from '@/utils/util'

export default {
  //   mixins:[chartResize],
  props: {
    titletext: {
      type: String,
      required: false
    },
    title1: {
      type: String,
      required: false
    },
    title2: {
      type: String,
      required: false
    },
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    // 父组件传递过来的图表数据
    chartData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      // Echarts实例
      chart: null
    }
  },
  watch: {
    /* 如果图表数据是后台获取的，监听父组件中的数据变化，重新触发Echarts */
    chartData: {
      deep: true,
      handler (val) {
        this.setOptions(val)
      }
    }
  },
  mounted () {
    /* 图表初始化 */
    this.$nextTick(() => {
      this.initChart()
    })
    // console.log('this.chartData', this.chartData);

  },
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    /* 释放图表实例 */
    this.chart.dispose()
    /* dispose 会释放内部占用的一些资源和事件绑定，但是解除实例的引用我们是做不到的，所以需要重新赋值为null */
    this.chart = null
  },
  methods: {
    initChart () {
      this.chart = echarts.init(this.$el.getElementsByClassName('chart-elem')[0])
      this.setOptions(this.chartData)
    },
    setOptions ({ days, data1, colors, title } = {}) {
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          },
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        color: ["#5B8FF9", "#EB7E65", "#5AD8A6"],
        legend: {
          x: "center",
          y: 20,
          left: 255,
          icon: "pin",
          // orient: "vertical",
          data:days
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        series: [
          {
            name: days,
            type: "pie",
            radius: "55%",
            center: ["42%", "50%"],
            data: [{ value: data1[0] * 1, name: "男" },
            { value: data1[1] * 1, name: "女" },
            { value: data1[2] * 1, name: "保密" }],
            // stack: 'total',
            label: {
              show: false,
              normal:{formatter: "{b} ({d}%)"}
            },
            emphasis: {
              focus: 'series'
            },
            axisStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            axisStyle: {
              normal: {
                label: {
                  show: false,
                  //	                            position:'inside',

                },
              },
              labelLine: { show: true },
              color: ["#5B8FF9", "#EB7E65", "#5AD8A6"],
            },
          },
        ],      })
    },
    saveImg () {
      saveDivImg(this.chart)
    }
  }
}
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
/* .title::before {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 2px;
  width: 4px;
  height: 22px;
  background-color: #0078e1;
} */
.content1 {
  padding: 15px;
  height: 300px;
  background: #fff;
  margin-bottom: 20px;
}
</style>
