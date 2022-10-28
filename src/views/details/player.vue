<template>
<!--选手-->
    <div id="player">
        <div class="search">
            <h1>{{tabsName}}</h1>
            <el-input
                :placeholder="$t('player.search')"
                prefix-icon="el-icon-search"
                style="width:200px;margin-right:25px;" v-model="q" @keyup.enter.native="search">
            </el-input>
            <!-- <el-input style="width: 200px; margin-right: 20px;" v-if="!isLastChild" v-model="lastName" disabled/> -->
            <subCompetitionName 
               type="2"
                :onChange="searchChange"
                :id="id"
                :value="competitionId"
            />
            <div class="allDown" v-if="isAdmin">
                <i class="iconfont iconfont-down">&#xe610;</i>
                <span>{{$t('player.download')}}</span>
            </div>
            <!-- <div v-if="authority.group_add" class="oneApply" @click="onApply">
                <i class="iconfont iconfont-down">&#xe65d;</i>
                <span>个人赛报名</span>
            </div> -->
        </div>
        <ul>
            <li v-for="(item, index) in playerList"
                :key="index"
                @mouseenter.stop="showDown(index)"
                @mouseleave="hideDown(index)"
                @click="toDeatails(item.userId)">
                <img :src="item.userPic" v-if="item.userPic">
                <img src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png" v-else/>
                
                <!-- <el-tooltip popper-class="down-tip" :disabled="item.isDownloadDoc" placement="right" effect="light">
                    <div slot="content" :style="{color: '#409EFF', cursor: 'pointer'}" @click="onDown(item.userId)">
                        <i class="iconfont iconfont-down">&#xe610;</i> 下载认证表
                    </div> -->
                    <div class="playerName">
                        <p>{{item.userName}} &nbsp;</p>
                    </div>
                    <!-- <span>{{item.school}}</span> -->
                <!-- </el-tooltip> -->
            </li>
        </ul>
        <el-pagination hide-on-single-page background class="cha-page" layout="prev, pager, next" @current-change="handleCurrentChange" :current-page.sync="pageNum" :page-size="pageSize" :total="total"></el-pagination>
        
        <el-dialog :title="$t('player.signup')" :visible="oneApply" :before-close="closeSingle" width="50rem">
            <single :getPlayer="getPlayer"/>
        </el-dialog>
    </div>
</template>


