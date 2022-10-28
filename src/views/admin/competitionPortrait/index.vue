<template>
  <div class="home">
    <div class="box">
      <div class="content">
        <div class="title">
          <div>国/省/校竞赛结构</div>
          <div class="pic">
            <div
              id="btn_download1"
              @click="saveImg(relationChart)"
              style="margin-right: 33px"
            >
              导出图片
            </div>
          </div>
        </div>
        <div id="relation-chart"></div>
      </div>
    </div>

    <div class="box">
      <div class="content">
        <div class="title">
          <div>高校团队获奖情况</div>
          <div class="sear">
            <el-form>
              <el-form-item class="serach-input" size="small">
                <el-input clearable placeholder="请输入高校名称" size="small" v-model="formSchool.name" style="width:300px"></el-input>
                <el-button size="small" type="primary" icon="el-icon-search" @click="handleSearchSchool">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="pic">
            <div
              id="btn_download2"
              @click="saveImg(sankeyChart)"
              style="margin-right: 33px"
            >
              导出图片
            </div>
          </div>
        </div>
        <div id="sankey" v-show="isShow"></div>
        <div v-show="!isShow">
          <el-empty :image-size="200"></el-empty>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import {saveDivImg} from "@/utils/util.js";
import api from "@/api/jxapi";

export default {
  props: ["currentCId"],
  data() {
    return {
      sankeyChart: null,
      relationChart: null,
      components: [],
      schoolCode: "",
      isShow: true,
      formSchool: {
        name: ''
      }
    };
  },
  watch: {
    currentCId: {
      handler() {
        this.getList(this.schoolCode);
      }
    },
  },
  mounted() {
  },
  methods: {
    async getList(schoolCode = "4111010001") {
      if (this.currentCId !== null && this.currentCId !== undefined && this.currentCId !== '') {
        this.schoolCode = schoolCode;
        this.relationChart = echarts.init(
          document.getElementById("relation-chart")
        );
        this.relationChart.on("click", (params) => {
          if (params.data.value !== null) {
            this.schoolCode = params.data.value;
            this.getStru();
          }
        });
        let list = await api.getCompStructure({
          data: {
            competitionId: this.currentCId,
          },
        });
        if (list === "error" || list.length < 1) return;
        this.drawRelationChart(list);
        if (!this.schoolCode) {
          this.schoolCode = list.children ? ([0].children ? [0].value : '4111010001') : '4111010001';
        }
        this.sankeyChart = echarts.init(document.getElementById("sankey"));
        await this.getStru();
      }
    },
    async getStru() {
      this.isShow = true
      let list = await api.getCompAwardInfo({
        data: {
          competitionId: this.currentCId,
          schoolCode: this.schoolCode,
        },
      });
      this.drawChart(list);
    },
    drawChart(data) {
      let option = {
        tooltip: {
          trigger: "item",
          triggerOn: "mousemove",
        },
        series: [
          {
            type: "sankey",
            emphasis: {
              focus: "adjacency",
            },
            nodeAlign: "left",
            data: data.data || [],
            links: data.links || [],
            lineStyle: {
              color: "source",
              curveness: 0.5,
            },
          },
        ],
      };
      try {
        this.sankeyChart.setOption(option);
      } catch (e) {
        this.sankeyChart = null;
      }
    },
    drawRelationChart(dataExample) {
      dataExample.children.forEach(function (datum, index) {
        datum.collapsed = true;
      });
      let option = {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          formatter: function (params){
            return params.data.name;
          }
        },
        series: [
          {
            type: 'tree',
            data: [dataExample],
            top: '1%',
            left: '18%',
            bottom: '1%',
            right: '20%',
            symbolSize: 14,
            label: {
              position: 'left',
              verticalAlign: 'middle',
              align: 'right',
              fontSize: 14
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left'
              }
            },
            emphasis: {
              focus: 'descendant'
            },
            lineStyle: {
              color: '#3fa3d1'
            },
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
          }
        ]
      }
      this.relationChart.setOption(option);
    },
    tocontent() {
      this.show = !this.show;
    },
    saveImg(chartElem) {
      saveDivImg(chartElem, this.schoolCode);
    },
    async handleSearchSchool() {
      if (this.formSchool.name.length > 0) {
        let res = await api.selectSchoolName({
          data: {
            pageNum: 1,
            pageSize: 1,
            schoolName: this.formSchool.name,
          },
        });
        if (res == "error") return;
        let list = await api.getCompAwardInfo({
          data: {
            competitionId: this.currentCId,
            schoolCode: res.data[0].schoolCode,
          },
        });
        this.drawChart(list);
      }
    },
  },
};
</script>

<style scoped>
.home {
  width: 100%;
}

.box {
  padding: 20px;
  box-sizing: border-box;
  padding-top: 0;
}

.current {
  background-color: #409eff !important;
  color: #fff;
}

.bighead1 ::v-deep .el-button--primary {
  height: 32px;
  line-height: 8px;
  margin-top: 3px;
  border-radius: 0px;
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
  width: 98%;
  padding: 15px;
  height: 550px;
  background: #fff;
}

.content #sankey {
  height: 100%;
  width: 100%;
}

.content #relation-chart {
  width: 98%;
  height: 550px;
}

.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  width: 178px;
  font-size: 16px;
  height: 28px;
  background-color: #fff;
  border: 1px solid #077ce1;
  color: #077ce1;
  border-radius: 4px;
  line-height: 28px;
}

.bighead1 {
  position: relative;
  width: 100%;
  height: 80px;
  background-color: #fff;
  box-sizing: border-box;
}
</style>
