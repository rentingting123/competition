<template>
  <div class="content" v-loading="loading">

    <div v-for="(c,index) in data.compt" :key="index" class="competition">
      <h2 class="arear">
        <span :class="{'c1':c.arear=='国际,亚太','c2':c.arear=='国赛','c3':c.arear=='省赛','c4':c.arear=='校赛','c':true}"></span>{{c.arear}}
        <span> · {{data.title}}</span>
        <div class="toolbar">
          <!-- 210326 永乐要求放在上面 -->
          <!-- <span v-if="group_type==1" @click="expertComReport"><i class="el-icon-download"></i>竞赛报告</span>
          <span v-if="group_type==1" @click="expertComMan"><i class="el-icon-download"></i>竞赛手册</span>
          <span v-if="group_type==3" @click="expertCom"><i class="el-icon-download"></i>竞赛手册</span> -->
          <!-- 设置本年度获奖学生信息 21425 发现脏数据报错，永乐要求拿掉 -->
          <!-- <setMessage v-if="group_type==1" :year="data.year" style="display:inline-block;vertical-align: middle;"/> -->
          <!-- 设置奖金及学分 -->
          <!-- 210625 永乐要求隐藏，为后期收费 -->
          <!-- <setBonus v-if="group_type==1" :message="c" :year="year" style="display:inline-block;vertical-align: middle;"/> -->
        </div>
      </h2>
        <el-table :data="c.reword"
          default-expand-all class="table"
          size="mini"
          row-class-name="schoolblocktable"
          header-row-class-name="schoolblocktable"
          :header-cell-style="{background:'#F0F2F4',color:'#787D81'}"
          border style="width: 100%">
          <el-table-column label="竞赛名称" min-width="180">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.competitionName">
                <div slot="reference" class="competitionName">
                  <!-- 排行榜图标 -->
                  <i  class="iconfont" style="color: #DC021D;font-size:24px;margin-right:5px;">&#xe6bd;</i>
                  <span v-html="scope.row.competitionName"></span>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column type="expand" width="1">
            <template slot-scope="scope">
                <el-button size="small" @click="signupmanage(scope.row)">报名管理</el-button>
                <el-button size="small" @click="resultmanage(scope.row)">获奖管理</el-button>
                <el-button size="small" @click="workmanage(scope.row)">作品管理</el-button>
                <el-button size="small" v-if="group_type!=1" @click="expertmanage(scope.row)">评审管理</el-button>
                <el-button size="small" @click="toConstitution(scope.row)" v-if="group_type==3">章程管理</el-button>
                <el-button size="small" @click="toCompet(scope.row)" v-if="group_type==3">竞赛信息管理</el-button>
                <el-button size="small" v-if="group_type!=1" @click="prize(scope.row)">奖项管理</el-button>
                <uploadMaterials :competitionId='scope.row.competitionId' style="margin-left: 10px;"/>
                <uploadCert :competitionId='scope.row.competitionId' style="margin-left: 10px;"/>
            </template>
          </el-table-column>
          <!-- 210625 永乐要求学校账号隐藏，为后期收费 -->
          <el-table-column prop="level" label="等级" width="90" >
            <template slot-scope="scope">
              <div v-if="!scope.row.levelshow" class="editlevel">
                {{scope.row.level}} <i class="el-icon-edit-outline" @click="editLevel(index, scope.$index)"/>
              </div>
              <el-select v-model="scope.row.level" v-else @change="editLevels(index,scope.$index,scope.row)" @visible-change="res=>editLevelvisible(index,scope.$index,res)">
                <el-option v-for="item in hierarchyInfo" :key="item.type" :label="item.name" :value="item.type">
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="secretariat" label="秘书处" width="135">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.secretariat">
                <div slot="reference" class="competitionName2">
                   {{scope.row.secretariat}}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="organization" label="承办方" width="135">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top-start" :content="scope.row.organization">
                <div slot="reference" class="competitionName2">
                   {{scope.row.organization}}
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="provinceCount" label="覆盖省份" width="55" align='center'></el-table-column>

          <el-table-column prop="schoolCount"  width="75" align='center'>
            <template slot="header">

               <!-- <el-popover
                placement="top-start"
                title="标题"
                width="200"
                trigger="hover"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <el-button slot="reference">hover 激活</el-button>
              </el-popover> -->
                <el-popover
                  placement="top-start"
                  trigger="hover"
                  content="只统计教育部发布的普通高校">
                   <span slot="reference">覆盖<i class="el-icon-info"/>高校</span>
                </el-popover>
            </template>
          </el-table-column>

          <el-table-column prop="awardCount" label="获奖统计" width="55" align='center'></el-table-column>
          <!-- 22.2.22号要求隐藏 <el-table-column prop="specialCount" label="特等" width="55" align='center'></el-table-column>
          <el-table-column prop="oneCount" label="一等" width="55" align='center'></el-table-column>
          <el-table-column prop="twoCount" label="二等" width="55" align='center'></el-table-column>
          <el-table-column prop="threeCount" label="三等" width="55" align='center'></el-table-column>
          <el-table-column prop="otherCount" label="其他" width="55" align='center'></el-table-column> -->
        </el-table>

    </div>
    <el-dialog
      title="奖项管理"
      :show-close="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="dialogVisible"
      width="45%"
      >
      <div class="sysTable">
        <div class="tabHeader">
          <span>奖项名称</span><span>对应奖项</span>
        </div>
        <div class="sysItem" v-for="(item,index) in list" :key="index">
          <div class="left">{{item.awardName}}</div>
          <div class="right">
            <el-select v-model="item.sysAwardName" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :loading="subLoading" @click="subSym">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import setBonus from './setBonus'
