<template>
  <div>
    <div class="head">
      <div>
        <button
          class="btn"
          :class="{ huojiang: shuju == 1 }"
          @click="getcansai()"
        >
          参赛数据
        </button>
        <button
          class="btn"
          :class="{ huojiang: shuju == 0 }"
          @click="gethuojiang()"
        >
          获奖数据
        </button>
      </div>
      <el-form
        style="height: 40px"
        :inline="true"
        :model="formData"
        class="demo-form-inline"
      >
        <el-form-item label="年份筛选" label-width="200px">
          <el-date-picker
            v-model="formData.beginYear"
            format="yyyy"
            value-format="yyyy"
            size="small"
            type="year"
            placeholder="请选择年份"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="至" label-width="32px">
          <el-date-picker
            v-model="formData.endYear"
            format="yyyy"
            value-format="yyyy"
            size="small"
            type="year"
            placeholder="请选择年份"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="onSubmit"
            >确认筛选</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div v-if="shuju == 0">
      <compete
        ref="compete"
        :currentCId="currentCId"
        :beginYear="formData.beginYear"
        :endYear="formData.endYear"
      ></compete>
    </div>
    <div v-else>
      <award
        ref="award"
        :currentCId="currentCId"
        :beginYear="formData.beginYear"
        :endYear="formData.endYear"
      ></award>
    </div>
  </div>
</template>

<script>
import compete from "./compete";
import award from "./award";
export default {
  components: {
    compete,
    award,
  },
  props: ["currentCId"],
  data() {
    return {
      shuju: 0,
      formData: {
        beginYear: "2021",
        endYear: "2022",
      },
    };
  },
  mounted(){
    
  },
  methods: {
    getcansai() {
      this.shuju = 0;
    },
    gethuojiang() {
      this.shuju = 1;
    },
    onSubmit() {
      if (this.shuju === 0) {
        
        this.$refs.compete.getList();
      } else {
        this.$refs.award.getList();
      }
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
.head {
  width: 99%;
  text-align: left;
  background: #fff;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 24px;
  align-items: center;
}
.head ::v-deep .el-form-item__label {
  text-align: center;
}
.btn {
  border-radius: 4px;
  width: 200px;
  cursor: pointer;
  background: #0078e1;
  height: 30px;
  color: #fff;
  font-size: 16px;
  border: 1px solid #0078e1;
  line-height: 30px;
}
.huojiang {
  background: #fff;
  color: #0078e1;
}
</style>
