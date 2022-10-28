<template>
  <!-- 参赛数据 -->
  <div>
    <competecolumn title1="竞赛概况" :chartData="chartData2"></competecolumn>
    <barChart title1="参赛团队高校TOP20" :chartData="chartData"></barChart>
    <barChart title1="参赛专业TOP20" :chartData="chartData1"></barChart>
  </div>
</template>

<script>
import network from "@@/api/jxapi";
import barChart from "@/views/admin/common/barChart";
import competecolumn from "@/views/admin/common/competecolumn";

export default {
  mounted() {
    this.getList()
  },
  components: {
    barChart,
    competecolumn,
  },
  props: ["beginYear", "endYear", "currentCId"],
  data() {
    return {
      chartData: {
        days: [],
        data1: [],
        colors: ["#73a0fb"],
        title: "团队个数",
      },
      chartData1: {
        data1: [],
        colors: ["#5AD8A6"],
        title: "参赛人数",
      },
      chartData2: {
        days: [],
        data1: [],
        data2: [],
        data3: [],
        data4: [],
      },
    };
  },
  // watch:{
  //   '$store.state.competitionNameStore':{
  //     handler(val){
  //       this.getList(val);
  //       val===''?"中国“互联网+”大学生创新创业大赛":val
  //       console.log(val,'val');
  //     },
  //     immediate:true
  //   }
  // },
  methods: {
    async getList() {
      // 竞赛概况
      let res = await network.competitionlistData({
        data: {
          competitionName: this.$route.query.compicName,
          beginYear: this.beginYear,
          endYear: this.endYear,
        },
      });
      if (res == "error") return;

      this.chartData2.days = res.xaxis.data;
      res.series.forEach((item, index) => {
        let indexa = index + 1;
        this.chartData2["data" + indexa] = item.data;
      });
      // 参赛TOP20高校
      let res1 = await network.getHistorySchoolTeamTop({
        data: {
          competitionName: this.$route.query.compicName,
          beginYear: this.beginYear,
          endYear: this.endYear,
        },
      });
      if (res1 == "error") return;
      this.chartData.days = res1.yaxis.data;
      this.chartData.data1 = res1.series[0].data;
      // 参赛专业TOP20
      let res2 = await network.getHistoryMajorTeamTop({
        data: {
          competitionName: this.$route.query.compicName,
          beginYear: this.beginYear,
          endYear: this.endYear,
        },
      });
      if (res2 == "error") return;
      this.chartData1.days = res2.yaxis.data;
      this.chartData1.data1 = res2.series[0].data;
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
  position: relative;
  padding: 15px;
  height: 550px;
  background: #fff;
  margin-bottom: 20px;
}

.content1::after {
  /* content: "2022"; */
  position: absolute;
  display: block;
  font-size: 109px;
  z-index: 2000;
  bottom: 101px;
  right: 190px;
  color: #cbe4fa;
  opacity: 0.6;
  letter-spacing: 5px;
}
</style>
