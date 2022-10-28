<template>
  <div class="owntable">
      <el-table v-loading="loading" :empty-text="$t('searchOwn.noTeam')" :data="teams" :header-cell-style="{background:'#f3f3f3'}" class="table" border style="">
        <el-table-column type="index" align="center" :label="$t('searchOwn.index')" width="60"></el-table-column>
        <el-table-column prop="idcardName"  :label="$t('searchOwn.name')"  min-width="150">
            <!-- <template slot-scope="scope"> -->
                <!-- <p style="color: #1D86FF;cursor: pointer;" @click="skin(scope.row)">{{scope.row.groupName}}</p> -->
            <!-- </template> -->
        </el-table-column>
        <el-table-column prop="academy" align="center" :label="$t('searchOwn.faculty')"></el-table-column>
        <el-table-column prop="major" align="center" :label="$t('searchOwn.major')"></el-table-column>
        <el-table-column prop="labels" align="center" :label="$t('searchOwn.oenTab')"></el-table-column>
        <el-table-column align="center" :label="$t('searchOwn.operation')" width="100">
          <template slot-scope="{row,$index}">
            <el-button
                 size="mini"
                 type="text"
                 @click="getpeople(row,$index)">
                     {{$t('searchOwn.jointeam')}}
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
      :title="$t('searchOwn.caozuo')"
      :visible.sync="dialogVisible"
      width="50%">
      <div class="doo">{{$t('searchOwn.choose')}}</div>
       <el-table :empty-text="$t('searchOwnDialog.noTeam')" :data="teamslist" :header-cell-style="{background:'#f3f3f3'}" @current-change="clickChange" class="table" border style="">
          <el-table-column  :label="$t('searchOwnDialog.choose')" prop="groupId"  width="65">
            <template  slot-scope="scope">
              <el-radio :label="scope.row.groupId" v-model="templateRadio">&nbsp;</el-radio>
            </template>
          </el-table-column>
         <el-table-column prop="competitionName" align="center" :label="$t('searchOwnDialog.com')"  min-width="150"></el-table-column>
         <el-table-column prop="competitionChildName" align="center" :label="$t('searchOwnDialog.comchile')"  min-width="150"></el-table-column>
         <!-- <el-table-column prop="groupName" align="center" :label="$t('searchOwnDialog.teamMember')"></el-table-column> -->
         <el-table-column prop="groupName" align="center" :label="$t('searchOwnDialog.teamname')"></el-table-column>
         <el-table-column prop="lables" align="center" :label="$t('searchOwnDialog.tags')"></el-table-column>
      </el-table>
       <el-pagination
      @size-change="handleSizeChange1"
      @current-change="handleCurrentChange1"
      current-page.sync="1"
      :page-size="getpeopledata.pageSize"
      style="text-align-last:center;width:100%"
      layout="prev, pager, next"
      :total="getpeopletotal">
    </el-pagination>
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
        <p class="text">你已成功提交邀请，请等待对方处理您的邀请<br/>邀请结果可在【我的团队-我创建的】中查看</p>
        <el-button type="primary" size="mini" @click="topath">个人中心</el-button>
      </el-dialog>
  </div>
</template>

<script>
import mock from '@@/mock/invitationApply.js'
import network from "@/api/jxapi/index";
export default {
  props:['tag'],
  data(){
    return{
      getpeopletotal:0,
      getpeopledata:{
        pageNum:1,
        pageSize:5,
        inviteeId:undefined
      },
      dialogVisible:false,
      checkdialog:false,
      teamslist:[],
      teams:[],
      total:0,
      pageNum:1,
      pageSize:5,
      loading: false,
      templateRadio:undefined,
      inviteeId:undefined
    }
  },
  created(){
    this.getList()
  },
  methods:{
    clickChange(item){
      this.templateRadio = item.groupId
    },
    async getList(){
      this.loading = true
      let params = {
        pageNum : this.pageNum,
        pageSize :this.pageSize,
        tag : this.tag
      }
       let res = await network.findpeople({data:params})
         if(res=='error' | !res) return;
          this.total = res.total 
          this.teams = res.list
          this.loading=false
    },
    getTemplateRow(index,row){                   
      this.templateRadio = row.applyRecordId;
    },
     handleClose(done) {
       this.dialogVisible = false
      this.checkdialog = false
      },
    topath(){
      this.dialogVisible = false
      this.checkdialog = false
      this.$router.push('/profile')
    },
    async submitjoin(){
      if(this.teamslist.length > 0){
        let res = await network.inviteGroupByLeader({data:{inviteeId:this.inviteeId,groupId:this.templateRadio}})
          if(res=='error' | !res) return;
          this.checkdialog = true
      }else{
        this.$message.warning('暂无团队')
      }
      

      
    },
    async getpeople(row,index){
      this.inviteeId = row.id
      this.getpeopledata.inviteeId = row.id
       let res = await network.getGroupInviteList({data:this.getpeopledata})
         if(res=='error' | !res) return;
          this.getpeopletotal = res.total 
          this.teamslist = res.list
          this.loading=false
      this.dialogVisible = true
    },
     handleSizeChange1(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange1(val) {
        this.getpeopledata.pageNum = val
        this.getpeople()
        console.log(`当前页: ${val}`);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.pageNum = val
        this.getList()
        console.log(`当前页: ${val}`);
      }
  }
}
</script>
<style>
::v-deep .el-loading-mask{
  text-align-last: center !important;
}
 .el-loading-spinner{
  text-align-last: center !important;
  text-align: center !important;
  /* left: 50%; */
}
</style>
<style lang="less" scoped>
.owntable{
  .doo{
        width: 100%;
    margin-top: -22px;
    letter-spacing: 1px;
    text-align-last: left;
    margin-bottom: 13px;
    font-size: 16px;
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