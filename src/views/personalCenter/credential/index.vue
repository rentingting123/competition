<template>
  <div id="credential">
    <div class="header">
      <img src="https://web.moocollege.com/mooc/hzq/competition/user_center/竞赛荣誉.png" alt srcset>
    </div>

    <div class="main" v-if="corelists.length>0">
      <div class="rongyu" v-for="(list,index) in corelists" :key="index">
        <div class="img">
          <img :src="list.imgUrl+'!small_credentialReview'" alt width="100%">
          <div class="fuceng">
            <div>
              <a :href="list.imgUrl" @mouseover="on1=true" @mouseout="on1=false" :download="`${list.competitionYear}-${list.competitionName}-${list.name}.jpg`">
                <el-button type="primary" :class="{'last':!on1}">
                  <i class="icon iconfont">&#xe610;</i>
                  {{$t('credential.download')}}
                </el-button>
              </a>
              <span @mouseover="on2=true" @mouseout="on2=false">
                <el-button type="primary" :class="{'last':!on2}" @click="open(list)">
                  <i class="icon iconfont">&#xe649;</i>
                  {{$t('credential.view')}}
                </el-button>
              </span>
              <!-- <mailCert :list='list'/> -->
            </div>
          </div>
        </div>
        <div class="detail">
          <div
            class="one"
            :class="{'one':list.name=='一等奖','two':list.name=='二等奖','three':list.name=='三等奖',}"
          ></div>
          <p>{{list.competitionName}}</p>
          <time>{{list.competitionYear}}</time>
          <span class="clear"></span>
        </div>
        <el-dialog :title="$t('credential.name')" :close-on-click-modal= false fullscreen :visible.sync="showcore" style="text-align:center;">
          <img :src="listImgUrl" v-if="showcore" alt srcset width="80%" height="auto">
        </el-dialog>
      </div>
    </div>
    <div class="noCredential" v-else>
      <p>
        {{$t('credential.nomess')}}
      </p>
    </div>
  </div>
</template>


<script>
import network from "@@/api/jxapi/index";
import { getUserInfo } from '@@/utils/commons.js'
// import mailCert from './common/emil'
export default {
  name: "credential",
  components:{
   // mailCert
  },
  data() {
    return {
      on1: false,
      on2: false,
      showcore: false,
      corelists: [],
      listImgUrl: '',
    };
  },
  // hornerId
  methods: {
    open(list){
      this.listImgUrl = list.imgUrl
      this.showcore=true
    },
    async getHorbers() {
      let user = getUserInfo();
      if(!user) return;
      let id = user.id
      const list = await network.getHorbers({data:{hornerId:id}});
      if (list == "error") return;
      this.corelists = list;
    },
    async download(list) {
      // var data = {
      //   hornerId:list.id
      // };
      // // const isDown = await network.downloadPic({data:data})
      // const isDown = await network.downloadPic({data:data,config:{responseType:'arraybuffer'}})
      // if(isDown=='error') return;

    }
  },
  created() {
    this.getHorbers();
  }
};
</script>


<style lang="less" scoped>
#credential {
  width: 100%;
  background: #f5f5f5;
}
.header {
  width: 100%;
  text-align: center;
  padding-bottom: 20px;
  img {
    width: 312px;
    display: inline-block;
    height: auto;
    margin: 0 auto;
  }
}
.clear {
  clear: both;
}
.main {
  width: 100%;
  column-count: 2;
  column-gap: 10px;
  margin: 0 auto;
  padding-bottom: 10px;
  .rongyu {
    width: 322px;
    height: auto;
    background: #ffffff;
    border-radius: 10px 10px 5px 5px;
    overflow: hidden;
    break-inside: avoid;
    box-sizing: border-box;
    margin: 0 10px 30px 10px;
    .img {
      position: relative;
      width: 100%;
      cursor: pointer;
      overflow: hidden;
      .fuceng {
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 2;
        left: 0;
        top: 0;
        cursor: pointer;
        >div {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%);
          button {
            margin: 0;
            padding: 0;
            width: 217px;
            height: 34px;
            line-height: 34px;
            text-align: center;
            font-size: 12px;
            color: #ffffff;
            letter-spacing: 0.17px;
            background-color: #00aa91;
            margin-top: 10px;
          }
          a{
            button{
              margin-top: 0;
            }
          }
          .last {
            background: #ffffff;
            border: 1px solid #00aa91;
            color: #00aa91;
          }
        }
      }
    }
    .img:hover .fuceng {
      display: block;
    }
    .detail {
      width: 100%;
      height: 40px;
      background: #ffffff;
      border-radius: 0 0 5px 5px;
      line-height: 40px;
      div {
        float: left;
        width: 20px;
        height: 20px;
        margin: 10px 8px 10px 11px;
      }
      .one {
        background: url("https://web.moocollege.com/mooc/hzq/competition/user_center/cup6.png") no-repeat;
        background-size: cover;
      }
      .two {
        background: url("https://web.moocollege.com/mooc/hzq/competition/user_center/cup5.png") no-repeat;
        background-size: cover;
      }
      .three {
        background: url("https://web.moocollege.com/mooc/hzq/competition/user_center/cup4.png") no-repeat;
        background-size: cover;
      }
      p {
        float: left;
        font-size: 13px;
        color: #4a4a4a;
        letter-spacing: 0.19px;
      }
      time {
        float: right;
        font-size: 12px;
        color: #7091b6;
        letter-spacing: 0.17px;
        margin-right: 14px;
      }
    }
  }
}
.noCredential{
  width: 100%;
  text-align: center;
  padding: 100px 0;
}
</style>