<template>
    <div class="competitionlist" v-if="obj" @click="toCompetition(obj)">
        <div class="left">
            <p>{{obj && obj.competitionYear}}</p>
            <p>第{{obj && obj.competitionRound || 1}}届</p>
            <p :class="typeClass">{{obj && obj.isfinish | type}}</p>
        </div>
        <div class="img">
            <img :src="obj.bannerUrl" width="100%" height="100%"/>
            <p>{{obj.startTime | time}} ~ {{obj.endTime | time}}</p>
        </div>
        <div class="limain">
            <h4 class="textOverflow">{{obj.name}}</h4>
            <p>
                <span class="large">秘书处</span> 
                <span>{{obj.organizations | city(1)}}</span>
            </p>
            <p>
                <span>举办城市</span> 
                <span>{{obj.holderCity || '-' }}</span>
            </p>
            <p>
                <span class="large">主办方</span> 
                <span>{{obj.organizations | city(2)}}</span>
            </p>
            <p>
                <span class="large">承办方</span> 
                <span>{{obj.organizations | city(3)}}</span>
            </p>
            <p>
                <span>覆盖院校</span> 
                <span>{{obj.schoolNum || 0}}所</span>
            </p>
            <p>
                <span>参与人数</span> 
                <span>{{obj.personNum || 0}}人</span>
            </p>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    props: ['obj'],
    computed:{
        typeClass(){
            if(this.obj.isfinish==1){
                return 'ing'
            }else if(this.obj.isfinish==2){
                return 'hot'
            }else if(this.obj.isfinish==3){
                return 'coming'
            }else{
                return 'ended'
            }
        }
    },
    methods:{
        toCompetition(item){
            if(item && item.url){
                let url = item.url.indexOf('http') == -1 ? 'http://' + item.url : item.url
                window.open(url)
            }else if(item && item.id){
                this.$router.push('/details?id='+item.id)
            }
        }
    },
    filters:{
        type(val){
            switch(val){
                case 1: return '进行中';
                case 2: return '火热报名';
                case 3: return '筹备中';
                default: return '已结束';
            }
        },
        time(val){
            if(!val) return ''
            return moment(val).format('YYYY.MM.DD')
        },
        city(val, index){
            // 获取到数组数据
            let arr
            if(val && val.competitionOrganizations){
                for(let i in val.competitionOrganizations){
                    if(val.competitionOrganizations[i].organization == '主办方' && index==2){
                        arr = val.competitionOrganizations[i].units
                    }else if(val.competitionOrganizations[i].organization == '秘书处' && index==1){
                        arr = val.competitionOrganizations[i].units
                    }else if(val.competitionOrganizations[i].organization == '承办方' && index==3){
                        arr = val.competitionOrganizations[i].units
                    }
                }
            }
            // 数据进行整合
            let str = ''
            for(let i in arr){
                if(arr[i].name && i==0){
                    str += arr[i].name
                }else if(arr[i].name){
                    str += ', ' + arr[i].name
                }
            }
            
            return str.substr(0, 11) || '-'
        }
    }
}
</script>

<style lang='less' scoped>
.competitionlist{
    width: 262px;
    height: 309px;
    background: #FFFFFF;
    border: 1px solid #E8E7E7;
    position: relative;
    cursor: pointer;
    .left{
        position: absolute;
        left: -10px;
        top: -10px;
        width: 57px;
        height: 65px;
        text-align: center;
        z-index: 2;
        p{
            width: 100%;
            line-height: 19px;
            background: #D8D8D8;
            font-size: 14px;
            font-weight: 400;
            color: #4A4A4A;
            letter-spacing: 1px;
        }
        p:first-child{
            line-height: 30px;
            background: #0041AB;
            font-size: 19px;
            font-weight: bold;
            color: #FFFFFF;
            letter-spacing: 1px;
        }
        p:last-child{
            line-height: 16px;
            background: #DA3145;
            font-size: 11px;
            font-weight: 400;
            color: #FFFFFF;

        }
        .ing{
            background:#F5A623 !important;
        }
        .ended{
            background: #9B9B9B !important;
        }
        .coming{
            background: #0078E2 !important;
        }
        .hot{
            background: #DA3145 !important;
            letter-spacing: 1px !important;
        }
    }
    .img{
        width: 100%;
        height: 150px;
        overflow: hidden;
        position: relative;
        &:hover{
            img{
                transform: scale(1.1);
            }
        }
        p{
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 24px;
            line-height: 24px;
            background: rgba(0,0,0,0.5);
            text-indent: 17px;
            font-size: 13px;
            font-weight: 400;
            color: #FFFFFF;
            letter-spacing: 1px;
        }
    }
    .limain{
        padding: 12px 17px 10px 17px;
        h4{
            width: 100%;
            font-size: 15px;
            font-weight: 500;
            color: #0041AB;
            line-height: 1;
            letter-spacing: 1px;
            margin-bottom: 10px;
        }
        p{
            width: 100%;
            font-size: 12px;
            font-weight: 400;
            color: #4A4A4A;
            line-height: 12px;
            letter-spacing: 1px;
            margin-bottom: 6px;
            span{
                display: inline-block;
                width: 57px;
                overflow: hidden;
                margin-right: 12px;
                &.large{
                    letter-spacing: 7px;
                }
                &:last-child{
                    margin-right: 0;
                    width: auto;
                }
            }
            &:last-child{
                margin-bottom: 0;
            }
        }
    }

}
</style>