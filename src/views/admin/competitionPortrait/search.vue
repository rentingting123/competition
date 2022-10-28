<template>
  <div class="search">
    <div class="conSelect">
      <el-select :disabled="objSearch.flagSearch" @change="optionsChange" v-model="compicName" filterable remote
        reserve-keyword placeholder="请输入竞赛名称" :remote-method="remoteMethod" :loading="loading">
        <el-option v-for="item in compicList" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <el-button slot="append" class="elbtn" type="primary">查看竞赛分析
      </el-button>
    </div>
    <div>
      <span>年份筛选</span>
      <el-select size="mini" v-model="currentYears" placeholder="请选择年份" @change="yearsChange">
        <el-option v-for="item in yearsList" :key="item" :label="item" :value="item">
        </el-option>
      </el-select>
    </div>
    <el-select size="mini" v-model="currentCId" placeholder="请选择项目名称" class="project" @change="CIdChange">
      <el-option v-for="item in gamesList" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import api from "@/api/jxapi";

export default {
  props: ['objSearch'],
  data() {
    return {
      loading: false,
      compicName: "中国“互联网+”大学生创新创业大赛", //竞赛名称
      currentCId: "", //项目名称
      currentYears: "", //年份筛选
      compicList: [], // 竞赛列表
      gamesList: [],
      yearsList: [],
      val: null
    };
  },
  created() {
  },
  mounted() {
    // if (this.$route.query.compicName !== undefined) {
    //   this.compicName = this.$route.query.compicName
    // } else {
    //   this.compicName = "中国“互联网+”大学生创新创业大赛"
    // }
    this.remoteMethod(this.val);
  },
  watch: {
    objSearch: {
      handler(val) {
        if (val) {
          console.log(val.idcardName, 'val.idcardName');
          this.compicName = val.idcardName ? val.idcardName : "中国“互联网+”大学生创新创业大赛";
          this.remoteMethod(this.val);
        }
      },
      immediate: true
    }
  },
  methods: {
    // 1、获取远程项目名称
    async remoteMethod(val) {

      this.val = val
      let competitionName = val ? val : this.compicName
      if (competitionName) {
        this.loading = true; //竞赛名称
        let competition = await api.selectCompList({
          data: { competitionName },
        });
        this.loading = false;
        if (competition == "error") return;
        this.compicList = competition.map((item) => ({
          value: item.competitionName,
          label: item.competitionName,
        }));
        this.compicName = this.compicList[0].value;
        await this.getYearList();
      }
    },
    // 2、项目名称
    optionsChange() {
      this.getYearList();
    },
    // 3、根据项目名称 获取年份
    async getYearList() {
      await api
        .getCompYearList({ data: { competitionName: this.compicName } })
        .then((res) => {
          this.yearsList = res.year;
          this.currentYears = this.yearsList[0];
          console.log("res", res);
          // if(this.yearsList.length>0){
          this.getall();
          // }
        });
    },

    // 4、获取 项目名称选择框 获取所有数据
    async getall() {
      this.gamesList = await api
        .getCompList({
          //年份和名称
          data: {
            competitionName: this.compicName,
            year: this.currentYears,
          },
        })
        .then((res) => {
          // console.log(res,'res');

          return res.map((item) => ({
            value: item.competitionId,
            label: item.competitionName,
          }));
        })
        .catch((err) => {
          console.log(err, "err");
        });
      this.currentCId = this.gamesList[0]?.value;
      // console.log(this.gamesList,'this.gamesList');

      var compicName = this.gamesList[0]?.label.substring(3)
      var obj = {
        currentCId: this.currentCId,
        compicName: compicName
      }
      if (this.currentCId) {
        this.$emit("search", obj);
      }

    },
    // 5、年份改变
    yearsChange() {
      this.currentCId = "";
      this.getall();
    },
    CIdChange() {
      this.$emit("search", this.currentCId);
    },
  },
};
</script>
<style scoped>
.search {
  background-color: #f0f2f4;
  text-align: left;
  margin: 16px 18px;
  display: flex;
}

.conSelect {
  margin-right: 48px;
}

.el-select-dropdown {
  height: 40px;
  border-radius: 2px;
}

.elbtn {
  margin-left: -5px;
  box-sizing: border-box;
  width: 116px;
  height: 40px;
  background: #1890ff;
  border-radius: 2px;
}

.project {
  margin-left: 48px;
  min-width: 300px;
}
</style>
