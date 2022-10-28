<template>
    <div id="jingsai">
        <div class="jingsai">
           <div class="jingsaiTop">
              <div class="top flexRowBetween">
                <div class="left">
                <span class="underway" :class="{'current':current == 1 ? true:false}" @click="changeTag(1)">{{$t('myTeam.created')}}</span>
                <span class="history" :class="{ 'current':current == 0 ? true:false}" @click="changeTag(0)">{{$t('myTeam.joined')}}</span>
                <span class="underway " :class="{'current':current == 3 ? true:false}" @click="changeTag(3)">
                  <span class="underway1" v-if="show"></span>
                  {{$t('myTeam.invited')}}
                  </span>
                <span class="history" :class="{ 'current':current == 4 ? true:false}" @click="changeTag(4)">{{$t('myTeam.apply')}}</span>
                <!-- 20210616 团队码加入有问题，隐藏 -->
                <!-- <p class="input_code">
                    <el-input
                    :placeholder="$t('myTeam.asd')"
                    class="input"
                    v-model="inviteCode"
                    @keyup.enter.native="applyAddGroup()"
                    >
                      <el-button slot="append" @click="applyAddGroup">{{$t('myTeam.joinTeam')}}</el-button>
                    </el-input>
                    <i class="iconfont icon-jiaru">&#xe628;</i>
                </p> -->
            </div>
        </div>
        <div class="topBtn">
          <el-button @click="tosearch(0)" type="primary">找人组队</el-button>
          <el-button @click="tosearch(1)" type="primary">找团队</el-button>
        </div>
           </div>
        <div class="main" >
            <div class="search">
                <el-input style="width:270px" :placeholder="$t('myTeam.search')" suffix-icon="el-icon-search" v-model="teamName" @keyup.enter.native="search"></el-input>
                <!-- <el-button type="primary">加入团队</el-button> -->
            </div>
            <div v-if="current == 0" style="text-align:center;"  v-loading="loading">
                <detail  @getlist="getList()" :teams="teams"/>
            </div>
              <div v-else-if="current == 1" style="text-align:center;">
                <createddetail @getlist="getList()"  :teams="teams" v-loading="loading"/>
            </div>
            <div v-else-if="current == 3" style="text-align:center;">
                <invitationApply @getlist="getList()" @isshow='isshow' :current='current' :teams="teams3" v-loading="loading"/>
            </div>
            <div v-else style="text-align:center;">
                <invitaApply  @getlist="getList()" @isshow='isshow' :current='current' :teams="teams4" v-loading="loading"/>
            </div>
            <el-pagination  v-if="total" background layout="total, prev, pager, next" 
                :page-size="pageSize" :current-page.sync="page" :total="total" 
                style="text-align:center"
                @current-change="currentPage"></el-pagination>
        </div>
    </div>
    <!-- <div class="noCompety"  v-if="!loading && teams.length<1">{{$t('myTeam.noTeam')}}</div> -->
  </div>
</template>

