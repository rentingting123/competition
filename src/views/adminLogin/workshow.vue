<template>
    <el-row class="adminlogin">
       <el-col :span="24">
           <div class="middle">
                <div class="header">
                    <img src="https://web.moocollege.com/mooc/hzq/competition/home/logo1.png" alt="" srcset="">
                </div>
               <div class="team" v-if="teamlist">
                   <h2>{{teamlist.groupName}}</h2>
                   <p>团队成员</p>
                   <ul>
                       <li v-for="item in teamlist.members">
                            <img v-if="item.icon" :src="item.icon" width="40" height="40" />
                            <img v-else src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png" width="40" height="40" />
                            <div>
                                <p class="message_txt">
                                {{item.name}}
                                <em>|</em>
                                <span>{{item.roleName}}</span>
                                </p>
                                <p>{{item.college}} {{item.academy}}</p>
                            </div>
                       </li>
                   </ul>
               </div>

                <div class="workdetail" v-if="works">
                    <h2>
                        {{works.title}}
                        <p></p>
                    </h2>
                    <div>
                        <p class="workdetailmain" v-html="works.infoObj && works.infoObj.content"></p>
                        <p class="title"></p>
                    </div>
                    <p class="more" @click="more">查看全文<i class="iconfont el-icon-arrow-down"></i></p>
                </div>

                <div class="works" v-if="works && works.infoObj">
                    <ul>
                        <li v-for="(items,index) in works.infoObj.attachList" >
                            <h2>{{items.attachName}}</h2>
                            <div v-for="(item,j) in items.fileList" class="clearfix">
                                <p class="fl">
                                    {{item.name}}
                                    <span class="fr" @click="read(item,index,j)">查看</span>
                                </p>
                                <div v-if="item.type==1 && !item.close" class="show">
                                    <!-- pdf -->
                                    <FileReview :url="item.url" :index="`${index}_${j}`"/>
                                </div>
                                <div v-else-if="item.type==2 && !item.close" class="show">
                                    <video width="100%"  preload="auto" oncontextmenu="return false" controls="true" controlslist="nodownload">
                                            <source :src="item.url" type="video/mp4">
                                            您的浏览器不支持 video 标签。
                                    </video>
                                </div>
                                <div v-else-if="item.type==3 && !item.close" class="show">
                                    <img :src="item.url" width="100%">
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>

           </div>
       </el-col>
    </el-row>
</template>

<script>
import network from '@@/api/jxapi'
import FileReview from "@@/components/fileReview";
export default {
    components:{
        FileReview
    },
    data(){
        return{
            workid: '',
            teamlist: '',
            works: ''
        }
    },
    created(){
        document.getElementById('app').style.minWidth = '1px';
        this.workid = this.$route.params.id;
        if(!this.workid) return this.$message.warning('未获取到对应的作品')
        let islogin = localStorage.getItem('adminLogin')
        if(!islogin) {
            this.$message.warning('请先登录，然后进行访问')
           return this.$router.push({path:'/adminLogin/'+this.workid});
        }
        this.getTeam();
    },
    methods:{
        async getTeam(){
            let teamlist = await network.getTeamList({ id: this.workid });
            if (teamlist == "error") return;
            this.teamlist = teamlist
            this.getworksDetail();
        },
        async getworksDetail() {
            let data = await network.getWorkRuleByCompetitionId({ id: this.workid });
            if (data == "error" || !data) return;
            if(data.infoObj && data.infoObj.attachList){
                let arr = data.infoObj.attachList
                for(let i in arr){
                    for(let j in arr[i].fileList){
                        this.$set(arr[i].fileList[j],'close',true)
                    }
                }
            }
            this.works = data
        },
        read(item,i,j){
            if(item.type==4){
                location.href = 'http://'+item.url
            }else if(item.type == 5){
                this.$message.warning('请联系获奖人查看该文件');
            }else{
                this.$set(this.works.infoObj.attachList[i].fileList[j],'close',false);
            }
        },
        more(){
            document.querySelector('.title').style.display = "none";
            document.querySelector('.more').style.display = "none";
            document.querySelector('.workdetailmain').style.maxHeight = '1000px'
        }
    }
}
</script>

