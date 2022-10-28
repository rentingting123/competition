<template>
       <div style="width: 98%;height:550px">

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
    setOptions({series,radar,legend,title} = {}) {
        // console.log(series);

        this.chart.setOption({
              tooltip: {
    textStyle:{
      align:'left' // 左对齐
  },
 formatter: function (params,x,y) {
    let score = "";
    for(let i = 0; i < radar?.indicator.length; i++){
        let obj = radar?.indicator[i]
        score = score + `${obj.name}:${params.value[i]}<br>`
    }
    return  `${params.name}<br/> ${score}` ;
  }
},
            radar: [
    {
      indicator: radar?.indicator,
      splitNumber: 4,
      shape: 'circle',
      axisName: {
        formatter: '【{value}】',
        color: '#428BD4'
      },
      splitArea: {
        areaStyle: {
          color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
          shadowColor: 'rgba(0, 0, 0, 0.2)',
          shadowBlur: 10
        }
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(211, 253, 250, 0.8)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(211, 253, 250, 0.8)'
        }
      }
    },
            ],
            series:series
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