<script>
import { mapMutations,mapState } from 'vuex'
import jxapi from '@@/api/jxapi'
import single from './signup/single.vue'
import {getGroupId,getUserInfo,getTabsName} from '@@/utils/commons'
import subCompetitionName from '@@/components/subcompetition/index'
    export default {
        components:{subCompetitionName,single},
        props: ['tabs'],
        data(){
            return {
                signing:false,
                playerList: [
                    
                ], // 选手列表
                flg: 0,
                ThemeOptions: [], //竞赛主题下拉框
                competitionId: '', //竞赛主题值
                //oneApply: !!this.$route.query.open, // 个人赛报名弹框
                PointsOptions: [], // 赛项下拉框
                isAdmin: false,
                pageSize: 28, //一页条数
                pageNum:1,//当前页数
                total:0,
                isGroupAdmin: false,
                q: '',
                user: {
                    idcardName: "",
                    loginPhonenumber: "",
                    id: null
                },
                tabsName: '',
            }
        },
        methods: {
            ...mapMutations('competitionApply',['openSingle','closeSingle']),
            searchChange(v){
                this.competitionId = v;
                this.search();
            },
            handleCurrentChange(){
                this.getPlayer()
            },
            async getPlayer(q){
                const obj = {
                    competitionId: this.competitionId || parseInt(localStorage.getItem('competitionId')),
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                };
                if(q && q != ''){
                    obj.search = q
                }
                const groupId = getGroupId();
                if (groupId) {
                    obj.selfGroupId = groupId; 
                }
                    
                //:todo 下载报名表权限统一控制
                const baseInfo = JSON.parse(localStorage.getItem('baseInfo'))
                const isSetting = baseInfo && baseInfo.extraSetting && baseInfo.extraSetting.docSetting && baseInfo.extraSetting.docSetting.isDone
                this.playerList = []
                let members = await jxapi.getSingleMember({data:obj})
                if(members == 'error' || !members) return 
            
                this.total = members.total
                this.pageNum = members.pageNum
                this.playerList =  members.pageData.map(d => {
                    const isSelf = this.user.id === d.id
                    return {
                        ...d,
                        isDownloadDoc: baseInfo.applyType == 1&&((this.isGroupAdmin || this.isAdmin || isSelf) && isSetting)
                    }
                })
                 
            },
            /**
             * hover显示下载认证表
             * @param idx 下标
             **/
            showDown(idx){
                this.playerList[idx].flg = true;
            },
            /**
             * 鼠标移除隐藏下载认证表
             * @param idx 下标
             **/
            hideDown(idx){
                this.playerList[idx].flg = false;
            },
            /**
             * 下载认证表
             * @param idx 下标
             **/
            async onDown(userId){
                const competitionId = localStorage.getItem('competitionId')
                const params = { userId, competitionId }
                let result = await jxapi.downloadUserApplyFile({
                    data:params,
                    config: { 
                        responseType: 'arraybuffer'
                    }
                });
                if(result=='error') return;
            },
            /**
             * 点击选手跳转到选手详情界面
             **/
            async toDeatails(userId){
                if(!this.competitionId){
                    this.$message.info(this.$t('player.chooseEvent'))
                    return
                }
                const competitionId = this.competitionId
                const params = { userId, competitionId }
                let tem = await jxapi.getGroupTeamId({data:params})
                if(tem){
                    this.$router.push({path:`/competition/team/${tem}/${ competitionId }`,query:{page:1}});
                }
                
            },
            skip(playerId) {
                // this.$router.push(`/competition/player/${playerId}`)
            },
            search(){
                this.playerList=[]
                this.getPlayer(this.q);
            },
            onApply(){
                if(getGroupId()!='-1'){
                    this.openSingle()
                }else{
                    this.$alert(this.$t('player.improve'), this.$t('player.Lack'), {
                    confirmButtonText: this.$t('player.perfect'),
                    callback: action => {
                    if(action=='confirm')
                    this.$router.push("/profile?msg_edit_show=true");
                }});
                }
            },
           
           async getList(){
                   let id = localStorage.getItem('competitionId')
                    if(!id) return this.$message.error(this.$t('player.idLost'));
                    let params = {
                        competitionId: id
                    }
                    if(this.$route.query.label){
                        params.label = this.$route.query.label
                    }
                    let data = await jxapi.getSignupCompetition({data:params})
                    if (data == 'error') return this.$message.error('获取个人列表');
                    let arr = []
                    for(let i=0; i<data.length; i++) {
                      arr.push({
                        label: data[i].competitionInfo.name,
                        value: data[i].competitionId
                        })
                     }
                this.PointsOptions = arr;
            }   
        },

        created() {
            this.tabsName = getTabsName(this.tabs, 3) || '选手'
             let user = getUserInfo();
             this.user = user
            this.getPlayer()
        },
        computed:  {
            ...mapState({
                oneApply: state => state.competitionApply.openSingle,
                authority: state => state.authorityManagement,
            }),
            id(){
                return parseInt(localStorage.getItem('competitionId'))
            },    
            // isLastChild(){
            //     // console.log(!!JSON.parse(localStorage.getItem('baseInfo')).childCompetitionsId)
            //     return !!JSON.parse(localStorage.getItem('baseInfo')).childCompetitionsId
            // },
            // lastName(){
            //    return JSON.parse(localStorage.getItem('baseInfo')).name
            // }
        },
    }
</script>


<style lang="less" scoped>
#player{
    width: 1040px;
    margin: auto;
    background-color: #fff;
    padding: 40px 55px;
    text-align: start;
    overflow: hidden;
    box-sizing: border-box;
    .cha-page{
        text-align: center;
    }
    .search{
        display: flex;
        align-items: center;
        >h1{
            font-size: 30px;
            border-left: 4px solid #1D86FF;
            padding-left: 16px;
            font-weight: 500;
            margin-right: 40px;
        }
        .allDown,.oneApply{
            cursor: pointer;
            margin-left: 16px;
            span{
                font-size: 14px;
                color:#4199FF;
            }
        }
        .allDown{
            visibility: hidden;
            margin-left: 68px;
            margin-right: 32px;
        }
    }
    ul{
        width: 100%;
        padding: 20px;
        overflow: hidden;
        li{
            width: 224px;
            height: 64px;
            display: flex;
            align-items: center;
            float: left;
            font-size: 14px;
            cursor: pointer;
            img{
                width: 40px;
                height: 40px;
                border-radius: 100%;
                margin-right: 10px;
                margin-left: 16px;
            }
            .playerName{
                display: flex;
                p{
                    margin-right: 10px;
                }
                span{
                    color:#4199FF;
                }
                // .oneDown{
                //     display: none;
                // }
            }
            span,i{
                font-size: 12px;
            }
        }
    }
    /deep/ .el-dialog__footer{
        border-top: 1px solid #DEDEDE;
    }
}
</style>