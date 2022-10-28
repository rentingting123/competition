<template>
<div>
    <el-table :empty-text="$t('yaoqing.noTeam')" :data="teams" :header-cell-style="{background:'#f3f3f3'}" class="table" border style="">
        <el-table-column type="index" align="center" :label="$t('yaoqing.index')" width="60"></el-table-column>
        <el-table-column prop="competitionName"  :label="$t('yaoqing.comparname')"  min-width="150">
            <!-- <template slot-scope="scope"> -->
                <!-- <p style="color: #1D86FF;cursor: pointer;" @click="skin(scope.row)">{{scope.row.groupName}}</p> -->
            <!-- </template> -->
        </el-table-column>
        <el-table-column prop="competitionChildName"  :label="$t('yaoqing.comname')" ></el-table-column>
        <el-table-column prop="groupName"  :label="$t('yaoqing.teamname')"  ></el-table-column>
        <el-table-column prop="teamLeader"  :label="$t('yaoqing.captain')" ></el-table-column>
        <el-table-column prop="inviteStatus"  :label="$t('yaoqing.status')" >
            <template slot-scope="scope">
                <span v-if="scope.row.inviteStatus == 0">待确认</span>
                <span v-else-if="scope.row.inviteStatus == 2">已拒绝</span>
                <span v-else-if="scope.row.inviteStatus == 1">已同意</span>
            </template>
        </el-table-column>
         <!-- <el-table-column prop="applyStatus"  :label="$t('yaoqing.status')" >
            <template slot-scope="scope">
                <span v-if="scope.row.applyStatus == 0">待确认</span>
                <span v-else-if="scope.row.applyStatus == 1">已拒绝</span>
                <span v-else-if="scope.row.applyStatus == 2">已同意</span>
            </template>
        </el-table-column> -->
        <el-table-column v-if="current == 3" prop="operation"  :label="$t('yaoqing.operation')"  min-width="100">
            <template slot-scope="scope">
                <el-button
            size="mini"
            :disabled="scope.row.inviteStatus == 1 ||scope.row.inviteStatus == 2"
            type="text"
            @click="agreen(1,scope.row)">
                {{$t('invitationRecord.agree')}}
            </el-button>
             <el-button
            size="mini"
            :disabled="scope.row.inviteStatus !== 0"
            type="text"
            @click="agreen(2,scope.row)">
                {{$t('invitationRecord.refuse')}}
            </el-button>
            </template>
        </el-table-column>
    </el-table>
     
    <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%">
  <span>{{title}}</span>
  <span slot="footer" class="dialog-footer" style="  text-align-last: center;">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="tongyi">确定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import network from "@/api/jxapi/index";
export default {
    props:['teams','current'],
    data(){
        return{
            dialogVisible:false,
            title:'',
            id:undefined,
            show:true,
            inviteRecordId:undefined,
            agreenstatus:undefined
        }
    },
    created(){
        this.issshow()
         this.$emit('isshow',false)
    },
    methods:{
        currentPage(val){
            this.getList();
        },
        issshow(){
            let num = 0
        if(this.teams){
            console.log(this.teams);
        }
        // if(num == 0){
        //     this.$emit('isshow',false)
        //     // this.show = false
        // }
        },
        async tongyi(){
            let res = await network.agreeJoinGroup({data:{inviteRecordId:this.inviteRecordId,status:this.agreenstatus}})
             if (res == "error" || !res) return;
             this.$emit('getlist')
            if(this.title =='确定同意加入该团队并报名参加竞赛' ){
                 this.dialogVisible = false
                 this.$message.success('加入成功')
            }else{
                 this.dialogVisible = false
                 this.$message.success('拒绝成功')
            }
            
            
        },
    //      changearr(id,statu){
    //          let num = 0
    //     this.teams.forEach(item => {
            
    //       if(item. id == id){
    //         if(statu == 0){
    //             this.$set(item,'status', 2)
    //         }else{
    //           this.$set(item,'status', 1)
    //         }
    //       }
    //       if(item.status == 0){
    //             num++
    //         }
    //     })
    //     console.log(this.teams);
    //     if(num == 0){
    //         this.$emit('isshow',false)
    //     }
    //   },
        agreen(num,row){
            if(num == 1){
                this.inviteRecordId = row.inviteRecordId
                this.agreenstatus = num
                this.title = '确定同意加入该团队并报名参加竞赛'
                this.dialogVisible = true
            }else{
               this.inviteRecordId = row.inviteRecordId
                this.title = '确定拒绝加入该团队参加竞赛'
                this.agreenstatus = num
                 this.dialogVisible = true
            }
            this.id = row.inviteRecordId
        },
        skin(item) {
            this.$router.push({path:`/competition/team/${item.groupId}/${item.competitionId}`});
        },
    }
}
</script>

<style lang="less" scoped>
.table{
    width: 100%;
    margin: 16px 0;
    .headerrow{
        background-color: #999;
    }
}
</style>
