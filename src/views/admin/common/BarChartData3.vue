<template>
  <div class="content1" style="width: 98%;">
    <div class="title">
      <div>
        {{title1}}
        <span class="small">{{title2}}</span>
      </div>
    </div>
    <div class="chart-elem" :class="className" :style="{height:height,width:width}" />
  </div>
</template>

<script>
import * as echarts from 'echarts';
// import chartResize from './mixins/chart-resize'
import { saveDivImg } from '@/utils/util'
// import func from '../../../../vue-temp/vue-editor-bridge';

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
      chart: null,
      technologyArr:[],
      robotArr:[],
      medicineArr:[],
      forestArr:[],
      synthesisArr:[],
      sciencesArr:[],
      otherArr:[]
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
    // console.log('chartData2800', this.chartData);
    // this.chartData.data1.forEach(item => {
    //   var arr = []
    //   if (item.name === '综合类'){
    //     item.children.
    //   }
    // })

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
    setOptions ({ data1 } = {}) {
      const treeToArr = (data = []) => {
        let res = [];
        data.forEach(pArea => {
          pArea.children.forEach(school => {
            school.children.forEach(lsk => {
              lsk.children.forEach(({ name, value }) => {
                res.push({ pArea: pArea.name, school: school.name, lsk: lsk.name, class: name, num: value });
              })
            })
          })
        });

        return res;
      };
      let arr = treeToArr(data1)
      function fn (arr, begin, end) {
        return arr.slice(begin, end)
      }
      const technologyArr = fn(arr, 0, 170)
      const robotArr = fn(arr, 171, 340)
      const medicineArr = fn(arr, 341, 511)
      const forestArr = fn(arr, 512, 682)
      const synthesisArr = fn(arr, 690, 860)
      const sciencesArr = fn(arr, 861, 1031)
      const otherArr = fn(arr, 1032, arr.length - 1)
      function fun (arr, str) {
        let sum = 0
        arr.forEach(item => {
          if (item.class === str) { sum += item.num }
        })
        return sum
      }
       const sum5 = fun(technologyArr,'其他')
       const sum4 = fun(technologyArr,'单项奖')
       const sum3 = fun(technologyArr,'三等奖')
       const sum2 = fun(technologyArr,'二等奖')
       const sum1 = fun(technologyArr,'一等奖')
       this.technologyArr = []
      this.technologyArr.push(sum1,sum2,sum3,sum4,sum5+sum4,sum1+sum3,sum2+sum5)
      const sum10 = fun(robotArr,'其他')
       const sum9 = fun(robotArr,'单项奖')
       const sum8 = fun(robotArr,'三等奖')
       const sum7 = fun(robotArr,'二等奖')
       const sum6 = fun(robotArr,'一等奖')
       this.robotArr = []
      this.robotArr.push(sum6,sum7,sum8,sum9,sum10+sum9,sum6+sum8,sum7+sum10)
      const sum15 = fun(medicineArr,'其他')
       const sum14 = fun(medicineArr,'单项奖')
       const sum13 = fun(medicineArr,'三等奖')
       const sum12 = fun(medicineArr,'二等奖')
       const sum11 = fun(medicineArr,'一等奖')
       this.medicineArr = []
      this.medicineArr.push(sum11,sum12,sum13,sum14,sum15+sum14,sum11+sum13,sum12+sum15)
      const sum20 = fun(forestArr,'其他')
       const sum19 = fun(forestArr,'单项奖')
       const sum18 = fun(forestArr,'三等奖')
       const sum17 = fun(forestArr,'二等奖')
       const sum16 = fun(forestArr,'一等奖')
       this.forestArr = []
      this.forestArr.push(sum16,sum17,sum18,sum19,sum20+sum19,sum16+sum18,sum17+sum20)
      const sum25 = fun(synthesisArr,'其他')
       const sum24 = fun(synthesisArr,'单项奖')
       const sum23 = fun(synthesisArr,'三等奖')
       const sum22 = fun(synthesisArr,'二等奖')
       const sum21 = fun(synthesisArr,'一等奖')
       this.synthesisArr = []
      this.synthesisArr.push(sum21,sum22,sum23,sum24,sum25+sum24,sum21+sum23,sum22+sum25)
      const sum30 = fun(sciencesArr,'其他')
       const sum29 = fun(sciencesArr,'单项奖')
       const sum28 = fun(sciencesArr,'三等奖')
       const sum27 = fun(sciencesArr,'二等奖')
       const sum26 = fun(sciencesArr,'一等奖')
       this.sciencesArr = []
      this.sciencesArr.push(sum26,sum27,sum28,sum29,sum30+sum29,sum26+sum28,sum27+sum30)
       const sum35 = fun(otherArr,'其他')
       const sum34 = fun(otherArr,'单项奖')
       const sum33 = fun(otherArr,'三等奖')
       const sum32 = fun(otherArr,'二等奖')
       const sum31 = fun(otherArr,'一等奖')
       this.otherArr = []
      this.otherArr.push(sum31,sum32,sum33,sum34,sum35+sum34,sum31+sum33,sum32+sum35)
      this.chart.setOption({
        color: ["#74a0fa", "#75ddb5", "#7785a0", "#f8c638", "#ec7e64"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          data: ["其他", "单项奖", "三等奖", "二等奖", "一等奖"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          show: true,
          axisLine: {
            //---坐标轴 轴线
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            margin: 5,
          },
          // data: ["800", "1600", "2400", "3200"],
        },

        yAxis: {
          type: "category",
          data: [
            "其他竞赛",
            "理工竞赛",
            "综合竞赛",
            "农林竞赛",
            "医学竞赛",
            "机器人竞赛",
            "科技竞赛",
          ],
          axisTick: {
            show: false,
          },
          axisLabel: { color: "#000" },
        },
        series: [
          {
            name: "其他",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                // padding:0,
                // show: true,
                position: "insideRight",
              },
            },
            data: this.technologyArr,
            barWidth: "40",
          },
          {
            name: "单项奖",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                // padding:30,
                // show: true,
                position: "insideRight",
              },
            },
            data: this.robotArr,
            barWidth: "20",
          },
          {
            name: "三等奖",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                // show: true,
                position: "insideRight",
              },
            },
            data: this.medicineArr,
          },
          {
            name: "二等奖",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                // show: true,
                position: "insideRight",
              },
            },
            data: this.synthesisArr,
          },
          {
            name: "一等奖",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                // show: true,
                position: "insideRight",
              },
            },
            data: this.forestArr,
          },
        ],
      })
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
/* .title::before{
      content: '';
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
  height: 550px;
  background: #fff;
  margin-bottom: 20px;
}
</style>
