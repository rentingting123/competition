<template>
  <div class="workmanagement">
        <el-form :model="form"  :inline="true">
                    <el-form-item prop="year">
                        <el-cascader v-model="value"   placeholder="请选择" @change="competitionsChange" :options="yearList"></el-cascader>
                    </el-form-item>
                    <el-form-item prop="competitionId">
                         <el-select clearable filterable v-model="form.competitionId" @change="init()" placeholder="选择参赛类别">
                            <el-option
                                v-for="(item2,index) in cslbList2"
                                :key="index"
                                :label="item2.name"
                                :value="item2.id"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
       <el-table v-loading="loading"  class="table" :data="lists" border >
           <el-table-column prop="title" label="作品名称"></el-table-column>
           <el-table-column prop="competitionName" label="赛项"></el-table-column>
           <el-table-column prop="userName" label="评论人姓名"></el-table-column>
           <el-table-column prop="email" label="评论人邮件地址"></el-table-column>
           <el-table-column prop="content" label="评论内容"></el-table-column>
           <el-table-column prop="createTime" label="评论时间">
             <template slot-scope="{row}">
               {{row.createTime | dtime}}
             </template>
           </el-table-column>
       </el-table>
        <el-pagination
        style="    text-align-last: center;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      current-page.sync="1"
      :page-size="pageSize"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import moment from 'moment'
import network from '@/api/jxapi'
export default {
  created(){
    this.getYearList()
  },
  data(){
    return{
      lists:[],
      cslbList2:[],
      yearList: [],
      value:[],
      loading : false,
      flag:0,
       form:{
                competitionId:'',
                pid:'',
                pageNum: 1,
                pageSize: 12,
                year:''
            },
          maxyear:{
                competitionId: "",
                competitionName: "",
                competitionYear: 1
            },
            pageNum:1,
            pageSize:10,
            total:0

    }
  },
  methods:{
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.init()
      },
      //获取年份列表
        async getYearList(type) {
        let res = await network.getYearListForHuaCan({data:{
            // groupId: 10000098,
            groupId: localStorage.getItem('groupId'),
        }});
        if(res=='error') return;
        res.forEach(item => {
            if(item.competitionYear > this.maxyear.competitionYear){
                this.maxyear  = item
            }
            this.yearList.push({
                value:item.competitionYear,
                label:item.competitionYear,
                children:[{
                    value: item.competitionId,
                    label: item.competitionName,
                }]
            })
        })
        this.$set(this.form,'year',this.maxyear.competitionYear)
        this.$set(this.form,'pid',this.maxyear.competitionId);
        this.value = [this.form.year,this.form.pid]
        this.getJCLBList()
        },
    async competitionsChange(val) {
              this.form.year = val[0]
              this.form.pid = val[1]
              this.form.competitionId = ''
            //   获取赛项
           this.getJCLBList()
      },
       // 获取参赛类别列表数据
        async getJCLBList() {
        let res = await network.getCompetitionType({data:{
            // groupId: 10000098,
            groupId: localStorage.getItem('groupId'),
            year:this.form.year
        }});
        if(res=='error') return;
        if(res.length > 0){
          this.flag = 1
        }else{
          this.flag = 0
        }
            this.cslbList2 = res
            this.init()
        },
        async init(){
          this.loading = true
          let params = {
            pageNum : this.pageNum,
            pageSize : this.pageSize,
            childId : this.form.competitionId,
            parentId : this.form.pid,
            flag:this.flag
          }
          let res = await network.messageList({data:params})
          if(res=='error') return this.loading = false
          this.loading = false
          this.total = res.total
          this.lists = res.list
        }

  } ,
    filters:{
         dtime(val){
        if(val){
            return moment(val).format('YYYY-MM-DD HH:MM')
        }else{
            return ''
        }

    }
    }
}
</script>

<style scoped>
.workmanagement{
  text-align-last: left;
  /* margin: 4px 20px;
  margin-top: 300px; */
}
</style>
