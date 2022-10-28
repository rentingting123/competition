<template>
  <div class="teamtable">
      <el-table  v-loading="loading" :empty-text="$t('searchTeam.noTeam')" :data="teams" :header-cell-style="{background:'#f3f3f3'}" class="table" border style="">
        <el-table-column type="index" align="center" :label="$t('searchTeam.index')" width="60"></el-table-column>
        <el-table-column prop="competitionName"  :label="$t('searchTeam.comparname')"  min-width="165">
            <!-- <template slot-scope="scope"> -->
                <!-- <p style="color: #1D86FF;cursor: pointer;" @click="skin(scope.row)">{{scope.row.groupName}}</p> -->
            <!-- </template> -->
        </el-table-column>
        <el-table-column prop="competitionChildName" align="center" :label="$t('searchTeam.comname')"></el-table-column>
        <el-table-column prop="groupName" align="center" :label="$t('searchTeam.teamname')" ></el-table-column>
        <el-table-column prop="teamLeader" align="center" :label="$t('searchTeam.captain')" ></el-table-column>
        <el-table-column prop="menber" align="center" :label="$t('searchTeam.peoplenum')"></el-table-column>
        <el-table-column prop="labels" align="center" :label="$t('searchTeam.teamtap')" ></el-table-column>
        <el-table-column align="center" :label="$t('searchTeam.operation')" min-width="100">
          <template slot-scope="scope">
             <el-button
                 size="mini"
                 type="text"
                 :disabled="scope.row.disables || scope.row.applyStatus == 1 || false"
                 @click="getpeople(scope.row)">
                     {{$t('searchTeam.jointeam')}}
                 </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      current-page.sync="1"
      :page-size="pageSize"
      style="text-align-last:center;width:100%"
      layout="prev, pager, next"
      :total="total">
    </el-pagination>
      <el-dialog
      :title="$t('searchTeam.jointeam')"
      :visible.sync="dialogVisible"
      width="50%">
      <span> 确认提交加入申请？</span>
      <span slot="footer" class="dialog-footer" style="text-align-last:right">
        <el-button @click="dialogVisible = false">{{$t('searchOwn.cancel')}}</el-button>
        <el-button type="primary" @click="submitjoin()">{{$t('searchOwn.submitjointeam')}}</el-button>
      </span>
    </el-dialog>
     <el-dialog
     :before-close="handleClose"
      title=""
      :visible.sync="checkdialog"
      width="30%">
        <p class="text">你已成功提交申请，请等待对方处理您的申请<br/>申请结果可在我的团队中查看</p>
        <el-button type="primary" size="mini" @click="topath">个人中心</el-button>
      </el-dialog>
  </div>
</template>

<script>
import network from "@/api/jxapi/index";
export default {
  props:['tag','competitionId'],
  data(){
    return{
       dialogVisible:false,
      checkdialog:false,
      teams:[],
      jointeams:[],
      total:0,
      loading:false,
      pageNum:1,
      pageSize:5,
      groupid:undefined
    }
  },
  created(){
    this.getList()
  },
  mounted(){
     this.$nextTick(function() {
            this.$on('childmethods', function() {
                this.getList()
            });
        });
  },
methods:{
  getList(){
    this.loading = true
    let params = {
      pageSize :this.pageSize,
      pageNum : this.pageNum,
      tag:this.tag,
      competitionId:this.competitionId
    }
     network.findteam({data:params}).then(res => {
                if(res) {
                  this.total = res.total 
                     res.list.forEach(item => {
                       if(item.applyMember == item.maxMember){
                         item.disables = true
                       }
                    item.menber = item.applyMember+'/'+item.maxMember
                })
                this.teams = res.list
                this.loading=false
                }
               
            })
  },
   handleClose(done) {
       this.dialogVisible = false
      this.checkdialog = false
      this.jointeams = []
      },
    topath(){
      this.dialogVisible = false
      this.checkdialog = false
      this.$router.push('/profile')
    },
    async submitjoin(){
       let res = await network.applyGroupByUser({data:{groupId:this.groupid}})
           if(res=='error' | !res) return;
       this.checkdialog = true
    },
        getpeople(row){
        this.groupid = row.groupId
        // this.jointeams.push(row)
      this.dialogVisible = true
    },
   handleSizeChange(val) {
      },
      handleCurrentChange(val) {
         this.pageNum = val
        this.getList()
      }
}
}
</script>
<style>
.el-loading-spinner{
  text-align-last: center;
  /* left: 50%; */
}
</style>
<style lang="less" scoped>
.teamtable{
  ::v-deep .el-table__empty-block{
    text-align-last: center;
  }
   .text{
        text-align-last: center;
    margin-bottom: 20px;
    font-size: 16px;
    letter-spacing: 2px;
  }
  ::v-deep .el-table__empty-block{
    text-align-last: center;
  }
  ::v-deep .el-dialog__body{
    text-align-last: center;
  }
  ::v-deep .el-dialog__footer{
    text-align-last:right;
  }
}
</style>