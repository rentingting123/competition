<template>
  <div style="padding-top: 24px">
    <div class="content">
      <div class="box" >
        <div class="title">
          <div>参赛区、省分布</div>
          <div class="pic">
            <div
              @click="saveImg(areamain, '参赛区、省分布')"
              style="margin-right: 33px"
            >
              导出图片
            </div>
            <!-- <div>下载数据</div> -->
          </div>
        </div>
        <div class="tu" style="width: 100%" v-show="isShow">
          <div
            id="areamain"
            style="width: 100% !important; height: 100%; margin: 0"
          ></div>
        </div>
        <div v-show="!isShow" class="echartsShow">
          <el-empty :image-size="200"></el-empty>
        </div>
      </div>
      <div class="box">
        <div class="title">
          <div>区、省获奖占比</div>
          <div class="pic">
            <div
              @click="saveImg(areabing, '区、省获奖占比')"
              style="margin-right: 33px"
            >
              导出图片
            </div>
            <!-- <div>下载数据</div> -->
          </div>
        </div>
        <div class="tu" style="width: 100%" v-show="isShow">
          <div
            id="areabing"
            style="width: 100% !important; height: 100%; margin: 0"
          ></div>
        </div>
        <div v-show="!isShow" class="echartsShow">
          <el-empty :image-size="200"></el-empty>
        </div>
      </div>
      <div class="box">
        <div class="title">
          <div>参赛高校地域分布</div>
          <div class="pic">
            <div
              @click="saveImg(distribution, '参赛高校地域分布')"
              style="margin-right: 33px"
            >
              导出图片
            </div>
            <!-- <div>下载数据</div> -->
          </div>
        </div>
        <div class="tu" style="width: 100%" v-show="isShow">
          <div
            id="distribution"
            style="width: 100% !important; height: 100%; margin: 0"
          ></div>
        </div>
        <div v-show="!isShow" class="echartsShow">
          <el-empty :image-size="200"></el-empty>
        </div>
      </div>
      <div class="box">
        <div class="title">
          <div>获奖高校地域分布</div>
          <div class="pic">
            <div
              @click="saveImg(awardmap, '获奖高校地域分布')"
              style="margin-right: 33px"
            >
              导出图片
            </div>
            <!-- <div>下载数据</div> -->
          </div>
        </div>
        <div class="tu" style="width: 100%" v-show="isShow">
          <div
            id="awardmap"
            style="width: 100% !important; height: 100%; margin: 0"
          ></div>
        </div>
        <div v-show="!isShow" class="echartsShow">
          <el-empty :image-size="200"></el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import chinaMap from "./china.json"; //"@rankadmin/../utils/china.json";
import network from "@/api/jxapi/index";
import { saveDivImg } from "@/utils/util";
export default {
  props: ["currentCId"],
  data() {
    return {
      yearsList: [],
      areamain: null,
      areabing: null,
      distribution: null,
      awardmap: null,
      isShow:true//echarts无数据显示暂无数据
    };
  },
  async mounted() {
    this.areamain = echarts.init(document.getElementById("areamain"));
    this.areabing = echarts.init(document.getElementById("areabing"));
    this.distribution = echarts.init(document.getElementById("distribution"));
    this.awardmap = echarts.init(document.getElementById("awardmap"));
    this.init(this.currentCId);
  },
  methods: {
    repait() {
      echarts.init(document.getElementById("areamain")).dispose(); //删除之前绘画的实例
    },
    saveImg(echart, name) {
      saveDivImg(echart, name);
    },
    async init(id) {
      this.getList(id);
      this.getAwardList(id);
    },
    async getList(competitionId) {
      this.isShow=true
      let res = await network.getCompetitionAreaInfo({
        data: { competitionId },
      });
      if(res.total===0){
        this.isShow=false
      }
      console.log(res);
      if (res == "error" || res.list.length < 1) return;
      let maxmin = [];
      let _data = res.list.map((item) => {
        let max = maxmin[0] || 0;
        let min = maxmin[1] || 0;
        maxmin[0] = max > item.teamCount ? max : item.teamCount;
        maxmin[1] = min < item.teamCount ? min : item.teamCount;
        return {
          name: item.province,
          value: item.teamCount,
        };
      });

      this.drawChart(_data);
      this.drawMap({_data,maxmin});
    },
    async getAwardList(competitionId) {
      this.isShow=true
      let res = await network.getCompAreaAwardList({ data: { competitionId } });
      if (res == "error" || res.list.length < 1) return;
      if(res.total==0){
        this.isShow=false
      }
      let maxmin = [];
      let _data = res.list.map((item) => {
        let max = maxmin[0] || 0;
        let min = maxmin[1] || 0;
        maxmin[0] = max > item.awardCount ? max : item.awardCount;
        maxmin[1] = min < item.awardCount ? min : item.awardCount;
        return { name: item.province, value: item.awardCount };
      });

      this.drawChart1(_data);
      this.drawMap2({ _data, maxmin });
    },
    drawChart(data) {
      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "right",
          y: "center",
        },
        color: [
          "#73deb4",
          "#7685a2",
          "#f7c639",
          "#ec7e65",
          "#84d1ef",
          "#a185d2",
          "#ffaa67",
          "#46a8a7",
          "#ffa8cb",
          "#73a0fb",
          "#c7d9fd",
          "#268eff",
        ],
        series: [
          {
            name: "报名数量",
            type: "pie",
            radius: "70%",
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              show: false,
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.areamain.setOption(option);
    },
    drawChart1(data) {

      // 指定图表的配置项和数据
      let option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "right",
          y: "center",
        },
        color: [
          "#73deb4",
          "#7685a2",
          "#f7c639",
          "#ec7e65",
          "#84d1ef",
          "#a185d2",
          "#ffaa67",
          "#46a8a7",
          "#ffa8cb",
          "#73a0fb",
          "#c7d9fd",
          "#268eff",
        ],
        series: [
          {
            name: "获奖数量",
            type: "pie",
            radius: "70%",
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              show: false,
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.areabing.setOption(option);
    },
    drawMap(data) {
      echarts.registerMap("china", chinaMap);
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c}",
        },
        visualMap: {
          min: data.maxmin[1],
          max: data.maxmin[0],
          text: ["最多", "最少"],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"],
          },
        },
        series: [
          {
            type: "map",
            map: "china",
            data: data._data,
          },
        ],
      };
      this.distribution.setOption(option);
    },
    drawMap2(data) {
      echarts.registerMap("china", chinaMap);
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}<br/>{c}",
        },
        visualMap: {
          min: data.maxmin[1],
          max: data.maxmin[0],
          text: ["最多", "最少"],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"],
          },
        },
        series: [
          {
            type: "map",
            map: "china",
            data: data._data,
          },
        ],
      };
      this.awardmap.setOption(option);
    },
  },
};
</script>

<style scoped>
.current {
  background-color: #409eff !important;
  color: #fff;
}
.tu {
  height: 96%;
  background-color: #fff;
}
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
.content {
  width: 100%;
  display: flex;

  justify-content: space-between;
  flex-wrap: wrap;
}
.content .box {
  background-color: #fff;
  min-width: 49%;
  height: 550px;
  margin-bottom: 20px;
  box-sizing: border-box;
  padding: 15px;
  width: 49.4%;
}
.content {
  width: 100%;
  height: 100%;
}
.main1 {
  width: 100wh !important;
  height: 550px;
  margin: 0;
}
.echartsShow{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
}
</style>
