<template>
  <div class="information">
     <el-tabs v-model="activeName" @tab-click="handleClick">
       <el-tab-pane label="用户标签" name="first">
         <div class="title">
            <el-form :inline="true" :model="tabform" ref="tabform" label-width="100px" >
                  <el-form-item label="" prop="label">
                    <el-input v-model="tabform.label" placeholder="标签名称"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="searchtab()">
                      搜索
                    </el-button>
                  </el-form-item>
               </el-form>
               <div>
           <el-button type="primary" @click="addtab">添加用户标签</el-button>
         </div>
         </div>
         <el-table :lazy= true border v-loading="firstTableLoading" :data="tabsList" >
                 <el-table-column prop="label" :label='tabtotalnum'></el-table-column>
                 <el-table-column prop="peopleNum" label="覆盖人数"></el-table-column>
                 <el-table-column prop="creator" label="创建者"></el-table-column>
                 <el-table-column prop="createTime" label="创建时间">
                    <template slot-scope="scope">
                    {{ scope.row.createTime | date }}
                </template>
                 </el-table-column>
                 <el-table-column  label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="getuserList(scope.row)">用户列表</el-button>
                        <el-button type="text" @click="addtab(scope.row)">标签详情</el-button>
                        <el-button type="text" @click="deltab(scope.row)">删除</el-button>
                   </template>
                 </el-table-column>
         </el-table>
          <el-pagination
            :page-size="tabform.pageSize"
            v-if="tabtotal > 0"
            style="    text-align-last: center;"
              :current-page.sync='tabform.pageNum'
              layout="prev, pager, next"
              @current-change='currentChange'
              :total="tabtotal">
          </el-pagination>
        </el-tab-pane>
       <el-tab-pane label="消息记录" name="second">
          <el-form :inline="true" :model="messageform" ref="messageform" label-width="70px" >
                  <el-form-item label="推送标题" prop="title">
                    <el-input v-model="messageform.title" placeholder="请输入推送标题"></el-input>
                  </el-form-item>
                  <el-form-item label="推送内容" prop="content">
                    <el-input v-model="messageform.content" placeholder="请输入推送内容"></el-input>
                  </el-form-item>
                  <el-form-item label="推送时间" prop="startTime">
                       <el-date-picker
                         v-model="messageform.startTime"
                         type="datetime"
                         placeholder="选择日期">
                       </el-date-picker>
                  </el-form-item>
                   <el-form-item label="" prop="endTime">
                        <el-date-picker
                         v-model="messageform.endTime"
                         type="datetime"
                         placeholder="选择日期">
                       </el-date-picker>
                  </el-form-item>
                  <el-form-item label="标签名称" prop="label">
                      <el-select
                      v-model="messageform.label"
                      filterable
                      clearable
                      remote
                      reserve-keyword
                      placeholder="输入标签名称"
                      :remote-method="gettabsname"
                      :loading="comloading">
                      <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="getList()">
                      搜索
                    </el-button>
                  </el-form-item>
               </el-form>
                 <el-table :lazy= true border v-loading="firstTableLoading" :data="messagesList" >
                    <el-table-column prop="title" label="推送标题"></el-table-column>
                    <el-table-column prop="content" label="推送内容"></el-table-column>
                    <el-table-column prop="type" label="推送渠道">
                      <!-- 1站内信 2邮件 -->
                       <template slot-scope="scope">
                            <span v-if="scope.row.type == 1">站内信</span>
                            <span v-else>邮件</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mubiaouser" label="目标用户">
                        <template slot-scope="scope">
                          <div  v-if=" scope.row.labelsType == 1"> 
                            <div style="font-size:13px">标签</div>
                            <span style="color:#50a6ff;cursor: pointer;" @click="onetag(item)" v-for="item in scope.row.labelList" :key="item.id">{{item.label}}</span>
                          </div>
                          <div v-else>
                            <div style="font-size:13px">用户</div>
                            <span v-for="item in scope.row.userList" :key="item.id">{{item.idcardName}}（{{item.belongSchool || item.school}}）</span>
                          </div>
                          
                      </template>
                    </el-table-column>
                    <el-table-column prop="peopleNum" label="覆盖人数"></el-table-column>
                    <el-table-column prop="creator" label="创建人"></el-table-column>
                    <el-table-column prop="createTime" label="创建时间">
                        <template slot-scope="scope">
                            {{ scope.row.createTime | date }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="sendTime" label="推送时间">
                      <template slot-scope="scope">
                          {{ scope.row.sendTime | date }}
                      </template>
                    </el-table-column>
                 </el-table>
                  <el-pagination
                  style="    text-align-last: center;"
            :page-size="messageform.pageSize"
            v-if="messagetotal > 0"
              :current-page.sync='messageform.pageNum'
              layout="prev, pager, next"
              @current-change='currentChange1'
              :total="messagetotal">
          </el-pagination>
       </el-tab-pane>
     </el-tabs>
     <div class="btn">
       <el-button size="mini" @click="addmessage" type="primary">发布消息</el-button>
     </div>
     <addmessage @shuaxin="getList" v-if="addmessagedialog" :close="close"/>
     <addTabs @shuaxin="searchtab" :row="rows"  v-if="addtablog" :updataid="updataid" :close="closetab"/>
     <ueserList :userlittab="userlittab" :userlistid="userlistid" v-if="userlistlog" :close="closeuserlist"/>
     <el-dialog
      title="目标用户详情"
      :visible.sync="onetagtable"
      :append-to-body='true'
      width="1100px">
      <div class="mi">
                <div>
                标签名称：{{onetagtablelist.label}}
            </div>
            <div>
                标签属性：<span v-if="onetagtablelist.competitionName">{{onetagtablelist.competitionName}},</span>
                    <span v-if="onetagtablelist.competitionChildName">{{onetagtablelist.competitionChildName}},</span>
                    <span>{{onetagtablelist.promote}}</span>
                
            </div>
            <div class="last">
                <div>备注：{{onetagtablelist.remark}}</div>
                <div><span v-if="onetagtablelist.peopleNum">用户数：{{onetagtablelist.peopleNum}}</span></div>
            </div>
           </div>
            <el-table :lazy= true border v-loading="firstTableLoading" :data="tabsLists" >
               <el-table-column prop="idcardName" label="姓名"></el-table-column>
               <!-- <el-table-column prop="shenfen" label="身份"></el-table-column> -->
               <el-table-column prop="loginPhoneNumber" label="手机号码"></el-table-column>
               <el-table-column prop="email" label="邮箱"></el-table-column>
               <el-table-column prop="school" label="学校"></el-table-column>
           </el-table>
            <el-pagination
            style="text-align-last: center;"
            :page-size="pageSize"
            v-if="tabsListstotal > 0"
                :current-page.sync='pageNum'
                layout="prev, pager, next"
                @current-change='currentChange2'
                :total="tabsListstotal">
            </el-pagination>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onetagtable = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import network from '@@/api/jxapi'
import addmessage from './common/addmessage'
import addTabs from "./common/addtab"
import ueserList from "./common/ueserList"
export default {
  components:{
    addmessage,
    addTabs,
    ueserList
  },
  data(){
    return{
      options:[],
      onetagtable:false,
      rows:{},
      userlittab:{},
      messagetotal:0,
      tabtotalnum:'全部标签',
      tabtotal:0,
      onetagtablelist:{},
      comloading:false,
      messageform:{
        title:'',
        content:'',
        startTime:'',
        endTime:'',
        label:'',
        pageSize:15,
        pageNum:1
      },
      updataid:undefined,
      messagesList:[],
      tabsList:[],
      firstTableLoading:false,
      activeName: 'first',
      addmessagedialog:false,
      addtablog:false,
      userlistlog:false,
      userlistid:"",
      tabform:{
        pageSize:15,
        pageNum:1,
        label:''
      },
      tabsLists:[],
      tabsListstotal:0,
      pageNum:1,
      pageSize:5
    }
  },
  created(){
    this.searchtab()
    this.getList()
  },
  methods:{
    async gettabsname(query){
            if(query !== ''){
                this.comloading = true
                 let res = await network.getMessageLabelList({
                data: {
                  label: query,
                  pageSize:20,
                  pageNum:1,
                }
              });
               if (res == "error") return;
               this.options = res.list
               this.comloading = false
            }
        },
     currentChange2(page){
            this.pageNum = page
            this.onetag()
        },
    async onetag(row){
      if(row){
        this.onetagtablelist = row
      }
      
       let params = {
           id:this.onetagtablelist.id,
           pageNum : this.pageNum,
           pageSize : this.pageSize
       }
       let res = await network.getUserList({data:params})
       if(res=='error') return;
       this.tabsLists = res.list
       this.tabsListstotal = res.total
       this.onetagtable = true
    },
        currentChange(page){
            this.tabform.pageNum = page
            this.searchtab()
        },
         currentChange1(page){
            this.messageform.pageNum = page
            this.getList()
        },
    // 用户列表
    getuserList(row){
      this.userlistid = row.id
      this.userlittab = row
      this.userlistlog = true
    },
    // 搜索标签接口
    async searchtab(){
      let res = await network.getMessageLabelList({data:this.tabform})
      if(res=='error') return
      this.tabsList = res.list
      if(res.total>0){
        this.tabtotalnum = `全部标签（${res.total}）`
      }else{
        this.tabtotalnum = `全部标签`
      }
      this.tabtotal = res.total
      
    },
     closetab(){
            this.addtablog = false;
        },
        closeuserlist(){
            this.userlistlog = false;
        },
        async deltab(row){
           this.$confirm("删除后无法恢复，请确认是否删除?", "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                let res = await network.deleteMessageLabel({data:{
                    id:row.id
                }})
                if(res=='error') return;
                this.$message.success('删除成功')
                this.searchtab();
            })
        },
        addtab(row){
          this.updataid = row.id
          this.rows = row
            this.addtablog = true
        },
     handleClick(tab, event) {
        // console.log(tab, event);
      },
      addmessage(){
        this.addmessagedialog = true
      },
      close(){
          this.addmessagedialog = false;
          this.getList()
      },
      async getList(){
        let htime = ''
        let dtime = ''
        if(!this.messageform.endTime){
          dtime = ''
        }else{
          dtime = moment(this.messageform.endTime).format('YYYY-MM-DD HH:MM:ss')
        }
        if(!this.messageform.startTime){
          htime = ''
        }else{
          htime = moment(this.messageform.startTime).format('YYYY-MM-DD HH:MM:ss')
        }
        
        let params = {
           title:this.messageform.title,
           content:this.messageform.content,
           startTime:htime,
           endTime:dtime,
           label:this.messageform.label,
           pageSize:this.messageform.pageSize,
           pageNum:this.messageform.pageNum,
        }
        let res = await network.getTaskList({data:params})
        if(res=='error') return
        this.messagesList = res.list
        this.messagetotal = res.total
      }
  },
      filters:{
        date(val){
            if(!val) return;
            return moment(val).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}
</script>
<style>
.el-table th{
      background: #f0f2f4 !important;
}
</style>
<style scoped>
.btn{
  position: absolute;
  top: 17px;
  right: 22px;
}
.information{
  text-align-last: left;
  position: relative;
}
.title{
  display: flex;
  justify-content: space-between;
}
.mi{
    font-size: 18px;
    line-height: 34px;
}
.im>div{
    height: 34px;
}
.last{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>