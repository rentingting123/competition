<template>
  <div class="content1" style="width: 98%;">
    <div class="title">
      <div>
        {{ title1 }}
        <span class="small">{{ title2 }}</span>
      </div>
      <div class="pic">
        <div @click="saveImg" style="margin-right: 33px;">导出图片</div>
        <!-- <div>下载数据</div> -->
      </div>
    </div>
    <div class='chart-elem' :class="className" :style="{height:height,width:width}"
         />
<!--    <el-empty v-else :image-size="200"></el-empty>-->
  </div>

</template>

<script>
// 按需引入 引入 ECharts 主模块
var echarts = require('echarts/lib/echarts')
// 引入柱状图
require('echarts/lib/chart/bar')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
// import chartResize from './mixins/chart-resize'
import {saveDivImg} from '@/utils/util'

export default {
//   mixins:[chartResize],
  props: {
    title1: {
      type: String,
      required: false
    },
    title2: {
      type: String,
      required: false
    },
    titletext: {
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
  data() {
    return {
      // Echarts实例
      chart: null
    }
  },
  watch: {
    /* 如果图表数据是后台获取的，监听父组件中的数据变化，重新触发Echarts */
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },
  mounted() {
    /* 图表初始化 */
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    /* 释放图表实例 */
    this.chart.dispose()
    /* dispose 会释放内部占用的一些资源和事件绑定，但是解除实例的引用我们是做不到的，所以需要重新赋值为null */
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el.getElementsByClassName('chart-elem')[0])
      this.setOptions(this.chartData)
    },
    setOptions({days, data1, data2, data3, data4, data5,data6, data7, data8, data9, data10, colors, titles} = {}) {
      this.chart.setOption({
        title: {
          text: this.titletext,
          textStyle: {
            fontSize: 15
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 35,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          data: days,
          axisTick: {
            alignWithLabel: true
          },
          axisLabel:{
            interval: 0,
            rotate: 40,
            formatter: function (value) {
              if (value.length > 6) {
                return `${value.slice(0, 6)}...`;
              }
              return value;
            }
          }
        }],
        yAxis: [{
          type: 'value',
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: titles[0],
          type: 'bar',
          stack: 'vistors',
          barWidth: '60%',
          data: data1,
          animationDuration: 2000,
          color: colors[0],
        },
          {
            name: titles[1],
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: data2,
            animationDuration: 2000,
            color: colors[1],
          },
          {
            name: titles[2],
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: data3,
            animationDuration: 2000,
            color: colors[2],
          },
          {
            name: titles[3],
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: data4,
            animationDuration: 2000,
            color: colors[3],
          },
          {
            name: titles[4],
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: data5,
            animationDuration: 2000,
            color: colors[4],
          },
          {
            name: titles[5],
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: data6,
            animationDuration: 2000,
            color: colors[5],
          },
          {
            name: titles[6],
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: data7,
            animationDuration: 2000,
            color: colors[6],
          },
          {
            name: titles[7],
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: data8,
            animationDuration: 2000,
            color: colors[7],
          },
          {
            name: titles[8],
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: data9,
            animationDuration: 2000,
            color: colors[8],
          },
          {
            name: titles[9],
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: data10,
            animationDuration: 2000,
            color: colors[9],
          }]
      })
    },
    saveImg() {
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

.title::before {
  content: '';
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
