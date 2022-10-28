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
var a = Math.floor(Math.random() * 100 + 1)
if (a < 80) {
  a = 80 + Math.floor(Math.random() * 10 + 1)
} else {
  a = a
}
export default {
  //   mixins:[chartResize],
  props: {
    num: {
      type: Number
    },
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
      chart: null,
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
    // console.log('this.chartData3', this.chartData);

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
    setOptions ({ days, data1, data2, data3, data4, data5, colors, title } = {}) {
      this.chart.setOption({
        title: {
          text: this.num ? this.num + "%" : "85%",
          subtext: "参与率",
          x: "center",
          y: "center",
          textStyle: {
            fontWeight: "normal",
            color: "#0580f2",
            fontSize: "22",
          },
          subtextStyle: {
            fontSize: "18",
          }
        },
        color: ["#CBDCFF"],
        legend: {
          show: true,
          itemGap: 12,
        },

        series: [
          {
            name: "Line 1",
            type: "pie",
            clockWise: true,
            radius: ["50%", "66%"],
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },
            hoverAnimation: false,
            data: [
              {
                value: this.num ? this.num : 85,

                itemStyle: {
                  normal: {
                    color: {
                      // 完成的圆环的颜色
                      colorStops: [
                        {
                          offset: 0,
                          color: "#5B8FF9", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "#5B8FF9", // 100% 处的颜色
                        },
                      ],
                    },
                    label: {
                      show: false,
                    },
                    labelLine: {
                      show: false,
                    },
                  },
                },
              },
              {

                value: this.num ? 100 - this.num : 15,
              },
            ],
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
