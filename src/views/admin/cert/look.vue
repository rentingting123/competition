<template>
    <div class="certSet">
        <el-form class="form" :inline="true" label-width="120px">
            <el-form-item>
                <el-button size="small"  @click="back" type="primary">返回列表</el-button>
                <el-button size="small" :disabled="complete==2 || complete==3" @click="pre" type="primary">上一步</el-button>
                <el-button size="small" :disabled="complete==2 || complete==3" @click="save" type="primary">保存</el-button>
            </el-form-item>
        </el-form>
        <div class="img" >
            <div class="type" :class="{'type3':templateId==3,'type4':templateId==4,'type5':templateId==5,'type6':templateId==6,'type8':templateId==8}">
                <img class="bg" :src="background" width="100%">
                
                <div v-if="templateId==8" class="orderTitle1">
                    <div class="name1 name">
                        <p>
                            <span>{{orderTitlework}}</span>
                        </p>
                        <span>(作品名称)</span>
                    </div>
                    <div class="name2 name">
                        <p>
                            <span>{{orderTitlestudent}}</span><span class="small">(排名不分先后)</span>
                        </p>
                        <span>(成员名称) (学校名称)</span><br />
                        <span>(成员名称) (学校名称)</span>
                    </div>
                    <div class="name3 name">
                        <p>
                            <span>{{orderTitleteacher}}</span>
                        </p>
                        <span>(老师名称)</span>
                    </div>
                </div>
                <div v-else class="orderTitle">
                    <div class="name">
                        <p>
                            <span>{{orderTitleschool}}:</span>
                        </p>
                        <span>(组织名称)</span>
                    </div>
                    <div class="name">
                        <p>
                            <span>{{orderTitlestudent}}:</span>
                        </p>
                        <span>(获奖者姓名)</span>
                    </div>
                    <div class="name">
                        <p>
                            <span>{{orderTitleteacher}}:</span>
                        </p>
                        <span>(指导老师)</span>
                    </div>
                    <div class="name">
                        <p>
                            <span>{{orderTitlework}}:</span>
                        </p>
                        <span>(作品名称)</span>
                    </div>
                </div>

                <div class="code">
                    <div class="codeimg"></div>
                    <span>
                        <p >证书编号</p>
                        <p class="code1">{{prefix}}XXXX</p>
                    </span>
                </div>

                <div v-if="templateId==8" class="message">
                    <p>
                        &nbsp;
                    </p>
                    <h3>最具创新奖</h3>
                </div>
                <div v-else class="message">
                    <p>
                        {{text}}
                    </p>
                    <h2>一等奖</h2>
                    <h3>特发此证，以资鼓励！</h3>
                </div>

                <div class="footer">
                    <div class="name">
                        <p>
                            <span>{{inscribeText}}</span>
                        </p>
                    </div>
                    <div class="name">
                        <p>
                            <span>{{inscribeDate}}</span>
                        </p>
                    </div>
                    <img v-if="sealUrl" :src="sealUrl">
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import network from '@@/api/jxapi'
export default {
    props:['certs','setCerts','competitionId','backurls'],
    data(){
        return{
            sealUrl:'',
            backUrl:'',
            templateId: 5,
            background: 'https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/i9y6hO8U_1563265195053/bg5.jpg',
            orderTitleschool:'学校',
            orderTitlestudent: '学生',
            orderTitleteacher: '指导老师',
            orderTitlework: '参赛作品',
            inscribeText:'杭州简学科技有限公司',
            inscribeDate:'2018.12.31',
            prefix: '',
            text:'',
            complete:0
        }
    },
    created(){
        this.init()
    },
    methods:{
        back(){
            if(this.backurls){
                this.$router.push(this.backurls)
            }else{
                this.$router.push('/admin/cert')
            }
        },
        async init(){
            let res = this.certs
            this.templateId = res.templateId
            if(res.backUrl){
                this.background = res.backUrl
            }else{
                if(this.templateId==3){
                    this.background = 'https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/ob6LrUpi_1563265167457/bg3.jpg'
                }else if(this.templateId==4){
                    this.background = 'https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/KOx6nhTX_1563265179988/bg4.jpg'
                }else if(this.templateId==5){
                    this.background = 'https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/i9y6hO8U_1563265195053/bg5.jpg'
                }else if(this.templateId==6){
                    this.background = 'https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/v5jZmWeF_1563265207591/bg6.jpg'
                }else if(this.templateId==8){
                    this.background = 'https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/v5jZmWeF_1563265207591/bg7.jpg'
                }
            }
            this.complete = res.complete?res.complete:0
            this.inscribeText = res.inscribeText
            this.inscribeDate = res.inscribeDate
            this.sealUrl = res.sealUrl
            this.prefix = res.prefix
            this.text = res.text
            for(let i in res.orderTitle){
                if(res.orderTitle[i].code == 'school'){
                    this.orderTitleschool = res.orderTitle[i].content
                }else if(res.orderTitle[i].code == 'student'){
                    this.orderTitlestudent = res.orderTitle[i].content
                }else if(res.orderTitle[i].code == 'teacher'){
                    this.orderTitleteacher = res.orderTitle[i].content
                }else if(res.orderTitle[i].code == 'pool'){
                    this.orderTitlework = res.orderTitle[i].content
                }
            }
        },
        pre(){
            return this.setCerts && this.setCerts('', 2)
        },
        async save(){
            let params = Object.assign({},this.certs);
            if(params.inscribeText=='杭州简学科技有限公司'){
                params.inscribeText = ''
            }
            if(params.inscribeDate=='2018.12.31'){
                params.inscribeDate = ''
            }
            if(params.backUrl=='' && params.templateId==8){
                params.backUrl = 'https://web.moocollege.com/edit/2019716/a90dbd3dc0c04e3b589e3d551f0c1659/v5jZmWeF_1563265207591/bg7.jpg'
            }
            params.competitionId = this.competitionId;
            params.backUrl = params.backUrl && params.backUrl.replace('https://', 'http://')
            params.sealUrl = params.sealUrl && params.sealUrl.replace('https://', 'http://')
            
            let res = await network.setCert({data:params});
            if(res=='error') return;
            this.$router.push('/admin/cert')

        }        
    }
}
</script>