import setMessage from './setMessage'
import uploadMaterials from './upload-materials'
import uploadCert from './upload-cert'
import api from "@/views/admin/dataManagement/common/api/api.js"

export default {
  components:{
    setBonus,
    setMessage,
    uploadMaterials,
    uploadCert,
  },
  props:{
      data:{
          type:Object,
          required:true,
          group_type: null,
      },
      year: String
  },
  data() {
    return {
      loading:false,
      dialogVisible:false,  //奖项管理弹窗
      list:[],
      options: [{
          value: '特等奖',
          label: '特等奖'
        }, {
          value: '一等奖',
          label: '一等奖'
        }, {
          value: '二等奖',
          label: '二等奖'
        }, {
          value: '三等奖',
          label: '三等奖'
        }, {
          value: '组织奖',
          label: '组织奖'
        },
        {
          value: '单项奖',
          label: '单项奖'
        }, {
          value: '其他奖项',
          label: '其他奖项'
        } ,{
          value: '秘书处',
          label: '秘书处'
        },
        {
          value: '竞赛承办',
          label: '竞赛承办'
        },
        {
          value: '优秀指导教师',
          label: '优秀指导教师'
        }
      ],
      cid:'',
      subLoading:false,
      hierarchyInfo:[
          {name:"A类",type:'A',title:'主要指竞赛项目主办方为多个国家级部委，简称“部委”'},
          {name:"B类",type:'B',title:'主要指由教育部明确发文资助的竞赛，简称“教育部”'},
          {name:"C类",type:'C',title:'主要指由高等教育学会或教育部高等教学指导委员会主办的竞赛，简称“教指委”'},
          {name:"D类",type:'D',title:'主要指省级或行业主办的竞赛'},
          {name:"E类",type:'E',title:'主要指企业或协会主办的竞赛'},
          {name:"其他",type:'其他',title:'其他'},
      ],

    };
  },
  created(){
    this.group_type = localStorage.getItem('groupType')

  },
  methods:{
    editLevelvisible(i,j,item){
      if(!item){
        this.$set(this.data.compt[i].reword[j],'levelshow',false)
      }
    },
    editLevel(i,j){
      this.$set(this.data.compt[i].reword[j],'levelshow',true)
    },
    async editLevels(i,j,item){
      this.$set(this.data.compt[i].reword[j],'levelshow',false)

      this.$api.get('/Admin/schoolCompetition/updateSchoolCompetitionlevel', {
        cid: item.competitionId,
        level: item.level
      }).then(res => {})

    },
    expertCom(){
      this.loading = true
      api.exportGet({year: this.data.year}).then(res=>{
        this.loading = false
      })
    },
    //奖项管理
    prize(data){
      this.cid = data.competitionId
      this.$api.get("/Admin/Competition/awardManagement", {cid:data.competitionId}).then(res=>{
        this.dialogVisible = true
        if(res.data){
          this.list = res.data
        }
      })

    },
    //奖项管理提交
    subSym(){
      this.subLoading = true
      let data = {
        cid:this.cid,
        awardNameMap:{}
      }
      this.list.forEach(ele =>{
        data.awardNameMap[ele.awardName]=ele.sysAwardName
      })
      this.$api.post("/Admin/Competition/saveAwardManagement", data).then(res=>{
        this.dialogVisible = false
        this.subLoading = false
        this.$router.go(0)
      })
    },
    //竞赛管理
    toCompet(data){
      this.$router.push({path:'/addCompet',query:{id:data.competitionId}})
    },

    signupmanage(row){
      this.$router.push('competySignupDetail/'+row.competitionId)
    },
    resultmanage(row){
      this.$router.push({path:'competyManageDetail/'+row.competitionId, query:{
        gamename: row.name,
        gameyear: row.gameyear,
        gameround: row.gameround
      }})
    },
    workmanage(row){
      this.$router.push('competyWorkDetail/'+row.competitionId)
    },
    expertmanage(row){
      this.$router.push('competyReviewDetail/'+row.competitionId)
    },
    toConstitution(row){
      this.$router.push('constitution/'+row.competitionId)
    },
    //下载竞赛手册
    expertComMan(){
      this.loading = true
      api.exportGet( {year: this.data.year}).then(res=>{
        this.loading = false
      })
    },
    //下载竞赛报告
    expertComReport(){
      this.loading = true
      api.exportGet( {year: this.data.year}).then(res=>{
        this.loading = false
      })
    }
  }
};
</script>

