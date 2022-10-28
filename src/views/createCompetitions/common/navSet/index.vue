<template>
  <div>
    <div class="detail_nav">
      <span @click="offsetLeft" v-if="btnShow">&lt;</span>
      <div class="astrict">
        <div class="astrictNav">
          <ul ref="navUl">
            <router-link
              v-for="(item,index) in linkList"
              :key="'tab_' + index"
              :to="path(item,index)"
              tag="li"
            >{{item.tabName}}</router-link>
            <router-link
              v-for="(item, index) in navList"
              :key="'newpage_' + index"
              :to="{name:'competitionPage',params:{competitionId:index}}"
              tag="li"
            >新增页面</router-link>
          </ul>
        </div>
      </div>
      <span @click="offsetRight" v-if="btnShow">&gt;</span>
      <div class="detail_set" @click="setting">
        <span>设置</span>
      </div>
    </div>

    <!--标签设置-->
    <el-dialog title="标签设置" :modal-append-to-body="false" :append-to-body='true' :close-on-click-modal= false :visible.sync="detail_set" width="50rem">
      <div v-for="(item,index) in add_titleList" :key="'tabsetting_' + index">
        <div class="detail_title" v-if="index<=7">
          <span v-if="!item.tabNameEdit" @click="editTags('tabName',index,true)">
            {{item.tabName}}: 
            <i class="iconfont">&#xe634;</i>
          </span>
          <el-input style="width:150px" :ref="'tabName'+index" v-else @blur="editTags('tabName',index,false)" v-model="item.tabName" size="small" />
          <el-radio-group :disabled='!item.authority' v-model="item.display">
            <el-radio :label="1">公开</el-radio>
            <el-radio :label="2">隐藏</el-radio>
            <el-radio :label="3">参赛者可见</el-radio>
          </el-radio-group>
          <el-tooltip content="固定标签不可删除。">
            <i class="right el-icon-warning"></i>
          </el-tooltip>
        </div>
        <div class="detail_title add_titles" v-else>
          <span>{{item.tabName}}:</span>
          <el-radio-group v-model="item.display">
            <el-radio :label="1">公开</el-radio>
            <el-radio :label="2">隐藏</el-radio>
            <el-radio :label="3">参赛者可见</el-radio>
          </el-radio-group>
          <i class="right el-icon-delete" @click="deleteTitle(index)"></i>
        </div>
      </div>

      <div class="add_title" @click="newTabVisible=true" v-if="add_show">
        <!-- <i>
          <img src="https://web.moocollege.com/mooc/hzq/competition/competition/plusSign.svg" width="10" height="10">
        </i> -->
        <i class="iconfont">&#xe631;</i>
        <span>新增页面</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detail_set = false">取 消</el-button>
        <el-button type="primary" @click="saveTabs">完 成</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新建" :modal-append-to-body="false" :append-to-body='true' :close-on-click-modal= false :visible.sync="newTabVisible">
      <el-form :model="newTabForm" :rules="newTabRules">
        <el-form-item label="名称" label-width="120px" prop="name">
          <el-input v-model="newTabForm.name" autocomplete="off" placeholder="请输入新建名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newTabVisible = false">取 消</el-button>
        <el-button type="primary" @click="createNewTab">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import network from '@/api/jxapi/index'
