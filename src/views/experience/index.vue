<template>
    <div class="experience">
        <div class="banner">
            <h3>摩课云竞赛体验中心</h3>
            <h4>Moocollege Experience Center</h4>
            <apply />
        </div>
        <!-- 六大功能亮点 -->
        <highlights />
        <!-- 了解身份 -->
        <identity />
        <!-- 合作伙伴以及机构 -->
        <partner :organizationList='obj && obj.organizationList || []' :partnerList='obj && obj.partnerList || []' />
    </div>
</template>

<script>
import network from '@/api/jxapi'
import highlights from '../home/common/highlights'
import identity from './common/identity'
import partner from '../home/common/partner'
import apply from './common/apply'
export default {
    components:{
        highlights,
        identity,
        partner,
        apply,
    },
    data(){
        return{
            obj:{},
        }
    },
    created() {
        this.init();
    },
    methods:{
        async init(){
            let list = await network.getPagesSetting();
            if(list=='error') return;
            this.obj = list || {}
        }
    }
}
</script>

<style lang='less' scoped>
.experience{
    width: 100%;
    height: auto;
    background: #ffffff;
    .banner{
        max-width: 1920px;
        height: 240px;
        margin: 0 auto;
        background: url(http://web.moocollege.com/mooc/hzq/competition/identity/banner.png) no-repeat;
        background-size: cover;
        background-position: center;
        margin-bottom: 26px;
        h3{
            font-size: 35px;
            font-weight: bold;
            color: #FFFFFF;
            line-height: 35px;
            letter-spacing: 4px;
            padding: 65px 0 11px;
        }
        h4{
            font-size: 13px;
            font-weight: 400;
            color: #FFFFFF;
            line-height: 1;
            letter-spacing: 1px; 
            margin-bottom: 19px;
        }
    }
}
</style>