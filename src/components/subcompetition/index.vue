<template>
  <div :style="`width :${width}px`">
     <el-select 
     v-if="!oneCompetition"
     @change="change" v-model="values" :placeholder="$t('competitionDetails.chooseTitle')">
    <!-- <el-option
      v-for="(item) in PointsOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="type=='1' && !item.flag"
    > -->
    <el-option
      v-for="(item) in PointsOptions"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="(type=='1' && item.status===0) || (type==3 && !item.haveTeam)"
    >
    </el-option>
  </el-select>
     <el-input
     class='input'
      v-else disabled :value="oneCompetitionName" ></el-input>
  </div>
</template>


<script>
import jxapi from "@@/api/jxapi/index";
export default {
  props:{
    width:{
      default:()=>(360)
    },
    onChange:Function,
    // id:{
    //   type:[Number,String],
    //   required:true
    // },
    type:[Number,String], // 1为是否在报名阶段 2显示全部  3是否有团队
    value:[String,Number]
  },
  data() {
    return {
      PointsOptions: [],
      oneCompetitionName:'',
      oneCompetition:false,
      values:''
    };
  },
  methods: {
    async getList() {
      let id = this.$route.query.competitionId || localStorage.getItem('competitionId');
      if (!id) return this.$message.error(this.$t('competitionDetails.idLost'));
      let params = {
        competitionId: id
      }
      if(this.$route.query.label){
        params.label = this.$route.query.label
      }
      let competition = await jxapi.getSignupCompetition({data:params});
      if (competition == "error") return 
      if(!competition.childs||competition.childs.length == 0){
        this.oneCompetition = true;
        this.oneCompetitionName = competition.competitionName;
        this.onChange&&this.onChange(id)
        return 
      }
      let data = competition.childs
      let arr = [];
      for (let i = 0; i < data.length; i++) {
        arr.push({
          label: data[i].name,
          value: data[i].id,
          flag: data[i].flag,
          haveTeam: data[i].haveTeam || false,
          status: data[i].status
        });
      }
      this.PointsOptions = arr;
    },
    change(value){
      this.onChange&&this.onChange(value)
    }
  },
  created() {
    // console.log(this.id)
    this.getList();
  }
};
</script>

<style lang="less" scoped>
  .el-select{
    display: block;
  }
  .input{
    display: block;
  }
</style>
