<template>
  <div id="jingsai">
    <div class="jingsai">
      <div class="top flexRowBetween">
        <div class="left">
          <span class="underway" :class="{'current':current ? true:false}" @click="changeTag(1)">{{$t('usercenter.Ing')}}</span>
          <span class="history" :class="{'current':!current ? true:false}" @click="changeTag(0)">{{$t('usercenter.Histroy')}}</span>
        </div>
      </div>
      <ul  class="main" v-loading="loading">
        <li v-for="(compety) in competys" @click="toDetail(compety)" :key="compety.competitionId" class="box_shadow">
            <div class="main_title">
              <span class="compe_title textOverflow" :title="compety.competitionName">{{compety.competitionName}}</span>
            </div>
            <div class="main_content">
              <p class="school">
                <img :src="compety.userHead" v-if="compety.userHead">
                <img src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png" width="22" v-else>
                <span>{{compety.schoolName}}</span>
              </p>
              <div class="detail">
                  <p v-if="compety.roleName"><i class="iconfont">&#xe6a3;</i>{{compety.roleName}}</p>
                  <p v-if="compety.memberNums || compety.maxNum"><i class="iconfont">&#xe62f;</i>{{compety.memberNums}}<span v-if="compety.memberNums || compety.maxNum">/</span>{{compety.maxNum}}</p>
              </div>
            </div>
            <!-- 审核通过不显示 -->
            <!-- <span v-if="compety.status != 5" :class="statusClass[compety.status]">{{status[compety.status]}}</span> -->
            <div class="teamtype">
                <span v-if="compety.applyType==1">
                    个人赛
                </span>
                <span v-else>
                    团队赛
                </span>
            </div>
        </li>
      </ul>
      <!-- <el-pagination  background layout="total, prev, pager, next" :page-size="pageSize" :current-page.sync="pageNum" :total="total" @current-change="currentPage"></el-pagination> -->
    </div>
    <div class="noCompety" v-show="competys.length == 0 && !loading">{{$t('usercenter.Null')}}</div>
  </div>
</template>


<script>
import network from "@/api/jxapi/index";
import { getUserInfo } from '@/utils/commons.js'
export default {
  data() {
    return {
      pageNum:1,
      pageSize:10,
      total:1,
      loading: false,
      competitionId: 0,
      competitionFinish:false,
      id: null,
      current: "1", //默认 1进行中 （0 历史）

      competys: [], // 竞赛团队
      status: {
        "0": "未发布",
        "1": "审核中",
        "-5": "审核退回",
        "5": "审核通过"
      },
      statusClass: {
        "0": "compe_state compe_state_0",
        "1": "compe_state compe_state_1",
        "-5": "compe_state compe_state_back",
        "5": "compe_state compe_state_5"
      },
      type:'',//权限 3 主办方
      user:{},
    };
  },
  methods: {
    // 进行中，历史标签切换
    changeTag(param) {
      this.current = param;
      this.getList();
    },
    currentPage(){
        this.getList();
    },
    async getList() {
        this.loading = true;
        const list = await network.getpersonCompetition({ data:{
          isFinish: this.current
        } });
        this.loading = false;
        if (list == "error" || !list) return;
        this.competys = list.map(d => {
          d.status = d.status + "";
          return d;
        });
      
    },
    toDetail(compety){
        this.$router.push('/details?id='+compety.competitionId);
    }
  },
  created() {
    this.$store.dispatch('AuthorityPersonal')
    this.user = getUserInfo()
    if(!this.user) return;
    this.getList(1);
  }
};
</script>

<style lang="less" scoped>
.footBtn{
  float: right;
}
em {
  font-style: normal;
}
.jingsai {
  .top {
    height: 2.625rem;
    line-height: 2.625rem;
    border-bottom: 1px solid #d9d9d9;
    display: flex;
    justify-content: space-between;
    .left {
      position: relative;
      .underway,
      .history {
        background: #f4f4f4;
        border: 1px solid #d9d9d9;
        border-bottom: 0;
        border-radius: 0.3rem 0.3rem 0 0;
        font-size: 0.9rem;
        display: inline-block;
        width: 4.5rem;
        height: 2.625rem;
        margin-right: 0.5rem;
        text-align: center;
        cursor: pointer;
      }
      & > .current {
        background: #fff;
        border-bottom: 1px solid #fff;
        font-weight: bold;
      }
    }
  }
  .main {
    width: 47.75rem;
    min-height: 200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      width: 372px;
      height: 96px;
      padding: 14px 20px;
      background: #ffffff;
      box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      margin-top: 1.5rem;
      box-sizing: border-box;
      position: relative;
      cursor: pointer;
      .main_title {
        display: flex;
        justify-content: space-between;
        .compe_title {
          display: inline-block;
          max-width: 300px;
        }
        .compe_right {
          display: flex;
          align-items: center;
          .compe_year {
            font-size: 12px;
            color: #7091b6;
            letter-spacing: 0.17px;
          }
          em {
            margin-left: 8px;
            img {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
      .main_content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        border-top: 1px solid #f7f7f7;
        padding-top: 12px;
        margin-top: 12px;
        .school {
          display: flex;
          align-items: center;
          img {
            width: 20px;
            height: 20px;
            border-radius: 100%;
            margin-right: 8px;
          }
          span {
            font-size: 14px;
            color: #4a4a4a;
            letter-spacing: 0.2px;
            width: 142px;
            height: 20px;
            overflow: hidden;
            display: inline-block;
            text-align: left;
          }
        }
        .detail{
            float: right;
            font-size: 14px;
            color: #4A4A4A;
            p{
                display: inline-block;
                i{
                    color: #BBDBFF;
                    margin: 0 2px;
                }
            }
        }
        .type {
          display: flex;
          align-items: center;
          img {
            width: 15px;
            height: 18px;
            margin-left: 6px;
          }
          span {
            font-size: 14px;
            color: #4a4a4a;
            letter-spacing: 0.2px;
            text-align: right;
            margin-left: 10px;
          }
        }
      }
      .compe_state {
        width: 53px;
        height: 20px;
        line-height: 20px;
        position: absolute;
        right: -5px;
        top: -12px;
        font-size: 12px;
        text-align: center;
        border-radius: 5px;
      }
      .compe_state_0 {
        background: #0086fa;
        color: #ffffff;
      }
      .compe_state_1 {
        background: #9b9b9b;
        color: #ffffff;
      }
      .compe_state_back {
        background: #da0724;
        color: #ffffff;
      }
      .compe_state_5 {
        background: #87bc51;
        color: #ffffff;
      }
      .teamtype{
            background: #F8E71C;
            border: 1px solid #979797;
            font-size: 12px;
            color: #4A4A4A;
            text-align: center;
            width: 50px;
            line-height: 25px;
            height: 25px;
            position: absolute;
            right: 20px;
            bottom: -14px;
            display: none;
      }
      &:hover .teamtype{
          display: block;
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
