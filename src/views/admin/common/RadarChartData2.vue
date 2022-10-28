<template>
       <div style="width: 98%;height:700px;width:100%">

          <div class='chart-elem' :class="className" :style="{height:height,width:width}" />
         </div>
</template>

<script>
import * as echarts from 'echarts';
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
    // console.log(this.chartData,'雷达');

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
    setOptions(data) {
      // if(!data.series || data.series == "undefined") return
      // data.series?.forEach(item => {
      //   item.type = 'scatter'
      // })
      // if(!data.yaxis.data){
      //   data.yaxis.data = []
      // }
      this.chart.setOption({
        title: {
    // text: 'Basic Radar Chart'
  },
   tooltip: {
          //坐标系提示框
          show: true,
          trigger: 'item',
        },
  legend: {
    // data: ['Allocated Budget', 'Actual Spending']
  },
  radar: {
    // shape: 'circle',
    indicator: this.chartData.radar.indicator
    //   { name: '中美青年科技大赛', max: 520 ,},
    //   { name: '研究贡献教学奖', max: 520 },
    //   { name: '中国高校计算机大赛', max: 520 },
    //   { name: '全国智能机器人大赛', max: 520 },
    //   { name: '第十届文艺青年大赛', max: 520 },
    //   { name: '全国青少年心算大赛', max: 520 }
    // ],
  },
  dataset: {
    source: [
      ["中美青年科技大赛","研究贡献教学奖","中国高校计算机大赛","全国智能机器人大赛","第十届文艺青年大赛","全国青少年心算大赛", ],
      [330, 270, 180, 390,340,430],
    ],
  },
  series: [
    {
      name: '竞赛年均获奖',
      type: 'radar',
      // label:{show:true},
      data:this.chartData.serier[0].data
      // data: [
      //   {
      //     value: [330, 270, 180, 390,340,430],
      //     // name: 'Allocated Budget'
      //     // 设置区域边框和区域的颜色
      //           itemStyle: {
      //               normal: {
      //                   color: '#f1927a',
      //                   lineStyle: {
      //                       color: '#f1927a',
      //                   },
      //               },
      //           },
      //           areaStyle:{
      //             color:"rgba(252, 146, 120,.4)",
      //             type: 'radial',
      //       x: 0.5,
      //       y: 0.5,
      //       r: 0.8,
      //             colorStops: [
      //         {
      //           offset: 0,
      //           color:'#fde4df' // 0% 处的颜色
      //         },
      //         {
      //           offset: 1,
      //           color:'#f1927a' // 100% 处的颜色
      //         }
      //       ],
      //           }
      //            在拐点处显示数值
      //           label: {
      //               normal: {
      //                   show: true,
      //                   formatter:(params:any) => {
      //                       return params.value
      //                   },
      //               },
      //           },
      //   },

      // ],
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
