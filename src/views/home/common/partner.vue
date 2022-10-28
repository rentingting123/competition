<template>
    <div class="parnters">
        <div>
            <div>
                <h3>{{$t('newHome.PlatformCertification')}}</h3>
                <ul class="organizationList">
                    <li v-for="list in organizationList" :key="list.id" @click="gotoDetail(list.url)">
                        <img :src="list.logo">
                        <p>{{list.name}}</p>
                    </li>
                </ul>
            </div>
            <div>
                <h3>{{$t('newHome.partner')}}</h3>
                <ul class="partnerList">
                    <li v-for="list in partnerList" :key="list.id" @click="gotoDetail(list.url)">
                        <img :src="list.logo">
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['partnerList', 'organizationList'],
    methods:{
        gotoDetail (href) {
            if(!href) return;
            let url = href.indexOf('http') == -1 ? 'http://' + href : href
            window.open(url)
        },
    }
}
</script>

<style lang='less' scoped>
.parnters{
    width: 100%;
    margin: 0 auto;
    background: #ECECEC;
    >div{
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 30px 0;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        >div{
            width: 50%;
            border-left: 1px solid #BEBEBE;
            padding: 0 30px;
            &:first-child{
                border: none;
            }
        }
        h3{
            font-size: 26px;
            font-weight: 500;
            color: #4A4A4A;
            line-height: 1.5;
            text-align: left;
        }
        .organizationList{
            width: 100%;
            margin: 0 auto;
            text-align: left;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;

            li{
                min-width: 230px;
                height: 40px;
                cursor: pointer;
                margin: 12px 28px 0 0;
                img{
                    width: 40px;
                    height: 40px;
                    margin: 0 auto;
                    margin-right: 10px;
                }
                p{
                    display: inline-block;
                    vertical-align: top;
                    font-size: 16px;
                    font-weight: 400;
                    color: #4A4A4A;
                    line-height: 40px;
                    text-align: left;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    max-width: 210px;
                }
            }
        }
        
        .partnerList{
            width: 100%;
            margin: 0 auto;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            flex-wrap: wrap;
            li{
                width: 232px;
                height: 50px;
                margin: 12px 28px 0 0;
                cursor: pointer;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }

}
</style>