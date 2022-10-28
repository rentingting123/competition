<template>
    <div id="index">
        <!-- 轮播图 -->
        <banners :slideshowList='obj && obj.bannerList || []' />
        <!-- 搜索竞赛 -->
        <div class="search">
          <el-autocomplete
            v-model="name"
            :fetch-suggestions="querySearchAsync"
            placeholder="搜索竞赛"
            @select="handleSelect"
            >
            <i
              class="el-icon-search el-input__icon"
              slot="suffix"
              style="color:blue;">
            </i>
          </el-autocomplete>
          <p>
            <span v-for="item in searchCompetitionList" :key="item.id" @click="handleSelect(item)">
              {{item.name}}
            </span>
          </p>
        </div>

        <!-- 搜索结果 -->
        <search :id='id' v-if="id" class=""/>

        <!-- 推荐学科竞赛 -->
        <recommend />

        <!-- 省赛直通车 -->
        <province />

        <!-- 高校直通车 -->
        <schools />

    </div>
</template>

<script>
    import network from '@/api/jxapi'
    import { getParams,setUserInfo } from '@@/utils/commons'

    import banners from './common/banner'
    import recommend from './common/recommend'
    import province from './common/province'
    import schools from './common/schools'
    import search from './common/search'

    export default {
        components:{
          banners,
          recommend,
          province,
          schools,
          search,

        },
        data() {
            return {
                obj:{},
                name: '',
                state: '',
                timeout:  null,
                id: '',
                searchCompetitionList: []
            }
        },
        async created() {
          this.init();
        },
        methods: {
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
                this.searchCompetitionList = list && list.searchCompetitionList || []
            },
            async setInfo(data){

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
            handleSelect(item){
              this.id = item.id
            },
            async querySearchAsync(q, cb){
              if(!q.trim()) return cb([]);
              let res = await network.selectCompetitions({
                data: {
                  name: q,
                  limit: 10
                }
              });
              if (res == "error") return;
              let arr = [];
              for (let i in res) {
                arr.push({
                  value: res[i].name + '(' + res[i].year + ')',
                  id: res[i].id
                });
              }
              cb(arr);
            },
        },

    }
</script>

<style lang="less" scoped>
li{
  list-style: none;
}

#index{
    position:relative;
    width: 100%;
    background: #F6F6F6;
    .search{
      width: 873px;
      margin: 0 auto;
      position: absolute;
      top: 365px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      /deep/.el-autocomplete{
        width: 100%;
        border-radius: 5px;
      }
      p{
        text-align: left;
        overflow: hidden;
        line-height: 41px;
        height: 41px;
        width: 100%;
        span{
          font-size: 14px;
          font-weight: 500;
          color: #FFFFFF;
          letter-spacing: 1px;
          margin-right: 28px;
          cursor: pointer;
        }
      }
    }
    #footer{
        position:absolute;
        bottom:0;
        width:100%;
    }
}


</style>
