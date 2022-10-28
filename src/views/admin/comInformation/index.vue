<template>
  <div>
      <div class="content">
        <table class="table" border style="border-collapse:collapse;width:100%">
        <tr>
          <th>主办方</th>
          <td>
            <span v-if="obj.sponsor">{{obj.sponsor}}</span>
            <span v-else>暂无</span>
          </td>
          <th>秘书处</th>
          <td>
            <span v-if="obj.secretary">{{obj.secretary}}</span>
            <span v-else>暂无</span>
          </td>
        </tr>
         <tr>
          <th>承办方</th>
          <td>
            <span v-if="obj.undertake">{{obj.undertake}}</span>
            <span v-else>暂无</span>
          </td>
          <th>年份</th>
          <td>
            <span v-if="obj.year">{{obj.year}}</span>
            <span v-else>暂无</span>
          </td>
        </tr>
         <tr>
          <th>支持单位</th>
          <td>
            <span v-if="obj.supportUnit">{{obj.supportUnit}}</span>
            <span v-else>暂无</span>
          </td>
          <th>最新届数</th>
          <td>
            <span v-if="obj.round">{{obj.round}}</span>
            <span v-else>暂无</span>
          </td>
        </tr>
         <tr>
          <th>层级</th>
          <td>
            <span v-if="obj.rank">{{obj.rank}}</span>
            <span v-else>暂无</span>
          </td>
          <th>赛道/赛项</th>
          <td>
            <span v-if="obj.competitionItem">{{obj.competitionItem}}</span>
            <span v-else>暂无</span>
          </td>
        </tr>
         <tr>
          <th>级别</th>
          <td>
            <span v-if="obj.level">{{obj.level}}</span>
            <span v-else>暂无</span>
          </td>
          <th>竞赛类别</th>
          <td>
            <span v-if="obj.competitionSort">{{obj.competitionSort}}</span>
            <span v-else>暂无</span>
          </td>
        </tr>
         <tr>
          <th>下级子赛</th>
          <td>
            <span v-if="obj.lowerCompetition">{{obj.lowerCompetition}}</span>
            <span v-else>暂无</span>
          </td>
          <th>面向专业</th>
          <td>
            <span v-if="obj.major">{{obj.major}}</span>
            <span v-else>暂无</span>
          </td>
        </tr>
        <tr>
          <th>竞赛官网</th>
          <td>
            <span v-if="obj.competitionUrl">{{obj.competitionUrl}}</span>
            <span v-else>暂无</span>
          </td>
          <th>竞赛形式</th>
          <td>
            <span v-if="obj.competitionForm">{{obj.competitionForm}}</span>
            <span v-else>暂无</span>
          </td>
        </tr>
         <tr>
          <th>竞赛简介</th>
          <td colspan="3">
            <span v-if="obj.competitionIntroduce">{{obj.competitionIntroduce}}</span>
            <span v-else>暂无</span>
          </td>
        </tr>
      </table>
      </div>
  </div>
</template>

<script>
import network from '@/api/jxapi/index'
export default {
  props:['currentCId'],
data(){
    return{
      obj:{},
      year:''
    }
  },
 async created(){
      this.year ='2022'
       this.getList()
    },
  methods:{
    async getList(){
      let res = await network.getCompetitionInfo({data:{
         competitionId:this.currentCId,
      }})
      if(res == 'error') return
      if(res.length !== 0){
         this.obj = res[0]
      }else{
        this.obj = {}
      }
    }
  }
}
</script>

<style scoped>
.current{
    background-color: #409eff !important;
    color: #fff;
}
.content{
  background: #fff;
  padding: 16px;
      margin-top: 27px;
}
.table{
  border-color: #dedede;
}
.table th,td{
  height: 50px;
}
.table th{
  width: 160px;
  font-weight: 400;
  background: #f5fafe;
}
.table td{
    padding-left: 20px;
    font-weight: 800;
    text-align: left;
}
</style>