<script>
import mock from '@@/mock/invitationApply.js'
import network from "@/api/jxapi/index";
import { mapState } from 'vuex'
import { getGroupId } from '@/utils/commons.js'
import detail from './detail'
import createddetail from './createddetail'
import invitationApply from './invitationApply'
import invitaApply from './invitaApply'
export default {
    components:{
        detail,
        createddetail,
        invitationApply,
        invitaApply
    },
    data() {
        return {
          show:false,
            current: 1, //默认 1我创建的 （0 我加入的）
            inviteCode: "", // 团队码
            teamName: '', //搜索团队名
            page:1,
            pageSize: 5,
            total:2,
            teams:[],
            teams3:[],
            loading: false,
            teams4:[]
        };
    },
    computed: mapState({
        authority: state => state.authorityManagement,
    }),
    methods: {
      async tosearch(num){
        let res = await network.isCompleteInfo()
        if(res=='error' | !res) return this.$message.error('请完善个人信息');
        this.$router.push({path:'/searchteam',query:{type:num}})
      },
      isshow(val){
        this.show= val
      },
    //  getRandomArrayElements(arr, count) {
    //       var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
    //       while (i-- > min) {
    //           index = Math.floor((i + 1) * Math.random());
    //           temp = shuffled[index];
    //           shuffled[index] = shuffled[i];
    //           shuffled[i] = temp;
    //       }
    //       return shuffled.slice(min);
    //   },
        // 进行中，历史标签切换
        changeTag(param) {
            this.page = 1;
            this.current = param
            this.teamName = ''
            this.getList();
        },   
        async temess(type){
           type == 1 ? '':this.loading = true
          let res = await network.getMyBeInvited()
               if(res=='error' | !res) return;
                type == 1 ? '':this.loading = false
                this.total = null
                this.teams3 = res
                let num = 0
                this.teams3.forEach(item => {
                  if(item.inviteStatus == 0){
                    num++
                  }
                })
                if(num !== 0){
                  this.show = true
                }else {
                  this.show= false
                }
        },
        async getList(type) {
          if(type == 1){
            this.loading = true
            let res = await network.getMyTeam({data:{
                  pageNum:this.page,
                  pageSize:this.pageSize,
                  type: this.current,
                  groupName: this.teamName
                }});
                
                 if(res=='error' | !res) return;
                 this.loading = false
                 this.total = res.total
                 this.teams = res.list
            }else{
              this.loading = true
            if(this.current == 3){
              this.temess()
            }else if(this.current == 4){
               this.total = null
              let res = await network.getMyApply()
              if(res=='error' | !res) return;
                this.loading = false
                this.teams4 = res
            }else{
              let res = await network.getMyTeam({data:{
                  pageNum:this.page,
                  pageSize:this.pageSize,
                  type: this.current,
                  groupName: this.teamName
                }});
                
                 if(res=='error' | !res) return;
                 this.loading = false
                 this.total = res.total
                 this.teams = res.list
            }
            }
        },
        search(){
            if(!getGroupId()){
                return this.$message.warning(this.$t('myTeam.noPersonMess'));
            }
            this.page = 1
            this.getList();
        },
        currentPage(){
            this.getList();
        },
        async applyAddGroup() {
            if(!getGroupId()){
                return this.$message.warning(this.$t('myTeam.noPersonMess'));
            }
            if(!this.inviteCode.trim()) return;
            const result = await network.applyAddGroup({
                inviteCode: this.inviteCode.trim()
            });
            if (result != 'error') {
                this.$message.success(this.$t('myTeam.sendSuccess'));
            }
        },
    },
    created() {
      this.$store.dispatch('AuthorityPersonal')
        
    },
    mounted(){
      this.getList(1);
      this.temess(1)
    },
};
</script>

<style lang="less" scoped>
.jingsai {
  .jingsaiTop{
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #d9d9d9;
    .topBtn{
       >button{
      border: none;
      background: rgb(29, 134, 255);
      color: #fff;
      font-size: 16px;
      padding: 5px 10px;
      border-radius: 0.3rem;
      text-align: center;
      cursor: pointer;
    }
    }
   
  }
  .top {
    height: 2.625rem;
    line-height: 2.625rem;
    // border-bottom: 1px solid #d9d9d9;
    display: flex;
    justify-content: space-between;
    .left {
      position: relative;
      .underway,
      .history {
        position: relative;
        background: #f4f4f4;
        border: 1px solid #d9d9d9;
        border-bottom: 0;
        border-radius: 0.3rem 0.3rem 0 0;
        font-size: 0.9rem;
        display: inline-block;
        width: 5rem;
        height: 2.625rem;
        margin-right: 0.5rem;
        text-align: center;
        cursor: pointer;
      }
      .underway1 {
        position: absolute;
        background: red;
        border-radius: 50%;
        width: 10px;
        height: 10px;
        display: block;
        right: -5px;
        top: -5px;
      }
      & > .current {
        background: #fff;
        border-bottom: 1px solid #fff;
        font-weight: bold;
      }
      .input_code {
        display: inline-block;
        position: relative;
        bottom: 0.125rem;
        .input {
          width: 15.625rem;
          input {
            margin-top: -0.1rem;
            height: 1.5rem;
            line-height: 1.5rem;
            padding-left: 1.5rem;
          }
        }
        .icon-jiaru {
          position: absolute;
          left: 0.4rem;
          top: 0.2rem;
          font-size: 1rem;
          color: #9b9b9b;
        }
      }
    }

    .right {
      .create_competition,
      .examine_competition {
        font-size: 0.7rem;
        color: #1d86ff;
        margin-left: 1.5rem;
        display: inline-block;
        height: 2.625rem;
        line-height: 2.625rem;
        cursor: pointer;
        i {
          font-size: 0.8rem;
          margin-right: 0.3rem;
        }
      }
    }
  }
  .main{
      margin-top: 15px;
      .search{
          .el-button{
              float: right;
          }
      }
  }
}
.noCompety {
  padding: 100px;
  text-align: center;
}
</style>
<style>
.input input {

  text-indent: 0.5rem;
}
</style>
