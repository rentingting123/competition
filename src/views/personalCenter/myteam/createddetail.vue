<template>
<!-- 我创建的 -->
      <div>
        <el-table width='100%' :empty-text="$t('myTeam.noTeam')" :data="teams" :header-cell-style="{background:'#f3f3f3'}" class="table" border style="">
            <el-table-column type="index" align="center" :label="$t('myTeam.index')" width="60"></el-table-column>
            <el-table-column prop="groupName"  :label="$t('myTeam.groupName')"  min-width="150">
                <template slot-scope="scope">
                    <p style="color: #1D86FF;cursor: pointer;" @click="skin(scope.row)">{{scope.row.groupName}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="teacherName"  :label="$t('myTeam.teacherName')"  ></el-table-column>
             <el-table-column prop="studentName"  :label="$t('myTeam.studentName')" ></el-table-column>
             <el-table-column prop="competitionName"  :label="$t('myTeam.competitionName')" ></el-table-column>
             <el-table-column prop="labels"  :label="$t('myTeam.teamtag')"></el-table-column>
             <el-table-column   :label="$t('myTeam.operation')"   min-width="110">
                <template slot-scope="{ row, $index }">
                   <el-button
                 size="mini"
                 type="text"
                 @click="setTab(row)">
                     {{$t('myTeam.teamtag')}}
                 </el-button>
                 <el-button
                 size="mini"
                 type="text"
                 @click="invitationrecord(row,$index)">
                      {{$t('myTeam.invitationrecord')}} 
                 </el-button>
                </template>
             </el-table-column>
        </el-table>
        <!-- 设置标签 -->
        <el-dialog
        style="text-align:left"
          :title="$t('myTeam.teamtag')"
          :visible.sync="setTabdialog"
          width="30%">
            <el-form :model="tagform"  ref="tagform">
                <el-form-item>
            <div class="year_select">
              <div>
                <div class="tag_type"
                 v-for="(item,index) in tagform.saveSearchLabel" 
                 :key="index"
                 :class="{'active':item.checked}"
                  @click="pitchsaveSearchLabel(index)" >
                  {{item.labelName}}
                  <i class="el-icon-close" v-if="item.checked" @click.stop="closeTag(index)" ></i>
                </div>
                <div class="add_tag" v-if="tagform.saveSearchLabel.length<5">
                    <el-select filterable allow-create default-first-option v-model="addTageName" placeholder="请输入标签">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.value"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  <i class="el-icon-plus" @click="addTag"></i>
                </div>
              </div>
            </div>
        </el-form-item>
            </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="setTabdialog = false">{{$t('myTeam.cancel')}}</el-button>
            <el-button type="primary" @click="tagscheck()">确定</el-button>
          </span>
        </el-dialog>
        <!-- 查看邀请记录 -->
        <el-dialog
        style="text-align:left"
          :title="$t('myTeam.invitationrecord')"
          :visible.sync="invitationrecorddialog"
          width="60%">
          <div>
             <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="已邀请" name="first">
                  <el-table  width='100%' :empty-text="$t('invitationRecord.noinvitationRecord')" :data="yaoqingteam" :header-cell-style="{background:'#f3f3f3'}" class="table" border style="">
                   <el-table-column type="index" align="center" :label="$t('invitationRecord.index')" width="60"></el-table-column>
                   <el-table-column prop="invitee"  :label="$t('invitationRecord.name')"  min-width="150">
                       <!-- <template slot-scope="scope"> -->
                           <!-- <p style="color: #1D86FF;cursor: pointer;" @click="skin(scope.row)">{{scope.row.groupName}}</p> -->
                       <!-- </template> -->
                   </el-table-column>
                   <el-table-column prop="academy"  :label="$t('invitationRecord.faculty')"></el-table-column>
                   <el-table-column prop="major"  :label="$t('invitationRecord.major')" ></el-table-column>
                   <el-table-column prop="labels"  :label="$t('invitationRecord.personalLabel')"></el-table-column>
                   <el-table-column prop="states"  :label="$t('invitationRecord.status')">
                     <template slot-scope="scope">
                         <span v-if="scope.row.status == 0">待确认</span>
                         <span v-else-if="scope.row.status == 1">已同意</span>
                         <span v-else-if="scope.row.status == 2">已拒绝</span>
                     </template>
                    </el-table-column>
                    <!-- <el-table-column    min-width="100" :label="$t('invitationRecord.examine')">
                        <template slot-scope="scope">
                          <el-button
                        size="mini"
                        :disabled="scope.row.states !== 0"
                        type="text"
                        @click="agreen(1,scope.row)">
                            {{$t('invitationRecord.agree')}}
                        </el-button>
                        <el-button
                        size="mini"
                        :disabled="scope.row.states !== 0"
                        type="text"
                        @click="agreen(2,scope.row)">
                            {{$t('invitationRecord.refuse')}}
                        </el-button>
                        </template>
                    </el-table-column> -->
                </el-table>
              </el-tab-pane>
              <el-tab-pane label="申请加入" name="second">
                  <el-table  width='100%' :empty-text="$t('invitationRecord.noinvitationRecord')" :data="yaoqingteam1" :header-cell-style="{background:'#f3f3f3'}" class="table" border style="">
                   <el-table-column type="index" align="center" :label="$t('invitationRecord.index')" width="60"></el-table-column>
                   <el-table-column prop="applyName"  :label="$t('invitationRecord.name')"  min-width="150">
                       <!-- <template slot-scope="scope"> -->
                           <!-- <p style="color: #1D86FF;cursor: pointer;" @click="skin(scope.row)">{{scope.row.groupName}}</p> -->
                       <!-- </template> -->
                   </el-table-column>
                   <el-table-column prop="academy"  :label="$t('invitationRecord.faculty')"></el-table-column>
                   <el-table-column prop="major"  :label="$t('invitationRecord.major')" ></el-table-column>
                   <el-table-column prop="labels"  :label="$t('invitationRecord.personalLabel')"></el-table-column>
                   <el-table-column prop="states"  :label="$t('invitationRecord.status')">
                     <template slot-scope="scope">
                         <span v-if="scope.row.status == 0">待确认</span>
                         <span v-else-if="scope.row.status == 1">已同意</span>
                         <span v-else-if="scope.row.status == 2">已拒绝</span>
                     </template>
                    </el-table-column>
                    <el-table-column    min-width="100" :label="$t('invitationRecord.examine')">
                        <template slot-scope="scope">
                          <el-button
                        size="mini"
                        :disabled="scope.row.status !== 0"
                        type="text"
                        @click="agreen(1,scope.row)">
                            {{$t('invitationRecord.agree')}}
                        </el-button>
                        <el-button
                        size="mini"
                        :disabled="scope.row.status !== 0"
                        type="text"
                        @click="agreen(2,scope.row)">
                            {{$t('invitationRecord.refuse')}}
                        </el-button>
                        </template>
                    </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
              
          </div>
          <span slot="footer" class="dialog-footer">
            <!-- <el-button @click="invitationrecorddialog = false">{{$t('myTeam.cancel')}}</el-button> -->
            <el-button type="primary" @click="invitationrecorddialog = false">{{$t('myTeam.determine')}}</el-button>
          </span>
        </el-dialog>
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
import mock from '@@/mock/invitationApply.js'
export default {
    props:['teams'],
    data(){
        return{
          activeName: 'second',
          title:'',
          dialogVisible:false,
            tagPitch: "",
              options: [{
          value: 'PPT制作',
        }, {
          value: '演讲',
        }, {
          value: '方案编写',
        }, {
          value: '视频拍摄',
        }, {
          value: '视频制作',
        }, {
          value: '配音',
        }, {
          value: '项目管理',
        }, {
          value: '程序编写',
        }, {
          value: '媒体宣传',
        }, {
          value: '机械制作',
        }, {
          value: '美术设计',
        }],
        tongyifouid:undefined,
        idarr:[],
        yaoqingteam:[],
        obj:{},
        yaoqingteam1:[],
        tongyifou:1,
        groupId:0,
         addTageName: "",
            tagform:{
               saveSearchLabel :[]
            },
             setTabdialog: false,
             invitationrecorddialog:false,
        }
    },
    methods:{
       handleClick(tab, event) {
        console.log(tab, event);
      },
      async tongyi(){
            let res = await network.updateApplyState({data:{id:this.tongyifouid,status:this.tongyifou}})
             if(res=='error' | !res) return 
            this.$message.success('操作成功')
            this.invitationrecord(this.obj)
             this.dialogVisible = false
        },
       agreen(num,row){
         this.tongyifou = num
         this.tongyifouid = row.id
            if(num == 1){
               this.title = '确定同意加入该团队并报名参加竞赛'
                this.dialogVisible = true
               
            }else{
              this.title = '确定拒绝加入该团队参加竞赛'
                this.dialogVisible = true
            }
            this.id = row.id
        },
      tagscheck(){
        this.$emit('getlist')
        let addarr = []
        let hasarr = []
        let delarr = []
        this.tagform.saveSearchLabel.forEach(item => {
          if(item.id){
            hasarr.push(item.id)
          }else {
            addarr.push(item.labelName)
          }
        })
       delarr = this.idarr.filter(item=>!hasarr.includes(item))
        let param = {
           delSearchLabel:delarr,
          saveSearchLabel:addarr,
          groupId:this.groupId
        }
        network.updataMyTeamtag({ data: param }).then(res => {
          this.setTabdialog = false
        })
      },
         /**
     * @Description: 选中的标签
     */
    pitchsaveSearchLabel(index) {
      this.tagform.saveSearchLabel[index].checked = this.tagform.saveSearchLabel[index].checked ? 0 : 1;
    },
          //标签切换
    closeTag(index) {
      this.tagform.saveSearchLabel.splice(index, 1);
    },
     addTag() {
      if (!this.addTageName) {
        return this.$message.warning("请输入新增标签内容！");
      }
      this.tagform.saveSearchLabel.push({
        labelName: this.addTageName,
        checked: 0
      });
      this.pitchsaveSearchLabel(this.tagform.saveSearchLabel.length-1)
      this.addTageName = "";
    },
        setTab(row){
            this.setTabdialog = true
            this.groupId = row.groupId
            network.getMyTeamtag({data:{groupId:row.groupId}}).then(res => {
              res.forEach(item => {
                this.idarr.push(item.id)
                item.checked = 0
              })
              this.tagform.saveSearchLabel = res
            })
        },
       async  invitationrecord(row,index){
         this.obj = row
         this.invitationrecorddialog = true
          let res = await network.applyGroupRecorderList({ data:{
          groupId: row.groupId
        } })
        if (res == "error" || !res) return;
          this.yaoqingteam1 = res
        let res1 = await network.inviteGroupRecorderList({data:{
          groupId: row.groupId
        }})
        if (res1 == "error" || !res1) return;
          this.yaoqingteam = res1
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
 .year_select,
  .radio_select {
    /deep/ .el-form-item {
      margin-top: 10px;
    }
    .tag_type {
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
      margin-top: 10px;
      margin-right: 10px;
      font-size: 14px;
      color: #1d86ff;
      padding: 6px 10px;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px solid #1d86ff;
      height: 31px;
      line-height: 20px;
      margin-top: 0px;
      border-radius: 98px;
      i {
        margin-left: 10px;
      }
    }
    .add_tag {
      display: inline-block;
      vertical-align: middle;
      position: relative;
      font-size: 0;
      height: 31px;
      background: #ffffff;
      border: 1px solid #1d86ff;
      border-radius: 98px;
      // margin-top: 10px;
      /deep/.el-input--suffix .el-input__inner{
            width: 115px;
    height: 31px;
        padding: 6px 33px 6px 10px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: none;
    border: 0;
    border-radius: 98px;
    background-color: transparent;
      }
      /deep/.el-select>.el-input{
        line-height: 31px;
        height: 31px;
      }
      input {
        width: 115px;
        height: 31px;
        padding: 6px 10px;
        box-sizing: border-box;
        outline: none;
        border: 0;
        border-radius: 98px;
        background-color: transparent;
      }
      i {
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        position: absolute;
        top: -1px;
        right: -2px;
        color: #ffffff;
        background-color: #1d86ff;
      }
    }
    .active {
     color: #ffffff;
    background: #1d86ff;
    height: 31px;
    margin-top: 0;
    line-height: 20px;
    }
    .title {
      font-size: 14px;
      color: #4a4a4a;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
  }
  .setting_model {
  cursor: pointer;
  margin: 0 auto;
  overflow: auto;
  text-align: left;
  padding: 0px 100px;
  box-sizing: border-box;
  overflow: hidden;
  h1.title {
    font-size: 14px;
    color: #4a4a4a;
    margin-top: 20px;
    letter-spacing: 1px;
    span {
      font-size: 12px;
      color: #9b9b9b;
      letter-spacing: 0.86px;
    }
  }
  .delname {
    cursor: pointer;
    float: right;
    margin-right: -30px;
    margin-top: -50px;
    i:hover {
      color: #d0021b;
    }
  }
  .type_select {
    .type_list {
      margin-top: 10px;
      display: flex;
      li {
        font-size: 14px;
        color: #1d86ff;
        margin-right: 10px;
        padding: 6px 10px;
        box-sizing: border-box;
        border: 1px solid #1d86ff;
        border-radius: 98px;
        cursor: pointer;
      }
      .active {
        color: #ffffff;
        background: #1d86ff;
      }
    }
    .group_num_show{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .group_num {
      display: inline-block;
      vertical-align: middle;
      /deep/ .el-input-number {
        margin-top: 10px;
      }
    }
  }
  .radio_select {
    margin-top: 20px;
    font-size: 14px;
    color: #4a4a4a;
    .schoolNum {
      width: 126px !important;
    }
    .competition_group {
      display: inline-block;
      vertical-align: middle;
    }
    .personage {
      vertical-align: top;
    }
    .uploadP {
      display: inline-block;
      vertical-align: middle;
      .delete-btn {
        cursor: pointer;
        float: right;
      }
      /deep/ .el-upload-dragger {
        padding-top: 30px;
      }
      .el-upload__text {
        padding-top: 30px;
      }
      .el-upload__tip {
        padding-top: 10px;
      }
      .biaoming {
        border: 1px solid #1d86ff;
        border-radius: 5px;
        padding: 5px 20px 5px 20px;
        margin-top: -5px;
        float: left;
        color: #1d86ff;
        span {
          font-size: 14px;
          letter-spacing: 0;
        }
      }
      .cert {
        color: #ffffff;
        background-color: #1d86ff;
      }
      .yishengcheng {
        float: left;
        margin-left: 10px;
        i {
          color: #52c41a;
        }
        span {
          font-size: 16px;
          color: #787d81;
          letter-spacing: 0;
        }
      }
    }
    .el-danxiao {
      display: inline-block;
      vertical-align: middle;
      width: 150px;
      text-align: left;
    }
  }
  .year_select,
  .radio_select {
    /deep/ .el-form-item {
      margin-top: 10px;
    }
    .tag_type {
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
      margin-top: 10px;
      margin-right: 10px;
      font-size: 14px;
      color: #1d86ff;
      padding: 6px 10px;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px solid #1d86ff;
      border-radius: 98px;
      i {
        margin-left: 10px;
      }
    }
    .add_tag {
      display: inline-block;
      vertical-align: middle;
      position: relative;
      font-size: 0;
      background: #ffffff;
      border: 1px solid #1d86ff;
      border-radius: 98px;
      margin-top: 10px;
      input {
        width: 115px;
        height: 31px;
        padding: 6px 10px;
        box-sizing: border-box;
        outline: none;
        border: 0;
        border-radius: 98px;
        background-color: transparent;
      }
      i {
        display: inline-block;
        vertical-align: middle;
        cursor: pointer;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        text-align: center;
        line-height: 32px;
        font-size: 14px;
        position: absolute;
        top: -1px;
        right: -2px;
        color: #ffffff;
        background-color: #1d86ff;
      }
    }
    .active {
          color: #ffffff;
    background: #1d86ff;
    height: 31px;
    margin-top: 0;
    line-height: 20px;
    }
    .title {
      font-size: 14px;
      color: #4a4a4a;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
  }
    .type_select {
    .type_list {
      margin-top: 10px;
      display: flex;
      li {
        font-size: 14px;
        color: #1d86ff;
        margin-right: 10px;
        padding: 6px 10px;
        box-sizing: border-box;
        border: 1px solid #1d86ff;
        border-radius: 98px;
        cursor: pointer;
      }
      .active {
        color: #ffffff;
    background: #1d86ff;
    height: 31px;
    margin-top: 0;
    line-height: 20px;
      }
    }
    .group_num_show{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .group_num {
      display: inline-block;
      vertical-align: middle;
      /deep/ .el-input-number {
        margin-top: 10px;
      }
    }
  }
  .round_select .title {
    margin-bottom: 10px;
  }
}
</style>
