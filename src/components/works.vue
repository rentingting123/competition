<template>
  <div id="works">
    <div class="works">
      <div class="logoImg">
        <div class="clevel">{{data.rowName}}</div>
        <img v-if="data.thunbnail" class="detail_logoImg" :src="data.thunbnail" alt />
        <img v-else-if="user&&user.bannerUrl" class="detail_logoImg" :src="user.bannerUrl" alt />
        <img
          v-else
          class="detail_logoImg"
          src="https://web.moocollege.com/mooc/hzq/competition/user_center/cerebrum.jpg"
          alt
        />
        <div @click.stop="()=>(false)" v-if="data.poolGroupName||data.poolSort" class="lotteryBox">
          
          <Lottery
          
             v-if="!data.drawUserId&&data.status!=3"
            :poolGroupName="data.poolGroupName"
            :poolSort="data.poolSort"
            :poolId="data.id"
            :cb="()=>(data.drawUserId=true)"
            
          />
          <!-- :disabled="!localAuthority.drawTable" -->
          <span class="lotteryResult" v-else>
            {{$t('worksShow.team')}} {{data.poolGroupName}}
            {{$t('worksShow.index')}} {{data.poolSort}}</span> 
        </div>
        <div class="QRCode">
          <qrcode :mdPoolId='data.mdPoolId'/>
        </div>
        <div v-if="localAuthority.delWorks || localAuthority.editWorks" class="edit">
          <div class="dian" v-if="data.status!=3">
            <p>···</p>
            <div>
              <span v-if="localAuthority.editWorks" @click.stop="gotoDetail(data)">{{$t('worksShow.edit')}}</span>
              <span v-if="localAuthority.delWorks" @click.stop="gotoDel(data)">{{$t('worksShow.del')}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="works-bottom">
        <dl>
          <dt>
            <p class="ellipsis" :title="data.title">{{data.title}}</p>
            <span v-if="data.awardName" class="iconSta1"></span>
            <span v-else-if="data.status===3" class="iconSta"></span>
          </dt>
          <dd class="tip">
            <img v-if="data.userIcon" class="detail_logoImg" :src="data.userIcon" alt />
            <img
              v-else
              class="detail_logoImg"
              src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png"
              alt
            />
            <p>{{data.authorName}}</p>
          </dd>
          <dd class="end" @click.stop="vote" v-loading='loading'>
            <div :class="{'disable':!voteshow}">
              <i class="iconfont icon-zan">&#xe65a;</i>
              <p>
                投票 
                <span v-if="data.voteShowNum==0">({{ data.voteNum || 0 }})</span>
              </p>
            </div>
          </dd>
        </dl>
      </div>
    </div>
  </div>
</template>


<script>
import network from "@/api/jxapi/index";
import { getBaseInfo } from "Lib/commons";
import { mapState } from "vuex";
import Lottery from "@/components/lottery/index";
import qrcode from './qrcode'
export default {
  name: "works",
  components: {
    Lottery,
    qrcode
  },

  props: {
    data: {
      type: Object,
      required: true,
      user: {}
    },
    getList: Function
  },
  async created() {
    // 在watch中
  },
  data() {
    return {
      user: {},
      loading: false,
      localAuthority:{}
    };
  },
  methods: {
    // 获取本组件权限
    async getAuthority(){
      let competitionId = this.$route.query.id
        var res = await network.getUserCenter({
          data: {
            groupId: this.data.objectId,
            poolId: this.data.id,
            competitionId: competitionId,
            codes: ['drawTable',"editWorks", "delWorks", "downloadWorks"]
          }
        })
        if(res=='error') return
        res.forEach((obj, i) => {
          this.$set(this.localAuthority,obj.code,obj.allow)
        });
    },

    async init() {
      // let res = await network.authWorksVote({ data: { poolId: this.data.id } });
      // if (res == "error") return;
      // this.voteshow = res;
    },
    async vote() {
      if (!this.voteshow || this.loading) return;
      this.loading = true
      let res = await network.sendWorksVote({ data: { poolId: this.data.id } });
      
      if (res == "error"){
        this.voteshow=false;
        this.loading = false
        return
      } 
      this.data.voteNum = res &&res.num;
      
      if(res && (res.remain<1 && res.allRemain<1)){
        this.voteshow=false;
        this.loading = false
        return this.$message.success('投票成功，该作品您还可以投票 0 次,总共您还可以投 0 次')
      }else if(res && res.remain<1){
        this.voteshow=false;
        this.loading = false
        return this.$message.success('投票成功，该作品您还可以投票 0 次,总共您还可以投 '+(res && res.allRemain||0)+' 次')
      }else if(res && res.allRemain<1){
        this.voteshow=false;
        this.loading = false
        return this.$message.success('投票成功，该作品您还可以投票 '+(res && res.remain||0)+' 次,总共您还可以投 0 次')
      }else{
        this.loading = false
        this.$message.success('投票成功，该作品您还可以投票 '+(res && res.remain||0) + ' 次，总共您还可以投 '+(res && res.allRemain||0)+' 次')
      }
    },
    gotoDetail(item = this.data) {
      this.$router.push(`/submitWork/${item.id}`);
    },
    gotoDel(item = this.data) {
      let vm = this;
      this.$confirm(vm.$t('worksShow.message'), vm.$t('worksShow.confirm'), {
        confirmButtonText: vm.$t('worksShow.ok'),
        cancelButtonText: vm.$t('worksShow.cancel'),
        type: "warning"
      })
        .then(async () => {
          let isdel = await network.delPool({ data: { id: item.id } });
          if (isdel == "error") return;
          return vm.getList();
        })
        .catch(() => {
          vm.$message.info(vm.$t('worksShow.cancelDel'));
        });
    }
  },
  computed: {
    voteshow:{
      get(){
        return this.data && this.data.voteAuth || false
      },
      set(val){
        this.data.voteAuth = val
       
      }
    },
    ...mapState({
      authority: state => state.authorityManagement
    })
  },
  watch:{
    data:{
      immediate: true,
      handler(val){
        this.user = getBaseInfo();
        this.init();
        this.getAuthority();
      }
    }
  }
};
</script>


<style lang="less" scoped>
.works {
  width: 300px;
  height: 279px;
  border-radius: 5px;
  box-shadow: 0 0rem 0.3rem 0 rgba(0, 0, 0, 0.5);
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  .logoImg {
    width: 100%;
    height: 169px;
    overflow: hidden;
    position: relative;
    .clevel{
      position: absolute;
      left: 10px;
      top:10px;
      height: 28px;
      background-color: #FF6767;
      color:#fff;
      border-radius: 6px;
      width:86px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      z-index:2;
      line-height: 28px;
      font-size:14px;
      text-align: center;
      padding: 0 5px;
    }
    .lotteryBox {
      display: block;
      position: absolute;
      //z-index: 2;
      left: 0;
      overflow: hidden;
      bottom: 0;
      .lotteryResult {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        display: block;
        width: 300px;
        padding: 5px;
        font-size: 12px;
      }
    }
    .edit {
      display: none;
      position: absolute;
      top: 10px;
      right: 10px;
      .dian {
        p {
          background: #ffffff;
          display: inline-block;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
          border-radius: 5px;
          width: 29px;
          height: 20px;
          line-height: 20px;
          font-size: 14px;
          color: #000000;
          text-align: center;
          margin-bottom: 10px;
        }
        div {
          display: none;
          position: absolute;
          right: 0;
          width: 62px;
          height: auto;
          padding: 6px 0;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
          border-radius: 5px;
          background-color: #ffffff;
          font-size: 13px;
          color: #000000;
          text-align: center;
          line-height: 24px;
          span {
            height: 24px;
            display: block;
          }
          span:hover {
            background: #efefef;
          }
        }
      }
      .dian:hover div {
        display: block;
      }
    }
    > img {
      width: 100%;
      height: 100%;
    }
    &:hover {
      .edit {
        display: block;
      }
    }
    .QRCode{
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
  .works-bottom {
    width: 100%;
    height: 110px;
    padding: 10px 20px;
    box-sizing: border-box;
    dl {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      dt {
        width: 100%;
        height: 48px;
        font-size: 17px;
        font-weight: bold;
        color: rgba(74, 74, 74, 1);
        line-height: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 14px;
        p {
          width: 100%;
          height: 100%;
        }
        .iconSta {
          background: url("https://web.moocollege.com/mooc/hzq/competition/user_center/晋级.gif");
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          width: 35px;
          height: 35px;
          display: inline-block;
        }
        .iconSta1 {
          background: url("https://web.moocollege.com/mooc/hzq/competition/user_center/获奖.gif");
          background-position: center;
          background-size: cover;
          background-repeat: no-repeat;
          width: 35px;
          height: 35px;
          display: inline-block;
        }
      }
      dd {
        display: flex;
        align-items: center;
      }
      .tip {
        max-width: 150px;
        img {
          width: 20px;
          height: 20px;
          border-radius: 100%;
          vertical-align: middle;
        }
        p {
          margin-left: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 14px;
          font-weight: 400;
          color: rgba(74, 74, 74, 1);
          line-height: 20px;
        }
      }
      .end {
        float: right;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
        &:hover{
          >div{
            background: #EAF5FF;
          }
        }
        >div{
          width: auto;
          height: 25px;
          line-height: 25px;
          background: #FFFFFF;
          border-radius: 2px;
          border: 1px solid #E4E4E4;
          padding: 0 5px;
          i{
            margin-right: 4px;
            color: #676767;
          }
          p {
            color: #676767;
            display: inline-block;
            vertical-align: middle;
          }
          &.disable{
            background: #F4F4F4 !important;
            opacity: 0.5;
          }
        }
      }
    }
  }
  &:hover {
    box-shadow: 0 0rem 0.5rem 0 rgba(0, 0, 0, 0.5);
    .logoImg {
      .detail_logoImg {
        transform: scale(1.07);
        border-radius: 0.3rem 0.3rem 0 0;
      }
    }
  }
}
</style>

