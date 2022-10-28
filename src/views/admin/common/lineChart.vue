<template>
       <div style="width: 98%;height:400px">
        
          <div class='chart-elem' :class="className" :style="{height:height,width:width}" />
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
import { saveDivImg } from '@/utils/util'

export default {
//   mixins:[chartResize],
  props: {
      titletext:{
          type: String,
          required:false
      },
      title1:{
          type: String,
          required:false
      },
      title2:{
          type: String,
          required:false
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
    setOptions({ days, data1 } = {}) {
      this.chart.setOption({
        tooltip: {
          show: true,
          trigger: 'axis',
        },
         xAxis: {
          type: 'category',
          data: days
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '排名',
            type: 'line',
            data:data1,
            type: 'line'
          }
        ]
      })
    },
    saveImg() {
      saveDivImg(this.chart)
    }
  }
}
</script>
<style scoped>

</style>
