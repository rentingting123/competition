<template>
<div class="highlights">
    <div>
        <img src="https://web.moocollege.com/mooc/hzq/competition/newhome/title.png" alt="" srcset="">
        <ul>
            <li v-for="list in lists" :key="list.id">
                <img :src="list.logo">
                <h3>{{$t(list.name)}}</h3>
                <p>{{$t(list.message)}}</p>
            </li>
        </ul>
    </div>
</div>
</template>

<script>
export default {
    data(){
        return{
            lists:[
                {
                    logo: 'https://web.moocollege.com/mooc/hzq/competition/newhome/1.png',
                    name: 'newHome.title1',
                    message: 'newHome.title1Mess',
                    id: 1,
                },
                {
                    logo: 'https://web.moocollege.com/mooc/hzq/competition/newhome/2.png',
                    name: 'newHome.title2',
                    message: 'newHome.title2Mess',
                    id: 2,
                },
                {
                    logo: 'https://web.moocollege.com/mooc/hzq/competition/newhome/3.png',
                    name: 'newHome.title3',
                    message: 'newHome.title3Mess',
                    id: 3,
                },
                {
                    logo: 'https://web.moocollege.com/mooc/hzq/competition/newhome/4.png',
                    name: 'newHome.title4',
                    message: 'newHome.title4Mess',
                    id: 4,
                },
                {
                    logo: 'https://web.moocollege.com/mooc/hzq/competition/newhome/5.png',
                    name: 'newHome.title5',
                    message: 'newHome.title5Mess',
                    id: 5,
                },
                {
                    logo: 'https://web.moocollege.com/mooc/hzq/competition/newhome/6.png',
                    name: 'newHome.title6',
                    message: 'newHome.title6Mess',
                    id: 6,
                },
            ]
        }
    }
}
</script>

<style lang='less' scoped>
.highlights{
    width: 100%;
    >div{
        width: 100%;
        height: 100%;
        max-width: 1920px;
        margin: 0 auto;
        margin-bottom: 20px;
        img{
            height: 34px;
            width: auto;
            margin: 20px auto 0; 
        }
        ul{
            width: auto;
            margin: 0 auto;
            border: 1px solid #EDEDED;
            margin-top: 6px;
            max-width: 1200px;
            li{
                width: 198px;
                height: 140px;
                border-right: 1px solid #EDEDED;
                display: inline-block;
                vertical-align: top;
                position: relative;
                z-index: 1;
                img{
                    height: 46px;
                    display: block;
                    margin: 20px auto 0;
                }
                h3{
                    font-size: 20px;
                    height: 20px;
                    color: #4A4A4A;
                    line-height: 1;
                    text-align: center;
                    margin: 13px 0 8px;
                }
                p{
                    font-size: 13px;
                    color: rgba(74, 74, 74, 0.6);
                    line-height: 21px;
                    text-align: center;
                }
                &:last-child{
                    border: none;
                }
            }
        }
    }
}
</style>