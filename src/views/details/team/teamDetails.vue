<template>
    <div id="teamDetails">
        <div class="teamDetails_top">
            <a @click="back" >{{$t('teamDetail.back')}}</a>
        </div>
        <div class="teamDetails_content"  v-loading='loading'>
            <div class="teamDetails_contentTop">
                <p class="proTeam" v-if="!isupdata">
                    <span class="groupName">
                        {{groupInfo.groupName}}
                    </span>
                    <!-- 获奖信息 start -->
                    <span class="proedBack" v-if="groupInfo.awardName" >
                        <span class="proStatus proStatus1"></span>
                        <span class="proed">
                            {{groupInfo.awardName}}
                        </span>
                    </span> 
                    <span class="proedBack" v-else-if="groupInfo.status===1" >
                        <span class="proStatus"></span>
                        <span class="proed">
                            {{groupInfo.rowName}}{{$t('teamDetail.qualify')}}
                        </span>
                    </span> 
                    <span class="passPro" v-else-if="groupInfo.status===2">
                        {{groupInfo.rowName}}{{$t('teamDetail.noQualify' )}}
                    </span> 
                    <!-- 获奖信息 end -->
                </p>
                <div v-else @click="changeenterTeamName">
                    <el-input 
                    v-model="groupName" 
                    
                    @change="setLists()"
                    :placeholder="$t('teamDetail.enterTeamName')" 
                    style="width:478px;" >
                </el-input>
                </div>
                <!-- 团队码 -->
                <div class="invitationCode" v-if="applyType==2">
                    <span>{{$t('teamDetail.code')}}</span>
                    <span>{{groupInfo.invitcode}}</span>
                </div>
                <!-- 删除团队 -->
                <img @click="delGroup" v-if="authority.delTeamInfo" src="https://web.moocollege.com/mooc/hzq/competition/user_center/deleteRace.png">
            </div>

            <div class="content">
                <div class="content_top" v-if="!isupdata">
                    <!-- 竞赛名称 -->
                    <p class="titleName" @click="$router.push('/details?id='+competitionNameId)">
                        <i class="iconfont">&#xe65c;</i>
                        <span>{{competitionName}}</span>
                    </p>
                    <!-- 支付报名费 start -->
                    <payment :groupInfo='groupInfo' :close='init'>
                        
                        <!-- 退出团队 -->
                        <p v-if="groupInfo.isMember" v-show="applyType==2" @click="outGroup" class="team">
                            <i class="iconfont">&#xe659;</i>
                            <span>{{$t('teamDetail.outTeam')}}</span>
                        </p>
                        <!-- 找人组队 -->
                        <!-- <el-button type="text">找人组队</el-button> -->
                         <p v-if="groupInfo.isMember" v-show="applyType==2" @click="findpeople(0)" class="team">
                            <!-- <i class="iconfont">&#xe659;</i> -->
                            <span style="color:#1D86FF">找人组队</span>
                        </p>
                        <!-- 编辑 -->
                        <p v-if="authority.editTeamInfo" @click="bianji">
                            <i class="iconfont">&#xe657;</i>
                            <span>{{$t('teamDetail.edit')}}</span>
                        </p>
                    </payment>
                    <!-- 支付报名费 end -->
                </div>
                <div class="content_topAmend" v-else>
                    <!-- <el-select v-model="editData.competitionId" :placeholder="$t('teamDetail.choose')" style="width:450px;">
                        <el-option
                            v-for="item in list"
                            :key="item.competitionId"
                            :label="item.competitionInfo.name"
                            :value="item.competitionId">
                        </el-option>
                    </el-select> -->
                    <!-- 20210623 永乐要求暂时隐藏切换赛项 -->
                    <p class="titleName">
                        <i class="iconfont">&#xe65c;</i>
                        <span>{{competitionName}}</span>
                    </p>
                    <div class="operation">
                        <!-- <span @click="updateGroupInfo">{{$t('teamDetail.save')}}</span> -->
                        <el-button type="text" :disabled="isblur" @click="cancel(1)">{{$t('teamDetail.over')}}</el-button>
                    </div>
                </div>
                <!--<div class="content_title">
                    <p>当前成员 4/5</p>
                    <div class="content_title_right" v-if="0">
                        <img src="https://web.moocollege.com/mooc/hzq/competition/competition/编辑.svg">
                        <span>编辑成员</span>
                    </div>
                    <div class="content_title_right" v-else>
                        <span>保存编辑</span>
                        <span style="color:#9B9B9B;">取消</span>
                    </div>
                </div>-->
                <!-- 队长 start -->
                <div class="content_title">
                    <p>
                        <span v-if="applyType==2">{{$t('teamDetail.lerder')}}</span>
                        <span v-else>{{$t('teamDetail.contestants')}}</span> 
                        <el-tooltip :content="$t('teamDetail.contestantsMess')" v-if="applyType==2">
                            <em class="el-icon-question"></em>
                        </el-tooltip>
                    </p>
                </div>
                
                <detailss
                    :lists='captainList'
                    :isAdmin='isAdmin'
                    :edit='isupdata'
                    :changeMember='changeMember'
                    :delMember='delMember'
                    :moveForwardMember='moveForwardMember'
                     :bcackwardShiftMember='bcackwardShiftMember'
                    :type='1'
                >
                    <addAdviser  v-if="authority.editTeamInfo && isupdata" :applyType='applyType' :groupId="groupInfo.groupId" :close='addAdvisers' />
                </detailss>
                <!-- 队长 end -->
                <!-- 指导老师 start -->
                <div class="content_title">
                    <p>
                        <span>{{$t('teamDetail.teacher')}}</span>
                        <el-tooltip :content="$t('teamDetail.teacherMess')"><em class="el-icon-question"></em></el-tooltip>
                    </p>
                </div>
                <detailss
                    :lists='teacherList'
                    :isAdmin='isAdmin'
                    :edit='isupdata'
                    :changeMember='changeMember'
                    :delMember='delMember'
                    :moveForwardMember='moveForwardMember'
                     :bcackwardShiftMember='bcackwardShiftMember'
                    :type='2'
                />
                <!-- 指导老师 end -->
                <!-- 企业导师 start -->
                <div class="content_title" v-if="teacherCompanyList.length>0">
                    <p>
                        <span>{{$t('teamDetail.componeyTeacher')}}</span>
                    </p>
                </div>
                <detailss
                    :lists='teacherCompanyList'
                    :isAdmin='isAdmin'
                    :edit='isupdata'
                    :changeMember='changeMember'
                    :delMember='delMember'
                    :moveForwardMember='moveForwardMember'
                     :bcackwardShiftMember='bcackwardShiftMember'
                    :type='2'
                />
                <!-- 企业导师 end -->
                <!-- 团队成员 start -->
                <div class="content_title" v-if="applyType==2">
                    <p>
                        <span>{{$t('teamDetail.teamMember')}}</span>
                    </p>
                </div>
                <detailss 
                    v-if="applyType==2"
                    :lists='playerList'
                    :isAdmin='isAdmin'
                    :edit='isupdata'
                    :changeMember='changeMember'
                    :delMember='delMember'
                    :moveForwardMember='moveForwardMember'
                    :bcackwardShiftMember='bcackwardShiftMember'
                    :type='3'
                />
                <!-- 团队成员 end -->
                <!-- 20210628 去掉申请加入成员 -->
                <!-- 申请加入列表 start -->
                <!-- <div class="content_title" v-show="applyType==2" v-if="authority.auditTeamInfo">
                    <p @click="applyGroup">{{$t('teamDetail.applyGroup')}}</p>
                </div> 
                <applyGroup
                    v-if="authority.auditTeamInfo" 
                    v-show="applyType==2"
                    :lists='groupInfo.reqMembers'
                    :groupInfo='groupInfo'
                    :close='applyGroupClose'
                 /> -->
                <!-- 申请加入列表 end -->
                <!-- 修改记录 start -->
                <div class="content_title">
                    <p>
                        <span>{{$t('teamDetail.logs')}}</span>
                        <small v-if="!logShow" @click="logShow = !logShow">展开<i class="el-icon-caret-bottom"></i></small>
                        <small v-else @click="logShow = !logShow">收起<i class="el-icon-caret-top"></i></small>
                    </p>
                </div>
                <logs v-if="logShow" ref='logs' />
                <!-- 修改记录 end -->
            </div>
        </div>

    </div>
