<template>
    <div id="playerDetails">
        <div class="teamDetails_top">
            <router-link :to="back()" style="color:#9B9B9B;">返回</router-link>
        </div>
        <div class="teamDetails_content">
            
            <div class="content">
                <!--
                <img src="https://web.moocollege.com/mooc/hzq/competition/user_center/deleteRace.png" class="empty">
                -->

                <div class="content_top" v-if="1">
                    <p class="titleName">
                        <i class="iconfont">&#xe65c;</i>
                        <span>{{ competition.name }}</span>
                    </p>
                    <div class="content_topRight">
                        <p v-if="isExit">
                            <i class="iconfont">&#xe659;</i>
                            <span>退出</span>
                        </p>
                    </div>
                </div>
                <div class="content_topAmend" v-else>
                    <el-select v-model="value" placeholder="请选择" style="width:450px;">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <div class="operation">
                        <span>保存编辑</span>
                        <span>取消</span>
                    </div>
                </div>
                <div class="content_title">
                    <p>选手</p>
                </div>
                <ol>
                    <li v-bind:key="index" v-for="(item, index) in memberList">
                        <img v-if="member.head" :src="member.head">
                        <img v-else="" src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png">
                        <div class="team_message">
                            <p>{{item.name}}</p>
                            <p>{{item.college}}</p>
                            <p v-if="item.academy || item.major">
                                {{item.academy}}·{{item.major}}
                            </p>
                        </div>
                    </li>
                </ol>

                <div class="content_title">
                    <p>指导老师</p>
                </div>
                <ol>
                    <li v-bind:key="index" v-for="(item, index) in teacherList">
                        <img v-if="item.head" :src="item.head">
                        <img v-else="" src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png">
                        <div class="team_message">
                            <p>
                                <p>{{item.name}}</p>
                                <em>|</em>
                                <span>指导老师</span>
                                <span v-if="isMaster">
                                    <i class="iconfont">&#xe62a;</i>
                                    移除
                                </span>
                            </p>
                            <p>{{item.college}}</p>
                            <p v-if="item.academy || item.major">
                                {{item.academy}}·{{item.major}}
                            </p>
                        </div>
                    </li>
                    <li class="addAdvisers" v-if="isMaster">
                        <div class=""><i class="iconfont">&#xe61c;</i></div>
                        <span>添加指导老师</span>
                    </li>
                </ol>

            </div>
        </div>
    </div>
</template>

<script>
import network from '@@/api/jxapi'

export default {
    data(){
        return {
            competitionId: null,
            isExit: false,
            isAddTeacher: false,
            options: [],
            team_option: '',
            teamMemberList: [
                {},
            ],
            competition: {
                name: null
            },
            memberList: [],
            teacherList: [],
            member: {}
        }
    },
    methods:{
        back(){
            let path = this.$route.path;
            if(path.indexOf('details') === -1){
                return {path:'/competition/player?id='+this.competitionId};
            } else {
                return {path:'/details/player?id='+this.competitionId};
            }
        }          
    },
    async created () {
        const competitionId = parseInt(localStorage.getItem('competitionId'), 10)
        this.competitionId = competitionId
        this.playerId = this.$route.params.playerId
        const params = { competitionId, playerId: this.playerId }

        let data = await network.getMemberInfo({data:params});
        if(data=='error') return;
        this.memberList = data.members.filter(m => m.roleId !== 2)
        this.teacherList = data.members.filter(m => m.roleId === 2)
        this.competition = data.competition
        this.isExit = data.isMaster || data.isteacher==1 || data.isAdmin || data.isMember
        this.isMaster = data.isMaster || data.isteacher==1 || data.isAdmin

    }
}
</script> 

<style lang="less" scoped>
#playerDetails{
    .teamDetails_top{
        width: 1000px;
        margin: 25px auto;
        font-size: 14px;
        color: #1D86FF;
        text-align: start;
    }
    .teamDetails_content{
        width: 1000px;
        margin: auto;
        .content{
            width: 100%;
            padding: 50px 22px 70px 57px;
            background-color: #fff;
            box-sizing: border-box;
            position: relative;
            .empty{
                position: absolute;
                top:0;
                right:0;
                cursor: pointer;
            }
            .content_top{
                display: flex;
                justify-content: space-between;
                padding-right: 20px;
                font-size: 14px;
                box-sizing: border-box;
                .titleName{
                    position: relative;
                    i{
                        position: absolute;
                        top:3px;
                        left:-20px;
                    }
                }
                .content_topRight{
                    width: 120px;
                    display: flex;
                    justify-content: space-between;
                    p{
                        color:#D0021B;
                        cursor: pointer;
                    }
                    p+p{
                        color:#1D86FF;
                    }
                }
            }
            .content_topAmend{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
                padding-right: 20px;
                box-sizing: border-box;
                .operation{
                    span{
                        color:#1D86FF;
                        cursor: pointer;
                    }
                    span+span{
                        color:#9B9B9B;
                        margin-left: 10px;
                    }
                }
            }
            .content_title{
                width: 100%;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                position: relative;
                margin-top: 20px;
                &::before{
                    content: "";
                    width: 8px;
                    height: 8px;
                    border-radius: 100%;
                    background-color: #5FF18B;
                    position: absolute;
                    top: 12px;
                    left: -20px;
                }
                .content_title_right{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                    img{
                        width: 20px;
                        height: 22px;
                        // margin-right: 10px;
                    }
                    span{
                        font-size: 16px;
                        color:#1D86FF;
                        margin-left: 10px;
                    }
                }
            }
            ol{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                li{
                    width: 400px;
                    padding: 20px 30px 25px 0;
                    box-sizing: border-box;
                    display: flex;
                    text-align: start;
                    >img{
                        width: 80px;
                        height: 80px;
                        border-radius: 100%;
                        margin-right: 20px;
                    }
                    .team_message{
                        font-size: 14px;
                        line-height: 24px;
                        p:nth-child(1){
                            font-size: 16px;
                            display: flex;
                            em{
                                margin:0 10px;
                                font-size: 14px;
                                color:#89ACD5;
                            }
                            span{
                                font-size: 14px;
                                color:#89ACD5;
                            }
                            span+span{
                                color: #D5606F;
                                margin-left: 60px;
                                cursor: pointer;
                            }
                        }
                        .pass{
                            width: 76px;
                        }
                        button{
                            margin-top: 10px;
                        }
                    }
                }
            }
            .addAdvisers{
                width: 400px;
                height: 125px;
                float: left;
                display: flex;
                align-items: center;
                cursor: pointer;
                overflow: hidden;
                div{
                    width: 80px;
                    height: 80px;
                    border-radius: 100%;
                    background: #D8D8D8;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                span{
                    font-size: 14px;
                    margin-left: 20px;
                }

            }
        }
        
    }
}
</style>