import { mapState } from 'vuex';
export default {
    props:['setTabs', 'competitionId'],
    data(){
        return{
          navList: [], // 新增子路由列表
          linkList: [
            {'tabName':'竞赛信息','display':1},
            {'tabName':'参赛指南','display':1},
            {'tabName':'赛项','display':1},
            {'tabName':'选手','display':1},
            {'tabName':'团队','display':1},
            {'tabName':'动态','display':1},
            {'tabName':'排行榜','display':1},
            {'tabName':'作品展示','display':1}
          ], // 标签页
          listAuthority:[],
          btnShow: false, // 子路由处按钮
          
          
          detail_set: false, //标签设置弹窗
          newTabVisible: false,//新建标签弹框
          newTabForm:{name: ''},//新建标签表单
          newTabRules:{
            name: [
              { required: true, message: '请输入名称', trigger: 'blur' }
            ]
          },
          
          add_titleList: [],  //新增标签列表
          add_show: true, //新增栏
        }
    },
    async created(){
      if(this.competitionId) {
        this.detailsApi();
      }
      await this.$store.dispatch('AuthorityCompetition',this.competitionId)
      this.listAuthority =[
        {'tabName':'竞赛信息',type:0,'authority':this.authority.editCompetitionInfo},
        {'tabName':'参赛指南',type:1,'authority':this.authority.editCompetitionGuide},
        {'tabName':'赛项',type:2,'authority':this.authority.addSubCompetition},
        {'tabName':'选手',type:3,'authority':this.authority.managerCompetitor},
        {'tabName':'团队',type:4,'authority':1},
        {'tabName':'动态',type:5,'authority':this.authority.manageNews},
        {'tabName':'排行榜',type:6,'authority':this.authority.manageRankingList},
        {'tabName':'作品展示',type:7,'authority':this.authority.manageWorks}
      ]// 标签页
    },
    methods:{
      editTags(name, index, flag){
        this.$set(this.add_titleList[index], name+'Edit', flag)
        this.$nextTick(()=>{
          if(flag){
            console.log(this.$refs['tabName'+index][0]);
            this.$refs['tabName'+index][0].focus();
          }
        })
      },
        /*
      * 获取标签页
      */
      async detailsApi () {
        let data = await network.getContorlTab({
          id:this.competitionId,
          data:{
            isSelf: true
          }
        });
        if(data=="error") return;
        this.linkList = data;
        this.setTabs && this.setTabs(this.linkList)
        
        this.$nextTick(() => {
          let excess = this.$refs.navUl.offsetWidth - 960;  // excess超出部分宽度
          if(excess > 0){
            this.btnShow = true;
          }else{
            this.btnShow = false;
          }
        });
        // console.log(res.data.tabs,"------");
      },
        // 删除标题
      deleteTitle(index){
        var that = this;
        
        this.$confirm('确定删除该标签?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          that.add_titleList.splice(index,1);
          const obj = {
            competitionId:that.competitionId,
            list: that.add_titleList,
          };
          let res = await network.tabControl({
            data:obj
          })
          if(res=='error') return;
          // that.add_titleList.splice(index,1);
          // that.detail_set = false;
          that.$message.success('删除成功');
          that.linkList = new Array().concat(that.add_titleList);
          this.setTabs && this.setTabs(this.linkList)
        }).catch(() => {
          that.$message.info('已取消删除');
        });
      },
          /*
      * 标签页路径
      * @params url 标签页
      * @params index 标签下标
      */
      path(item,index){
        let type = item.type
        let url = item.tabName
        let address = null;
        if(type == ""){
          address = this.getPath('/createNewCompetition') 
        } else if(type == '0'){
          address = this.getPath('/createNewCompetition') 
        } else if(type == '1'){
          address = this.getPath('/competition/entryGuide')
        } else if(type == '2'){
          address = this.getPath('/competition/Points')
        } else if(type == '3'){
          address = this.getPath('/competition/player')
        } else if(type == '4'){
          address = this.getPath('/competition/team')
        } else if(type == '5'){
          address = this.getPath('/competition/dynamicState')
        // } else if(type == '6'){
        //   address = this.getPath('/competition/rankingList')
        } else if(type == '6'){
          address = {name:'competitionPage', params:{competitionId:6}, query:{type:url,id:this.competitionId,flag:true}};
        } else if(type == '7'){
          address = this.getPath('/competition/worksShow')
        } else{
          address = {name:'competitionPage', params:{competitionId:index}, query:{type:url,id:this.competitionId,flag:true}};
        }
        return address;
      },
      getPath(url){
        if(this.competitionId){
          return {path:url+'?id='+this.competitionId}
        }else{
          return {path: url}
        }
      },
      // 左键
      offsetLeft(){
        let newLocation = this.$refs.navUl.offsetLeft;
        if(newLocation >= 0){

        }else{
          if(newLocation>-50){
            this.$refs.navUl.style.left = "0px";
          }else{
            this.$refs.navUl.style.left = newLocation + 50 + "px";
          }
        }
      },
      // 右键
      offsetRight(){
        let newLocation = this.$refs.navUl.offsetLeft;  // newLocation当前位置
        let excess = 860 - this.$refs.navUl.offsetWidth;  // excess超出部分宽度

        if(newLocation > excess){
          this.$refs.navUl.style.left = newLocation - 50 + "px";
        }
      },
      // 标签页设置
      async setting(){
        this.detail_set = true;
        this.linkList.concat(this.listAuthority)
        this.linkList.forEach((ele,index) =>{
          this.listAuthority.forEach((item,ind) => {
            if(ele.type==item.type){
              ele.authority=item.authority
            }
          })
        })
        this.add_titleList = new Array().concat(this.linkList);
      },
    async saveTabs(){
        var that = this;
        const obj = {
          competitionId:that.competitionId,
          list: that.add_titleList,
        };
        let res = await network.tabControl({
          data:obj
        })
        if(res=='error') return;
        this.detail_set = false;
        this.$message.success('保存成功');
        this.linkList = new Array().concat(this.add_titleList);
        this.setTabs && this.setTabs(this.linkList)
      },
      async createNewTab(){
        var that = this;
        const obj = {
          competitionId: that.competitionId,
          tabName: that.newTabForm.name,
        };
        let res = await network.competitionTabInfo({data:obj});
        if(res=='error') return;

        this.newTabVisible = false;
        this.$message.success('保存成功');
        await this.detailsApi()
        this.setting();
      },
    },
    computed:mapState({
      authority: state => state.authorityManagement
    })
}
</script>

