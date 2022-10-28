<template>
    <div class="detail">
        <div class="toPre" @click="toPreTrain">预览</div>
        <el-dialog
        id="trainPre"
        :append-to-body='true'
        :show-close="false"
        :visible.sync="trainRegShow"
        :close-on-click-modal="false"
        width="1240px"
        >
        
            <div class="title" style="text-align:left;">
                <p>培训预览</p>
            </div>
            <div class="competition clearfix">
                <img :src="message.bannerUrl" >
                <div>
                    <h2>{{message.name}}</h2>
                    <p>培训时间&nbsp;&nbsp; <span style="letter-spacing:0;">{{message.trainingBeginTime}}-{{message.trainingEndTime}}</span> </p>
                    <p>培训地点&nbsp;&nbsp; <i class="el-icon-location-outline"></i>{{message.trainingAddr}}</p>
                    <p>会议规模&nbsp;&nbsp; {{message.maxNum || 0}}人</p>
                    <p>主办单位&nbsp;&nbsp; <span style="padding-right:8px;" v-for="(item,index) in message.sponsors" :key="index">{{item}}</span></p>
                    <p v-for="(list,index) in message.descrption" :key="index">
                        {{list.title}}&nbsp;&nbsp; {{list.info}}
                    </p>
                    <p>价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格&nbsp;&nbsp; <span class="color1">{{message.price | price}}</span></p>
                    <!-- <div>立即报名</div> -->
                </div>
            </div>
            <div class="experts" v-if="message.expertDtos.length>0">
                <h1>会议嘉宾</h1>
                <ul class="clearfix">
                    <li v-for="(list,index) in message.expertDtos" :key="index">
                        <img :src="list.heardUrl" alt="">
                        <h2>{{list.expertName}}</h2>
                        <p>{{list.expertSchool}}</p>
                        <p>{{list.expertList | compony}}</p>
                    </li>
                    <div style="clear:both"></div>
                </ul>
            </div>

            <div class="download" v-if="message.noticeFileUrl.length>0">
                <h1>通知下载</h1>
                <ul>
                    <li v-for="(list,index) in message.noticeFileUrl" :key="index">
                        <span><i class="iconfont">&#xe61f;</i>{{list.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="download" v-if="message.meetingFileUrl.length>0">
                <h1>会议资料</h1>
                <ul>
                    <li v-for="(list,index) in message.noticeFileUrl" :key="index">
                        <span><i class="iconfont">&#xe61f;</i>{{list.name}}</span>
                    </li>
                </ul>
            </div>
            

            <div class="review">
                <h1>会议回顾</h1>
                <ul class="clearfix">
                    <li v-for="(list,index) in message.mettingList" :key="index">
                        <img :src="list.url" alt="" srcset="">
                        <p>{{list.title}}</p>
                    </li>
                </ul>
            </div>
            <div style="clear:both;"></div>
            <div class="footBtn">
                <span @click="trainRegShow = false">返 回</span>
            </div>
            
        </el-dialog>
    </div>
</template>

<script>
export default {
    props:['message'],
    data(){
        return{
            id:'',
            trainRegShow:false,
            trainingBeginTime:'',
            trainingEndTime:''
        }
    },
    created(){
    },
    methods:{
        
       
        async init(){
            // let res = await network.getTrainDetail({data:{
            //     id: this.id
            // }});
            // if(res=='error') return;
            // this.message = res;
        },
        toPreTrain(){
            this.trainRegShow = true
            this.$emit('getData')
        }
    
    },
    watch:{
        message(value){
            this.message = value
            
        }
    
    },
    filters:{
        date(val){
        //    return moment(val).format('YYYY.MM.DD');
        },
        price(val){
            if(val==0){
                return '免费'
            }else if(val>0){
                return '¥ '+val+'起'
            }else{
                return '待定'
            }
        },
        compony(val){
            if(!val){
                return ''
            }else if(val instanceof Array){
                let str = ''
                for(let i in val){
                    str += val[i] + ' '
                }
                return str
            }else{
                return val
            }
        }
    }
}
</script>

<style lang="less" scoped>

