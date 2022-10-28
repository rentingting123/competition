<template>
  <div class="footNav" id='footNav'>
    <div>

      <div class="left">
        <img @click="toPath('/')" src="https://web.moocollege.com/mooc/hzq/competition/newhome/logo.png" >
        <div>
          <h3>杭州简学科技有限公司</h3>
          <p>0571-81902943（8:30-18:00，{{$t('footer.serviceDay')}})</p>
          <p>{{$t('footer.address')}}</p>
        </div>
      </div>

      <div class="center">
        <div>
          <p class="title">{{$t('footer.servers')}}</p>
          <ul>
            <li @click="toPath('/')">{{$t('footer.cc')}}<p></p></li>
            <li @click="toHref('http://rankadmin.moocollege.com')">{{$t('footer.rankadmin')}}<p></p></li>
            <li class="code">
              {{$t('footer.signup')}}
              <img src="https://web.moocollege.com/mooc/hzq/competition/newhome/%E6%8A%A5%E5%90%8D%E5%B0%8F%E7%A8%8B%E5%BA%8F.jpg">
              <p></p></li>
            <li class="code">
              {{$t('footer.expert')}}
              <img src="https://web.moocollege.com/mooc/hzq/competition/newhome/%E8%AF%84%E5%AE%A1%E5%B0%8F%20%E7%A8%8B%E5%BA%8F.jpg">
              <p></p></li>
          </ul>
        </div>
        <div>
          <p class="title">{{$t('footer.aboutUs')}}</p>
          <ul>
            <li @click="toPath('/introductionPlatform')">{{$t('footer.introduction')}}<p></p></li>
            <li @click="toPath('/expendingServices')">{{$t('footer.services')}}<p></p></li>
            <li @click="switchLanguage">{{$t('language')}}<p></p></li>
          </ul>
        </div>
        <div>
          <p class="title">{{$t('footer.help')}}</p>
          <ul>
            <li @click="toPath('/helpcenter?type=2')">{{$t('footer.platform')}}<p></p></li>
            <!-- <li @click="toPath('/helpcenter?type=3')">{{$t('footer.login')}}<p></p></li>
            <li @click="toPath('/helpcenter?type=4')">{{$t('footer.competition')}}<p></p></li>
            <li @click="toPath('/helpcenter?type=5')">{{$t('footer.account')}}<p></p></li>
            <li @click="toPath('/helpcenter?type=6')">{{$t('footer.password')}}<p></p></li> -->
            <li @click="toPath('/helpcenter?type=99')">{{$t('footer.download')}}<p></p></li>
          </ul>
        </div>
        <div>
          <p class="title">{{$t('footer.applyAccount')}}</p>
          <ul>
            <li @click="toHref('http://zhsq.moocollege.com')">{{$t('footer.universityManagementAccount')}}<p></p></li>
            <li @click="toregister">{{$t('footer.accountSponsor')}}<p></p></li>
          </ul>
        </div>
      </div>

      <div class="right">
        <img src="https://web.moocollege.com/nskin/static/img/weixin.670ae99.jpg" >
        <p>{{$t('footer.attention')}}</p>
      </div>

    </div>
  </div>
</template>


<script>
import { toregister } from "@@/utils/util";
import { mapMutations } from "vuex";
import { setCookie } from "@@/utils/commons";
export default {
  data() {
    return {
    };
  },
  methods: {
    ...mapMutations({
      swi_lang: "swi_lang",
    }),
    toregister() {
      toregister(true);
    },
    toHref(url){
      window.open(url);
    },
    toPath(path){
      scrollTo(0, 0);
      this.$router.push(path);
    },
    switchLanguage() {
      let domain = window.location.hostname.split(".");
      domain = domain.splice(domain.length - 2, 2);
      domain = domain.join(".");
      let lang = this.$i18n.locale == "en" ? "zh" : "en";
      this.$i18n.locale = lang;
      setCookie("lang", lang, 365, domain);
      this.swi_lang(lang);
    }
  },
};
</script>

<style lang="less" scoped>
.footNav {
  width: 100%;
  height: 154px;
  background: #1B2630;
  >div{
    width: 1200px;
    margin: 0 auto;
    padding: 33px 0 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left{
      img{
        width: 77px;
        height: 84px;
        margin-right: 29px;
      }
      >div{
        display: inline-block;
        vertical-align: top;
        text-align: left;
        h3{
          font-size: 18px;
          font-weight: 400;
          color: #FFFFFF;
          line-height: 25px;
          margin: 14px 0 13px;
        }
        p{
          font-size: 12px;
          font-weight: 400;
          color: #C9C9C9;
          line-height: 17px;
        }
      }
    }
    .center{
      width: auto;
      height: 93px;
      border-left: 1px solid #ffffff;
      padding-left: 64px;
      text-align: left;
      >div{
        margin-bottom: 4px;
        &:last-child{
          margin-bottom: 0;
        }
        .title{
          width: 98px;
          display: inline-block;
          vertical-align: top;
          text-align: left;
          font-size: 12px;
          font-weight: bold;
          color: #FBFBFB;
          line-height: 17px;
        }
        ul{
          display: inline-block;
          vertical-align: top;
          li{
            display: inline-block;
            vertical-align: top;
            font-size: 12px;
            line-height: 17px;
            color: #C9C9C9;
            margin-left: 13px;
            position: relative;
            cursor: pointer;
            img{
              position: absolute;
              bottom: 34px;
              left: 0;
              width: 100px;
              display: none;
            }
            &:hover{
              img{
                display: block;
              }
            }
            p{
              display: inline-block;
              width: 2px;
              height: 11px;
              margin-left: 13px;
              background: #C9C9C9;
              position: relative;
              top: 2px;
            }
            &:first-child{
              margin-left: 0;
            }
            &:last-child{
              p{
                display: none;
              }
            }
          }
        }
      }
    }
    .right{
      width: 180px;
      img{
        width: 100px;
        height: 100px;
      }
      p{
        width: 62px;
        margin-left: 12px;
        font-size: 12px;
        font-weight: 400;
        color: #C9C9C9;
        line-height: 17px;
        display: inline-block;
        vertical-align: bottom;
      }
    }
  }
}
</style>