<style lang="less" scoped>
// 子路由
  .detail_nav {
    width: 1040px;
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    border-radius: 5px 5px 0px 0px;
    margin: 20px auto 16px;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
    .astrict {
      width: 860px;
      margin-right: 20px;
      overflow: hidden;
      .astrictNav {
        width: 1000%;
        position: relative;
      }
    }
    ul {
      position: absolute;
      top: 0;
      left: 0;
      transition: all 0.7s;
      display: flex;
      li {
        margin: 0 20px;
        position: relative;
        cursor: pointer;
        font-size: 14px;
        &.router-link-exact-active {
          color: #1d86ff;
        }
        &:hover {
          color: #1d86ff;
        }
        &.router-link-exact-active::after {
          content: "";
          height: 2px;
          width: 50px;
          background-color: #1d86ff;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      } 
    }
    > span {
      width: 34px;
      opacity: 0.3;
      background: #d8d8d8;
      cursor: pointer;
      transition: all 0.5s;
    }
    > span:hover {
      opacity: 0.7;
    }
    .detail_set {
      height: 50px;
      line-height: 50px;
      margin-right: 16px;
      margin-left: 13px;
      cursor: pointer;
      display: flex;
      align-items: center;
      font-size: 14px;
      &:hover {
        span {
          color: #4199ff;
        }
      }
    }
  }
    /deep/ .el-dialog__header {
    border-bottom: 1px solid #dedede;
    padding: 20px;
    text-align: start;
    font-size: 16px;
  }
  .detail_title {
    width: 500px;
    height: 46px;
    line-height: 46px;
    padding: 0 20px;
    box-sizing: border-box;
    background: #f9f9f9;
    margin: 0 auto 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    font-size: 14px;
    i.right {
      position: absolute;
      right: -34px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 24px;
      cursor: pointer;
    }
  }
  .add_titles {
    i {
      cursor: pointer;
    }
    i:hover {
      color: rgb(219, 23, 20);
    }
  }
  .add_title {
    width: 500px;
    height: 46px;
    box-sizing: border-box;
    background: #f9f9f9;
    margin: 0 auto 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #9b9b9b;
    cursor: pointer;
    i {
      margin-right: 5px;
    }
  }
</style>