.detail{
    // background: #EEF2F7;
    // padding: 20px;
    display: inline-block;
    width: 100px;
    border: 1px solid #787D81;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    line-height: 40px;
    height: 40px;
    font-family: PingFang-SC-Medium;
    font-size: 16px;
    color: #787D81;
    &:hover{
        background-image: linear-gradient(-90deg, #3EBBFF 0%, #1D86FF 100%);
        border-radius: 5px;
        color: #fff;
        border: none
    }
    #trainPre{
        .el-dialog__footer{
            margin-top: 0;
        }
        .el-dialog__body{
            background: #EEF2F7 !important;
        }
    }
    
    

    .competition{
        // width: 1240px;
        min-height: 306px;
        background-color: #ffffff;
        margin: 0 auto;
        padding: 16px;
        margin-top: 20px;
        margin: 20px;
        img{
            width: 480px;
            height: 270px;
            float: left;
        }
        >div{
            width: 655px;
            float: left;
            text-align: left;
            margin-left: 33px;
            h2{
                font-size: 30px;
                color: #4A4A4A;
                letter-spacing: 2.73px;
                margin: 0 0 23px;
            }
            p{
                font-size: 16px;
                color: #4A4A4A;
                letter-spacing: 1.45px;
                // margin-bottom: 10px;
                .color1{
                    color: #FC3782;
                }
            }
            div{
                background-image: linear-gradient(-90deg, #00B0F3 0%, #0078E2 100%);
                border-radius: 20px;
                width: 130px;
                height: 40px;
                font-size: 16px;
                color: #FFFFFF;
                letter-spacing: 1.45px;
                text-align: center;
                line-height: 40px;
                cursor: pointer;
            }
        }
    }
    .experts{
        // width: 1240px;
        margin: 20px auto;
        background-color: #ffffff;
        margin: 20px;
        h1{
            font-size: 22px;
            color: #4A4A4A;
            letter-spacing: 2px;
            line-height: 58px;
            text-align: left;
            text-indent: 36px;
            // background: url('https://web.moocollege.com/mooc/hzq/competition/leader/bg.png') no-repeat;
            background-size: 8px 22px;
            background-position: 20px center;
            border-bottom: 1px solid #F3F3F3;
        }
        ul{
            width: 1080px;
            margin: 0 auto;
            padding: 28px 0 39px;
            li{
                width: 150px;
                height: 180px;
                float: left;
                margin: 0 15px;
                img{
                    width: 100px;
                    height: 100px;
                    border-radius: 100%;
                    display: block;
                    background: #eee;
                    margin: 0 auto;
                }
                h2{
                    font-size: 20px;
                    color: #4A4A4A;
                    letter-spacing: 3px;
                    text-align: center;
                    margin: 5px 0;
                }
                p{
                    font-size: 14px;
                    color: #4A4A4A;
                    letter-spacing: 0.88px;
                    text-align: center;
                }
            }
        }
    }
    .download{
        // width: 1240px;
        margin: 20px auto;
        background-color: #ffffff;
        text-align: left;
        margin: 20px;
        h1{
            font-size: 22px;
            color: #4A4A4A;
            letter-spacing: 2px;
            line-height: 58px;
            text-indent: 36px;
            // background: url('https://web.moocollege.com/mooc/hzq/competition/leader/bg.png') no-repeat;
            background-size: 8px 22px;
            background-position: 20px center;
            border-bottom: 1px solid #F3F3F3;
        }
        ul{
            padding-bottom: 28px;
            li{
                font-size: 16px;
                color: #4A4A4A;
                letter-spacing: 1.45px;
                text-indent: 38px;
                margin-top: 20px;
                cursor: pointer;
                i{
                    color: #1D86FF;
                    margin-right: 8px;
                }

            }
        }
    }
    .review{
        width: 1200px;
        margin: 20px auto;
        background-color: #ffffff;
        text-align: left;
        margin: 20px;
        h1{
            font-size: 22px;
            color: #4A4A4A;
            letter-spacing: 2px;
            line-height: 58px;
            text-indent: 36px;
            // background: url('https://web.moocollege.com/mooc/hzq/competition/leader/bg.png') no-repeat;
            background-size: 8px 22px;
            background-position: 20px center;
            border-bottom: 1px solid #F3F3F3;
        }
        ul{
            width: 1200px;
            margin: 0 auto;
            padding: 57px 0 40px;
            li{
                width: 270px;
                margin: 0 15px;
                float: left;
                img{
                    width: 270px;
                    height: 152px;
                }
                p{
                    width: 270px;
                    font-size: 18px;
                    color: #4A4A4A;
                    letter-spacing: 1.64px;
                    text-align: center;
                    margin-top: 10px;
                }

            }
        }
    }
    .clearfix {
        zoom: 1;
    }

    .clearfix:after {
        content: ".";
        width: 0;
        height: 0;
        visibility: hidden;
        display: block;
        clear: both;
        overflow:hidden;
    }
    .footBtn{
        background: #fff;
        padding: 30px 0;
        text-align: right;
        span{
            width: 100px;
            height: 40px;
            font-family: PingFang-SC-Medium;
            font-size: 16px;
            color: #787D81;
            letter-spacing: 0;
            text-align: center;
            line-height: 40px;
            display: inline-block;
            margin-right: 30px;
            border: 1px solid #787D81;
            border-radius: 5px;
            cursor: pointer;
            
        }
    }
    
}
</style>
