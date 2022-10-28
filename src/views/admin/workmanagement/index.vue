<template>
  <div class="workmanagement">
    <el-form ref="form" :inline="true" :model="form">
      <!-- <el-form-item >
        <el-select v-model="form.year" placeholder="">
           <el-option
                  v-for="con in yearList"
                  :label="con"
                  :key="con"
                  :value="con"
                ></el-option>
        </el-select>
      </el-form-item> -->
        <el-form-item>
         <el-cascader placeholder="请选择" @change="competitionsChange" :props="compets"></el-cascader>
      </el-form-item>
      <el-form-item >
        <el-input v-model="form.competitionName" placeholder="搜索竞赛"  suffix-icon="el-icon-search"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="form.searchValue" placeholder="作品名、队长名"></el-input>
      </el-form-item>

      <el-form-item label="">
        <el-select @change="getList" placeholder="请选择奖项" v-model="form.awardName">
          <el-option
                  v-for="con in awardlist"
                  :label="con"
                  :key="con"
                  :value="con"
                ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-select @change="getList" placeholder="请选择赛程" clearable v-model="form.rowId">
          <el-option
                  v-for="con in lastlist"
                  :label="con.competition_times[0].name"
                  :key="con.rowId"
                  :value="con.rowId"
                ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList()">搜索</el-button>
      </el-form-item>
    </el-form>
  <div v-loading="loading" >
      <div style="margin-bottom:20px">
      <!-- <el-button type="primary" size="mini">批量下载</el-button> -->
      <el-button type="primary" @click="exporTable(null)" size="mini">批量下载</el-button>
      <el-button type="primary" @click="allopendown()" size="mini">批量允许对外下载</el-button>
    </div>

       <el-table class="table" :data="tableData" border @selection-change='selectionChange'>
          <el-table-column type="selection"  width="55">
            <!-- :disabled="row.isdownload == 0" -->
          </el-table-column>
           <el-table-column prop="workId" label="作品编号"></el-table-column>
           <el-table-column prop="workName" label="作品名称"></el-table-column>
           <el-table-column prop="competitionName" label="赛项"></el-table-column>
           <el-table-column prop="school" label="学校"></el-table-column>
           <el-table-column prop="leaderName" label="队长"></el-table-column>
           <el-table-column prop="awardName" label="参赛状态">
           </el-table-column>
           <el-table-column prop="topStatus" label="置顶">
              <template slot-scope="{row}">
                <el-switch
                @change="changetop(row)"
                        v-model="row.topStatus"
                        :active-value="1"
                        :inactive-value="0"
                        active-text=""
                    ></el-switch>
             </template>
           </el-table-column>
           <el-table-column prop="openDownloadStatus" label="是否允许对外下载">
              <template slot-scope="{row}">
                <el-switch
                @change="isdownload(row)"
                        v-model="row.openDownloadStatus"
                        :active-value="1"
                        :inactive-value="0"
                        active-text=""
                    ></el-switch>
             </template>
           </el-table-column>
          <el-table-column label="操作" min-width="165">
              <template slot-scope="{row}">
                <el-button  @click="exporTable(row.workId)" type="text">下载作品</el-button>
                 <!-- <el-button type="text" v-down="['https://oss.moocollege.com/2072/webFile/x0skUDV5_1649403062924.pdf','图片']">下载作品</el-button> -->
              </template>
          </el-table-column>
       </el-table>
         <el-pagination
         style="text-align-last: center;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      current-page.sync="1"
      :page-size="form.pageSize"
      layout=" prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import network from '@@/api/jxapi'