<style lang="less" scope>
.schoolblocktable .el-table__expand-column{
  display: block !important;
  width: 0 !important;
  overflow: hidden;
}
.content {
  padding: 20px 16px;
  background-color: #fff;
  // width: 900px;
  margin: 0 auto 16px;
  h1{
    font-size: 30px;
    color: #5871A9;
    letter-spacing: 4.07px;
  }
  .toolbar{
    text-align: left;
    float: right;
    font-size: 14px;
    font-weight: 400;
    color: #5871a9;
    line-height: 20px;
    letter-spacing: 3px;
    >span{
      margin-right: 10px;
      cursor: pointer;
    }
  }
}
.competition {
  // margin-top: 44px;
  h2{
    font-size: 18px;
    color: #4A4A4A;
    letter-spacing: 1.29px;
    line-height: 24px;
    .c{
      width: 5px;
      height: 17px;
      display: inline-block;
      margin-right: 11px;
      float: left;
      margin-top: 3px;
      background: #00B8E2;
    }
    .c1{
      background: #00B8E2;
    }
    .c2{
      background: #001AE2;
    }
    .c3{
      background: #C500E2;
    }
    .c4{
      background: #FFB800;
    }

  }
  .table{
    margin-top: 12px;
    font-size: 14px !important;
    /deep/.el-table__expand-icon{
      font-size: 0;
    }
    .competitionName{
      color: #5871A9;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .competitionName2{
      /*max-height: 7.2rem;*/
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

}
.sysTable{
  width: 660px;
  border: 1px solid #DEDEDE;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;
  .tabHeader{
    height: 48px;
    background: #F0F2F4;
    span{
      display: inline-block;
      width: 50%;
      height: 100%;
      line-height: 48px;
      padding-left: 12px;
      &:first-child{
        border-right: 1px solid #DEDEDE;
      }
    }
  }
  .sysItem{
    border-bottom: 1px solid #DEDEDE;
    .left{
      width: 50%;
      display: inline-block;
      height: 100%;
      line-height: 48px;
      padding-left: 12px;
      border-right: 1px solid #DEDEDE;
    }
    .right{
      width: 49%;
      display: inline-block;
      height: 100%;
      line-height: 48px;
      padding-left: 12px;
    }

    &:last-child{
      border-bottom: none;
    }
  }
}
.editlevel{
  text-align: center;
  i{
    display: none;
  }
  &:hover{
    i{
      display: inline-block;
    }
  }
}

</style>