</template>


<script>

import jxapi from '@@/api/jxapi/index'
import { getBaseInfo } from '@@/utils/commons.js'
import { mapState } from 'vuex';
import addAdviser from './common/addAdvisers'
import detailss from './common/detail'
import applyGroup from './common/applyGroup'
import payment from './common/payment'
import logs from './common/logs'
    export default {
        props:['isOut'],
        components:{
            addAdviser,
            detailss,
            applyGroup,
            payment,
            logs,
        },
        data(){
            return {
                isupdata:false,
                applyType:'',
                list:[],
                editData: {
                    competitionId: null
                },
                groupInfo: [],
                playerList: [],
                captainList: [],
                teacherList: [],
                teacherCompanyList: [],
                competitionName: '',
                competitionNameId: '',
                groupName: '',
                isAdmin: false,
                edit: false,
                changeMemberList: [],
                page:'',
                isEdit:false,
                baseInfo:{},
                teamId: '',
                logShow: false, 
                loading: false,
                jieshu:null,
                isblur:false
            }
        },
        computed:mapState({
            authority: state=>state.authorityManagement
        }),
        mounted() {
            this.teamId = this.$route.params.teamId
            this.page = this.$route.query.page
            this.competitionId = this.$route.params.competitionId
            this.$store.dispatch('AuthorityTeams',{
                gId:this.teamId,
                cId:this.competitionId
            })
            this.init()
        },
        methods: {
            changeenterTeamName(){
                console.log(123);
                this.isblur = true
            },
            bianji(){
                this.edit=!this.edit
                this.isupdata = !this.isupdata
            },
            findpeople(num){
                this.$router.push({path:'/searchteam',query:{type:num,comid:this.$route.query.id}})
            },
            applyGroupClose(member){
                this.groupInfo.reqMembers.filter(obj => obj.objectRoleTargetId !== member.objectRoleTargetId)
                this.getGroupInfo()
            },
            cancel(type){
                this.getGroupInfo();
                this.isupdata = !this.isupdata
                this.edit = !this.edit;
            },
            addAdvisers(data){
                this.changeMemberList.push(data)
                this.setLists()
            },
            back(){
                if(this.isOut){
                    localStorage.setItem('competitionId',this.competitionId)
                    this.$router.push({path:"/details/team"});
                }else{
                    this.$router.back(-1)
                }
            },
            init () {
                this.baseInfo = getBaseInfo();
                this.getGroupInfo()
            },
            async applyGroup () {
                let result =  await jxapi.applyInTeamApi({id:this.teamId});
                if(result=='error') return;
            },
            delGroup() {
                this.$confirm( this.$t('teamDetail.delMess'), this.$t('teamDetail.confirm'), {
                    confirmButtonText: this.$t('teamDetail.ok'),
                    cancelButtonText: this.$t('teamDetail.cancel'),
                    dangerouslyUseHTMLString: true,
                    type: 'warning'
                }).then( async () => {
                    let del = await jxapi.delGroup({
                        data:{groupId: this.groupInfo.groupId, competitionId: this.competitionId }
                    })
                        if(del == 'error') return
                        this.$message.success(this.$t('teamDetail.delSuccess'))
                        this.$router.back()
             
                }).catch(() => {
                    this.$message.info(this.$t('teamDetail.delCancel'));
                });
            },
            
            async outGroup() {
                this.$confirm(this.$t('teamDetail.outTeamMess'), this.$t('teamDetail.confirm'),{
                    confirmButtonText: this.$t('teamDetail.ok'),
                    cancelButtonText: this.$t('teamDetail.cancel'),
                    type: 'warning'
                }).then( async () => {
                    let ret = await jxapi.outGroup({
                        data:{groupId: this.groupInfo.groupId, competitionId: this.competitionId}
                    })
                    if(ret == 'error') return 
                    this.$message.success(this.$t('teamDetail.outTeam1'));
                    this.getGroupInfo();
                }).catch(() => {
                });
            },
            setLists(type){
                this.teacherList = this.changeMemberList.filter(m => m.roleId === 2) || []
                this.teacherList.sort(function(a,b){
                    return a.sort>b.sort?1:-1
                })
                this.teacherCompanyList = this.changeMemberList.filter(m => m.roleId === 23) || []
                this.teacherCompanyList.sort(function(a,b){
                    return a.sort>b.sort?1:-1
                })
                this.playerList = this.changeMemberList.filter(m => m.roleId === 5) || []
                this.playerList.sort(function(a,b){
                    return a.sort>b.sort?1:-1
                })
                this.captainList = this.changeMemberList.filter(m => m.roleId === 3) || []
                if(type !== 0){
                    this.updateGroupInfo()
                }
                this.isblur = false
            },
            async getGroupInfo() {
                let data = await jxapi.groupInfoApi({id:this.teamId})
                if(data=='error') return this.$message.error(this.$t('teamDetail.teamMessError')) 
                this.groupInfo = data
                this.groupName = data.groupName
                this.isEdit=data.isEdit
                this.isMaster=data.isMaster
                // 20210223 ww要求去掉isadmin控制（编辑和删除相同权限）
                this.isAdmin = data.isteacher==1 || data.isMaster || true
                this.changeMemberList = data.members 
                this.setLists(0)
                this.competitionNameId = data.competition.id 
                this.applyType = data.competition.applyType
                let list = await jxapi.findLineCompetition({id:this.competitionId})
                if(list == 'error') return this.$message.error(this.$t('teamDetail.listsError')) 
                if(list.length<1){
                    this.list = [{
                        competitionId:this.baseInfo.id,
                        competitionInfo:{
                            intro:null,
                            name:this.baseInfo.name
                        },
                        index:''
                    }]
                    this.competitionName = this.baseInfo.name
                    this.editData.competitionId = this.baseInfo.id
                }else{
                    this.list = list
                    this.list.forEach(obj => {
                        if(this.competitionNameId === obj.competitionId){
                            this.competitionName = obj.competitionInfo.name
                            this.editData.competitionId = this.competitionNameId
                        }
                    })
                }
            },
            changeMember(member,val) {
                // const user = this.changeMemberList.filter(m => m.id === member.id)[0]
                // user.roleId = member.roleId
                this.changeMemberList.forEach(obj => {
                    if(obj.id === member.id){
                        obj.roleId = val
                    }
                })
                this.setLists()
            },
            delMember(item){
                this.changeMemberList = this.changeMemberList.filter(obj => obj.id !== item.id)
                this.setLists()
            },
            moveForwardMember(item,index,sort){
                if(item.roleId==2){
                    let arr = []
                    let brr = this.teacherList.concat()
                    arr[0] = item
                    arr[1] = this.teacherList[index-1]
                    brr[index] = arr[1]
                    brr[index-1] = arr[0]
                    this.teacherList = brr
                }else if(item.roleId==23){
                    let arr = []
                    let brr = this.teacherCompanyList.concat()
                    arr[0] = item
                    arr[1] = this.teacherCompanyList[index-1]
                    brr[index] = arr[1]
                    brr[index-1] = arr[0]
                    this.teacherCompanyList = brr
                }else if(item.roleId==5){
                    let arr = []
                    let brr = this.playerList.concat()
                    arr[0] = item
                    arr[1] = this.playerList[index-1]
                    brr[index] = arr[1]
                    brr[index-1] = arr[0]
                    this.playerList = brr
                }
                this.updateGroupInfo()
            },
            bcackwardShiftMember(item,index,sort){
                if(item.roleId==2){
                    let arr = []
                    let brr = this.teacherList.concat()
                    arr[0] = this.teacherList[index+1]
                    arr[1] = item 
                    brr[index] = arr[0]
                    brr[index+1] = arr[1]
                    this.teacherList = brr
                }else if(item.roleId==23){
                    let arr = []
                    let brr = this.teacherCompanyList.concat()
                    arr[0] = this.teacherCompanyList[index+1]
                    arr[1] = item 
                    brr[index] = arr[0]
                    brr[index+1] = arr[1]
                    this.teacherCompanyList = brr
                }else if(item.roleId==5){
                    let arr = []
                    let brr = this.playerList.concat()
                    arr[0] = this.playerList[index+1]
                    arr[1] = item 
                    brr[index] = arr[0]
                    brr[index+1] = arr[1]
                    this.playerList = brr
                }
                this.updateGroupInfo()
            },
            async  updateGroupInfo() {
                this.loading = true
                if (!this.edit) {
                    this.loading = false
                    return
                }
                if (this.captainList.length === 0) {
                    this.loading = false
                   return this.$message.error(this.$t('teamDetail.haveleLeader'))
                }

                if(!this.groupName) {
                    this.loading = false
                   return this.$message.error(this.$t('teamDetail.nameshould'))
                }

                let list = []
                let allArr = [...this.captainList,...this.teacherList,...this.teacherCompanyList,...this.playerList]
                for(let i in allArr){
                    if(JSON.stringify(allArr[i])!='{}'){
                        list.push({
                            userId: allArr[i].id,
                            roleId: allArr[i].roleId,
                            sort:i
                        })
                    }
                }
                let param = {
                    groupId: this.groupInfo.groupId,
                    list: list,
                    teamName: this.groupName,
                    theme: this.editData.competitionId || this.competitionId,
                    competitionId: this.competitionId
                }
                let ret = await jxapi.updateGroupRole({data:param})
                if(ret == 'error') {
                    this.getGroupInfo()
                    this.loading = false
                } else{
                     if (this.editData.competitionId) {
                    this.competitionId = this.editData.competitionId
                    //location.href = `/#/competition/team/${this.groupInfo.groupId}/${this.editData.competitionId}`
                    //return
                }
                // this.init()
                //this.changeMemberList = []
                // this.edit = !this.edit
               
                this.loading = false
                // 修改记录 重新加载
                // if(this.$refs.logs){
                //     this.$refs.logs.getLists();
                // }
                // this.getGroupInfo()
                }
               
            },
        }
    }
