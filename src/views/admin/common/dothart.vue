<template>
  <div style="width: 98%;height:400px">
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
      //       this.chartData.series[0].data.reverse()
      // this.chartData.yaxis.data.reverse()
        this.setOptions(val)
      }
    }
  },
  mounted () {
    /* 图表初始化 */
    this.$nextTick(() => {
      this.initChart()
    })
    // console.log(this.chartData, '同类型高校');
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
    setOptions (data) {
      // data.series[0].data.reverse()
      if (!data.series || data.series == "undefined") return
      data.series?.forEach(item => {
        item.type = 'scatter'
      })
      // data.yaxis.data.reverse()
      if (!data.yaxis.data) {
        data.yaxis.data = []
      }
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c}'
        },
        yAxis: {
          type: 'value'
        },
        label: {
          show: true,
          position: "right",
          formatter: '{@value}'   // 点旁边显示label，这里使用name: '横坐标'这样写也可以，鼠标移入出现提示。
        },
        xAxis: {
          type: 'category',
          data: data.yaxis.data,
          axisTick: {
            show: false
          },
          axisLabel: {
        rotate: 20,
      },
        },
        series: data.series
      })
    },
    saveImg () {
      saveDivImg(this.chart)
    }
  }
}
</script>
<style scoped>
</style>