import jxapi from "@/api/jxapi/index";
export default {
  data(){
    return{
      lastlist:[],
      compets: {
        lazy: true,
        async lazyLoad(node, resolve) {
          const { level, value, parent } = node;

          switch (level) {
            case 0:
              let groups = await jxapi.queryDowmGroup();
              resolve(
                groups.map((item) => ({
                  value: item.id,
                  label: item.groupName,
                  leaf: false,
                }))
              );
              //查询下级组织/usercenter/group/queryDowmGroup?groupId=13198
              break;
            case 1:
              let years = await jxapi.queryCompetitionYears({
                data: { groupId: value },
              });
              if (typeof years != "object"){
                resolve([{ value: years, label: years, leaf: false }]);
              }
              else{
                 resolve(
                  years.map((item) => ({
                    value: item,
                    label: item,
                    leaf: false,
                  }))
                );
              }

              break;
            case 2:
              let compets = await jxapi.queryCompetitionByGroupId({
                data: { competitionYear: value, groupId: parent.value },
              });
              resolve(
                compets.map((item) => ({
                  value: item.id,
                  label: item.competitionName,
                  leaf: false,
                }))
              );
              break
            case 3:
                let compets1 = await jxapi.getCompetitionChildList({
                data: { competitionId: value },
              });
              let ids = []
              compets1.childs.forEach(item => {
                ids.push(item.id)
              })
              compets1.childs.unshift({
                  id: ids,
                  name: '全部',
                  leaf: true,
                }),
              resolve(
                compets1.childs.map((item) => ({
                  value: item.id,
                  label: item.name,
                  leaf: true,
                }))
              );
              break;
            //根据选取的组织id和年份查询主竞赛
          }
        },
      },
      loading:false,
      tableData:[],
        yearList:[],
       form: {
         year:undefined,
         awardName:undefined,
         competitionName:undefined,
         pageNum:1,
         pageSize:10,
         searchValue:undefined,
         competitionIds:undefined,
       },
       total:0,
       awardlist:[],
      //  选中的id
       ids:[],
       arrlist:[],
       istrue:0
    }
  },
  async created(){
     let res =await network.getCompetitionYears()
     if(res=='error') return;
     if(!res) return this.$message.warning('未查询到竞赛年份，请核查');
     this.yearList = res;
     //初始的时候，年份的值
     this.form.year = res[0]
     this.getList()
     let res1 = await network.getAllAward()
     if(res=='error') return
     this.awardlist  = res1
     let res2 = await network.getSchedule({data:{
       competitionId : localStorage.getItem('competitionId')
     }})
     if(res2 == 'error') return
     this.lastlist = res2.competitionTimes
  },
  methods:{
    async allopendown(){
      if(this.istrue == 0){
        this.istrue = 1
      }else{
        this.istrue = 0
      }
      let arr =undefined
      if(this.form.competitionIds){
          arr = this.form.competitionIds.split(',')
      }
      let params ={
          year:this.form.year,
          awardName:this.form.awardName,
          competitionName:this.form.competitionName,
         searchValue:this.form.searchValue,
         competitionIds:arr?.map(num=>parseInt(num)),
         workIds:[0],
         openDownloadStatus:this.istrue
      }
      let res = await network.changeWorkOpenDownloadStatus({data:params})
       if(res=='error') return this.$message.error('修改失败');
       this.getList()
      this.$message.success('批量修改成功')
    },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.form.pageNum = val
        this.getList()
        console.log(`当前页: ${val}`);
      },
      //批量下载
        async exporTable(id){
          let data = undefined
          if(!id){
            if(this.ids.length>0){
              data = {workIds:this.ids.join(',')}
              this.downloadstuwork(data)
            }else{
              this.$message.info('暂无数据')
            }
          }else{
            data = {workIds:id}
            this.downloadstuwork(data)
          }
        },
    // 下载作品
    async downloadstuwork(data){
      this.loading = true
       let downtable = await network.downloadWork1({data})
       this.loading = false
        if(downtable=='error') return
        window.open(downtable)
    },
    // 是否置顶
    async changetop(row){
       let res = await network.changeWorkTopStatus({data:{workIds:row.workId,topStatus:row.topStatus}})
       if(res=='error') return this.$message.error('修改失败');
       this.$message.success('修改成功')

    },
    // 是否可以下载
    async isdownload(row){
      let res = await network.changeWorkOpenDownloadStatus({data:{workIds:[row.workId],openDownloadStatus:row.openDownloadStatus}})
      if(res=='error') return this.$message.error('修改失败');
      this.$message.success('修改成功')
      // 对多选的限制
      // if(row.openDownloadStatus == 0){
      //   this.ids.forEach((item,index) => {
      //   if(item == row.workId){
      //     this.arrlist.splice(index,1)
      //   }
      // })
      // }else{
        // this.arrlist.push(row)
      // }
      // console.log(res);
      // this.selectionChange(this.arrlist)
    },
       competitionsChange(val) {
          this.form.year = val[1]
      if (typeof val == "object") val = val[val.length - 1];
      this.form.pageNum = 1;
      if(typeof val !== 'object'){
        val = val
      }else{
        val = val.length>0 && val.join(',')
      }
      this.form.competitionIds = val;
      if(this.form.competitionIds){
        this.getList()
      }

    },
    async getList(){
      this.loading = true
      console.log(this.form);
      let res =await network.listResourcePool({data:this.form})
      if(res=='error') return;
      this.tableData = res.list
      this.total = res.total
      this.loading = false
    },
    selectionChange(row){
      this.arrlist = row
      this.ids = []
      row.forEach(item => {
        this.ids.push(item.workId)
      })
    },
  }
}
</script>

<style scoped>
.workmanagement{
  text-align-last: left;
  margin: 4px 20px;
  margin-top: 100px;
}
::v-deep .el-loading-spinner{
  text-align-last: center;
}
</style>