</script> 


<style lang="less" scoped>
#teamDetails{
    .teamDetails_top{
        width: 1000px;
        margin: 25px auto;
        font-size: 14px;
        color: #1D86FF;
        text-align: left;
        a{
            color:#9B9B9B;
            cursor: pointer;
        }
    }
    .teamDetails_content{
        width: 1000px;
        margin: auto;
        .teamDetails_contentTop{
            background-image: url(https://web.moocollege.com/mooc/hzq/competition/competition/team_detail.png);
            background-repeat: no-repeat;
            width: 1000px;
            min-height: 50px;
            padding: 15px 40px;
            background-size: cover;
            background-position: center;
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-sizing: border-box;
            position: relative;
            border-top-right-radius: 8px;
            >p{
                font-size: 24px;
                color: #fff;
            }
            >img{
                width: 38px;
                height: 38px;
                position: absolute;
                right: 0;
                top: 0;
            }
            .invitationCode{
                width: 187px;
                height: 50px;
                line-height: 50px;
                // opacity: 0.53;
                background: #000000;
                background:rgba(0,0,0,0.4);
                border-radius: 5px;
                font-size: 14px;
                color: #fff;
                text-align: center;
                span:nth-child(1){
                    margin-right: 20px;
                }
            }
        }
        .content{
            width: 100%;
            padding: 25px 22px 70px 57px;
            background-color: #fff;
            box-sizing: border-box;
            .content_top{
                display: flex;
                justify-content: space-between;
                padding-right: 20px;
                font-size: 14px;
                box-sizing: border-box;
                .titleName{
                    position: relative;
                    cursor: pointer;
                    i{
                        position: absolute;
                        top:3px;
                        left:-20px;
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
                margin-bottom: 10px;
                margin-top: 20px;
                color: #4A4A4A;
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
                    }
                    span{
                        font-size: 14px;
                        color:#1D86FF;
                        margin-left: 10px;
                    }
                }
                small{
                    margin-left: 10px;
                    color:#1D86FF;
                    cursor: pointer;
                }
            }
        }
        
    }
    /deep/ .el-dialog__header{
        text-align: left;
        border-bottom: 1px solid #DEDEDE;
    }
}

.proTeam{
    position: relative;
    width: 700px;
    text-align: left;
    .groupName{
        display: block;
        width: 590px;
        height: auto;
    }
    .proedBack{
        // width: 109px;
        padding: 0 5px;
        height: 31px;
        background: #FFE8E8;;
        font-size: 14px;
        color: #D0021B;
        display: block;
        line-height: 31px;
        border-radius: 5px;
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        .proStatus{
            background: url('https://web.moocollege.com/mooc/hzq/competition/user_center/晋级.gif');
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            width: 25px;
            height: 25px;
            display: inline-block;
            position: absolute;
            top: 3px;
        }
        .proStatus1{
            background: url('https://web.moocollege.com/mooc/hzq/competition/user_center/获奖.gif');
        }
        .proed{
            margin-left: 28px;
        }
    }
    .passPro{
        // width: 94px;
        padding: 0 5px;
        height: 30px;
        background: #E5E5E5;
        border-radius: 5px;
        font-size: 14px;
        color: #4A4A4A;
        display: inline-block;
        line-height: 30px;
        position: absolute;
        top: 2px;
        margin-left: 14px;
        text-align: center;
    }
}


</style>