<style lang="less" scoped>
.form{
    text-align: left;
    margin-top: 20px;
}
.img{
    margin-top: 30px;
    padding-bottom: 30px;
    .type{
        width: 1052.4px;
        height: 744px;
        position: relative;
        color: #635300;
        .orderTitle{
            position: absolute;
            top: 189px;
            left: 110.1px;
            font-size: 19.5px;
            line-height: 26px;
            text-align: left;
            .name{
                margin-bottom: 9.7px;
                width: 660px;
                position: relative;
                i{
                    position: absolute;
                    top: 0;
                    left: -20px;
                    cursor: pointer;
                }
                p{
                    width: 85px;
                    display: inline-block;
                    margin-right: 17.9px;
                }
            }
        }
        .code{
            width: 120px;
            height: auto;
            position: absolute;
            top: 60.6px;
            right: 55.8px;
            text-align: left;
            .codeimg{
                width: 120px;
                height: 120px;
                background: #fff;
                margin-bottom: 8.7px;
            }
            p{
                font-size: 15px;
                line-height: 21px;
            }
            p.code1{
                font-size: 12px
            }
        }
        .message{
            width: 715.2px;
            height: auto;
            position: absolute;
            top: 350.1px;
            left: 168.3px;
            text-align: left;
            p{
                font-size: 24px;
                line-height: 33px;
                text-indent: 2em;
            }
            h2{
                font-size: 84px;
                color: #D0021B;
                line-height: 90px;
                text-align: center;
                margin: 26.7px;
            }
            h3{
                font-size: 19.5px;
                line-height: 26px;
                font-weight: 150;
            }
        }
        .footer{
            width: auto;
            height: auto;
            position: absolute;
            top: 607.2px;
            right: 140.4px;
            font-size: 19.5px;
            line-height: 26px;
            text-align: right;
            .name{
                position: relative;
                z-index: 2;
                i{
                    position: absolute;
                    top: 0;
                    left: -20px;
                    cursor: pointer;
                }
            }
            img{
                width: 178.5px;
                height: 178.5px;
                position: absolute;
                right: 0;
                top: -93.3px;
                z-index: 1;
            }
        }
    }

    .type5,.type6,.type8{
        width: 1116px;
        height: 1578.6px;
        position: relative;
        .orderTitle{
            top: 431px;
            left: 114px;
            font-size: 29.25px;
            line-height: 40px;
            .name{
                margin-bottom: 14px;
                width: 840px;
                p{
                    width: 127px;
                    margin-right: 27.6px;
                }
            }
        }
        .code{
            width: 180px;
            top: 63.5px;
            right: 57.1px;
            .codeimg{
                width: 180px;
                height: 180px;
                background: #fff;
                margin-bottom: 13px;
            }
            p{
                font-size: 22.5px;
                line-height: 31px;
            }
        }
        .message{
            width: 813.6px;
            top: 687.6px;
            left: 145.8px;
            p{
                font-size: 36px;
                line-height: 50px;
                text-indent: 2em;
            }
            h2{
                font-size: 126px;
                line-height: 135px;
                margin: 39.6px 0 85.5px;
            }
            h3{
               font-size: 29.25px;
                line-height: 40px;
                font-weight: 150;
            }
        }
        .footer{
            top: 1224px;
            right: 170.6px;
            font-size: 29.25px;
            line-height: 40px;
        }
    }
    .type8{
        .code{
            width: auto;
            top: 1069px;
            left: 131px;
            right: 0;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .codeimg{
                width:116px;
                height:116px;
                background:rgba(157,120,76,1);
                margin-right: 14px;
                margin-bottom: 0;
            }
            span{
                height:116px;
                width: 140px;
                display: flex;
                justify-content: flex-start;
                align-items: flex-end;
                flex-wrap: wrap;
                align-content: flex-end;
            }
            p{
                width:138px;
                font-size:22px;
                color:rgba(74,74,74,1);
                line-height:31px;
                &.code1{
                    font-size:22px;
                }
            }
        }
        .message{
            width: 100%;
            top: 292px;
            left: 0;
            text-align: center;
            p{
                width:100%;
                height:105px;
                font-size:77px;
                color:rgba(156,121,74,1);
                line-height:105px;
                text-indent: 0;
                font-weight: bold;
                margin: 0 auto;
            }
            h3{
                width:100%;
                height:123px;
                font-size:90px;
                color:rgba(156,121,74,1);
                line-height:123px;
                font-weight: bold;
                margin: 0 auto;
                margin-top: 96px;
            }
        }
        .footer{
            top: 1218px;
            right: 157px;
            font-size: 29.25px;
            line-height: 40px;
            img{
                top: -59.3px;
            }
        }
        .orderTitle1{
            position: relative;
            .name{
                position: absolute;
                text-align: left;
                font-size: 29.25px;
                line-height: 40px;
                i{
                    position: absolute;
                    top: 6px;
                    left: -20px;
                    cursor: pointer;
                }
                p{
                    span{
                        font-size:41px;
                        color:rgba(156,121,74,1);
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    span.small{
                        font-size:23px;
                        color:rgba(156,121,74,1);
                        line-height:31px;
                        font-weight: normal;
                    }
                }
                span{
                    font-size:23px;
                    color:rgba(156,121,74,1);
                    line-height:31px;
                }
            }
            .name1{
                left: 133px;
                top: 726px;
            }
            .name2{
                left: 612px;
                top: 726px;
            }
            .name3{
                left: 133px;
                top: 879px;
            }
            .name4{
                left: 133px;
                top: 1253px;
                p{
                    margin-bottom: 23px;
                }
            }
        }
    }
    .type4,.type6{
        color: #415E80;
    }
    .bg{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
    }
}
</style>