<style lang="less" scoped>
    .adminlogin{
        width: 100%;
        min-height: 100vh;
        background: url('https://web.moocollege.com/mooc/hzq/competition/cert/mlogo.png') no-repeat, linear-gradient(-49deg, #0078E2 0%, #2BD2B3 100%);
        background-position: bottom right,top left;
        position: relative;
        .middle{
            width: 100%;
            margin: 0 auto;
        }
        .header{
            width: 100%;
            padding: 21px 0 21px;
            img{
                width: 80%;
                height: auto;
            }
        }
        .team{
            width: 90%;
            margin: 0 auto;
            margin-bottom: 18px;
            position: relative;
            >p{
                position: absolute;
                top: 83px;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                width: 92px;
                height: 20px;
                border-radius: 20px;
                background: #0078E2;
                font-size: 14px;
                line-height: 20px;
                color: #FFFFFF;
            }
            h2{
                background: #FFFFFF;
                border-radius: 5px;
                width: 100%;
                line-height: 83px;
                text-align: center;
                font-size: 20px;
                color: #4A4A4A;
                border-bottom: 1px #0078e2 dashed;
            }
            ul{
                width: 100%;
                background: #FFFFFF;
                border-radius: 5px;
                height: auto;
                font-size: 16px;
                color: #4A4A4A;
                text-align: left;
                padding: 21px 0;
                li{
                    display: flex;
                    height: 50px;
                    overflow: hidden;
                    padding: 0 16px;
                    margin-bottom: 10px;
                    > img {
                        border-radius: 100%;
                        margin-right: 8px;
                    }
                    p {
                        font-size: 14px;
                    }
                    .message_txt {
                        font-size: 16px;
                        em {
                            margin: 0 8px;
                        }
                        span {
                            font-size: 13px;
                            color: #89acd5;
                        }
                    }
                }
            }
        }
        .workdetail{
            width: 100%;
            height: auto;
            background: #FFFFFF;
            border-radius: 10px 10px 0px 0px;
            box-shadow: 0 2px 4px 0 rgba(206,225,243,0.50);
            h2{
                font-size: 18px;
                color: #4A4A4A;
                line-height: 27px;
                padding-top: 20px;
                p{
                    width: 26px;
                    height: 2px;
                    background: #D7DFE8;
                    margin: 8px auto;
                }
            }
            >div{
                font-size: 15px;
                color: #4A4A4A;
                line-height: 20px;
                width: 90%;
                margin: 0 auto;
                position: relative;
                text-align: left;
                padding-bottom: 10px;
                box-shadow: 0 2px 4px 0 rgba(206,225,243,0.50);
                p{
                    min-height: 56px;
                    max-height: 140px;
                    overflow: hidden;
                }
                .title{
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    height: 56px;
                    background-image: linear-gradient(-180deg, rgba(255,255,255,0.00) 0%, #FFFFFF 95%);
                }
            }
            .more{
                font-size: 12px;
                color: #0078E2;
                line-height: 20px;
                text-align: center;
                padding: 10px 0 18px;
                cursor: pointer;
            }
        }
        .works{
            width: 100%;
            height: auto;
            background: #FFFFFF;
            text-align: left;
            li{
                box-shadow: 0 2px 4px 0 rgba(206,225,243,0.50);
                h2{
                    font-size: 18px;
                    color: #4A4A4A;
                    line-height: 27px;
                    border-bottom: 1px solid #F4F4F4;
                    padding: 10px 20px;
                }
                >div{
                    line-height: 24px;
                    font-size: 16px;
                    color: #4A4A4A;
                    padding: 10px 20px;
                    .fr{
                        float: right;
                        background-image: linear-gradient(-90deg, #00B0F3 0%, #0078E2 100%);
                        border-radius: 12px;
                        width: 47px;
                        height: 20px;
                        line-height: 20px;
                        text-align: center;
                        margin: 2px 0;
                        font-size: 11px;
                        cursor: pointer;
                        color: #FFFFFF;
                    }
                    .show{
                        width: 90%;
                        margin: 10px auto;
                    }
                }

            }
        }

    }
</style>
