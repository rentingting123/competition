<template>
    <div id="index">
        <!-- 轮播图 -->
        <banners :slideshowList='obj && obj.bannerList || []' />
        <!-- 六大功能亮点 -->
        <highlights />
        <!-- 动态 -->
        <news :newsList='obj && obj.newsList || []'/>
        <!-- 推荐竞赛 -->
        <competition :competitionList='obj && obj.competitionList || []' ref="competitionList"/>
        <!-- 申请试用 -->
        <!-- <apply /> -->
        <!-- 合作伙伴以及机构 -->
        <partner :organizationList='obj && obj.organizationList || []' :partnerList='obj && obj.partnerList || []' />
    </div>
</template>

<script>
    import network from '@/api/jxapi/index.js'
    import { getParams,setUserInfo } from '@@/utils/commons'

    import banners from './common/banner'
    import news from './common/news'
    import highlights from './common/highlights'
    import competition from './common/competitionList'
    import partner from './common/partner'
    import apply from './common/apply'

    export default {
        components:{
            banners,
            news,
            highlights,
            competition,
            partner,
            apply,
        },
        data() {
            return {
                obj:{},
            }
        },
        async created() {
          this.init();
        },
        mounted(){
          window.addEventListener('scroll', this.menu, true)
        },
        beforeDestroy(){
          window.removeEventListener('scroll', this.menu, true)
        },
        methods: {
            menu(){
              let scroll = document.documentElement.scrollTop || document.body.scrollTop;
              if(scroll>200){
                window.removeEventListener('scroll', this.menu, true)
                this.$refs.competitionList.init();
              }
            },
            async init(){
                const params = getParams(window.location);
                const { code,data,service } = params;

                // console.log(code)
                if(data){
                    return location.href = "http://" + data + "/login?code=" + code;
                }
                //sso微信登录，以后都会走这里2019.12.3
                if(service){
                    return location.href = `https://login.moocollege.com?code=${code}&service=${service}`;
                }
                if (code) {
                    const form = new FormData();
                    form.append('code', code);
                    form.append('providerId', 'weixin')
                    let data = await network.wechatLogin({
                    data:form,
                    headers: {
                        'deviceId': 0
                        //'Content-Type': 'application/x-www-form-urlencoded'
                    }
                    });

                    if(data=='error') return this.$router.push(`/register`);
                    this.setInfo(data)

                }
                let list = await network.getPagesSetting();
                if(list=='error') return;
                this.obj = list || {}
            },
            async setInfo(data){
                //  localStorage.setItem('wexin','wxLogin')

                if(data.user.username){
                    setToken(data.access_token);
                    setReflashToken(data.refresh_token)
                    await setUserInfo.call(this)
                    window.location.href = window.location.origin+'/#/competition'
                }else{
                    localStorage.setItem('wexin', data.access_token)
                    this.$router.push(`/bindphone`)
                }

            },
        },
        watch:{
          $route:{
            handler(to, from){
              let scoll = to.query.scoll
              if(scoll){
                this.$nextTick(()=>{
                  document.getElementById(scoll).scrollIntoView()
                })
              }
            },
            immediate: true
          }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
li{
  list-style: none;
}

#index{
    position:relative;
    width: 100%;
    background: #ffffff;
    #footer{
        position:absolute;
        bottom:0;
        width:100%;
    }
}
  // 首页重构
  .dynamicHeader{
    padding-top: 20px;
  }
  .dynamicHeaderC{
      position: relative;
      width: 130px;
      margin: 30px auto;
      height: 40px;
      
  }
  .dynamicHeaderC span:first-child{
    width: 26px;
    height: 15px;
    background-image: url('https://web.moocollege.com/mooc/hzq/competition/home/标题左.svg') ;
    background-repeat:no-repeat; 
      position: absolute;
      top: 0;
      left: 0;
  }
  .dynamicHeaderC span:last-child{
    width: 26px;
    height: 15px;
    background-image: url('https://web.moocollege.com/mooc/hzq/competition/home/标题右.svg');
    background-repeat:no-repeat; 
      position: absolute;
      bottom: 0;
      right: 0;
  }
  .dynamicHeaderC>p{
      width: 135px;
      line-height: 40px;
      text-align: center;
      font-size: 20px;
      color: #4A4A4A;
      letter-spacing: 5px;
  }
  .dynamicList{
    width: 1032px;
    margin: 0 auto;
    // background: #ccc;
    
  }
  .dynamiCon{
    width: 100%;
    margin-left: 15px;
    // height: 336px;
    // margin: 0 auto;
    // background: pink;
    display: flex;
    flex-wrap: wrap;
    li{
        width: 314px;
        height: 336px;
        padding: 25px 20px 21px;    
        margin-top: 20px;
        margin-right: 30px;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.20);
        border-radius: 5px;
        box-sizing: border-box;
        display: inline-block;
        position: relative;
        background: #fff;
        cursor: pointer;
        &:hover{
          box-shadow: 0 2px 20px 0 rgba(0,0,0,0.20);
        }
        .iconLabel{
          width: 309px;
          height: 26px;
          position: absolute;
          left: -15px;
          margin-top: 26px;
          top: 0;
          
          i{
              position: absolute;
              top: 6px;
              left: 15px;
              color: #fff;
              font-size: 14px;
          }
          span{
            &:first-child{
              width: 321px;
              height: 32px;
              display: inline-block;
              background-image: url('https://web.moocollege.com/mooc/hzq/competition/home/竞赛名称.png');
              background-repeat:no-repeat; 

            }
            &:last-child{
              position: absolute;
              top: 5px;
              left: 40px;
              font-size: 13px;
              color: #fff;
              font-size: 13px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              width: 248px;
              text-align: left;
            }
          }
        }
        .txt_top{
            display: flex;
            justify-content: space-between;
            margin-top: 43px;
            p{
                overflow:hidden; 
                text-overflow:ellipsis;
                display:-webkit-box; 
                
              /*! autoprefixer: ignore next */
                -webkit-box-orient: vertical;
                -webkit-line-clamp:2; 
                height: 44px;
                width: 168px;
                font-weight: bold;
                padding-right: 16px;
                text-align: left;
            }
            .img{
                width: 76px;
                height: 44px;
                position: relative;
                overflow: hidden;
                img{
                    width: 76px;
                    min-height: 44px;
                    position: absolute;
                    top: 50%;
                    left: 0;
                    transform: translateY(-50%);
                }
            }
        }
        .dynLine{
          border-bottom: 1px solid #DEDEDE;
          width: 26px;
          margin-top: 16px;
        }
        .txt_content{
            width: 100%;
            height: 138px;
            margin: 16px 0 16px;
            font-size: 13px;
            letter-spacing: 0.5px;
            line-height: 20px;
            overflow: hidden;
            word-break: break-all;
            display: -webkit-box;
            /*! autoprefixer: ignore next */
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 7;
            overflow: hidden;
            color: #808080; 
            font-weight: 200;
            text-align: left;
            p{
                img{
                    display: none !important;
                    width: 0;
                    height: 0;
                }
            }
        }
        .txt_bottom{
            font-size: 12px;
            text-align: right;
            cursor: pointer;
            // padding-top: 10px;
            .fl{
                float: left;
                color: #999999;
            }
        }
        
        .txt_bottomEdit{
            margin:0 10px;
            color:#4a4a4a;
        }
        .txt_bottomDlt:hover{
            color: #CB3A4C;
        }
        .txt_bottomEdit:hover{
            color: #1D86FF;
        }
    }
  }
// 竞赛
.homeCompetition{
  background:#FFF;
}
  .competition{
    width:60rem;
    margin:0 auto;
    display: flex;
    flex-wrap: wrap;
    // margin-bottom:2rem;
    clear: both;
    justify-content: space-between;
    .moreCompet{
      width: 100%;
      text-align: right;
      padding-right: 20px;
      margin-top: -10px;
      margin-bottom: 32px;
      span{
        cursor: pointer;
        &:hover{
          color: #4A90E2;
        }
      }
    }
}

</style>
