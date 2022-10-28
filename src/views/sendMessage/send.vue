<template>
    <div class="sendMes">
        <div class="header" @click="$router.back()">
            返回
        </div>
        <div class="main">
            <div class="top">
                <el-checkbox v-model="allChecked">全选</el-checkbox>
                <el-select v-model="value" @change="chooseValue" placeholder="请选择用途">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" :disabled="!authority.sendMail" class="submit" @click="submit(0)">发送邮件</el-button>
                <el-button type="primary" :disabled="!authority.sendShortMessage" @click="submit(1)">发送短信</el-button>
            </div>
            <div class="detail" :class="{'show':show}">
                <p v-if="show" @click="show=!show" >展开 <i class="el-icon-caret-right"></i></p>
                <p v-else @click="show=!show">收起 <i class="el-icon-caret-bottom"></i></p>
                <div class="detailMain" :class="{'hidden':show}">
                    <el-input class="searchName" placeholder="请输入团队名称或姓名" prefix-icon="el-icon-search" v-model="searchName">  </el-input>
                    <div class="minDetail">
                        <span>赛项</span>
                        <el-select v-model="cid">
                            <el-option
                            v-for="item in competitionChild"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="minDetail">
                        <span>报名表</span>
                        <el-select v-model="signupValue">
                            <el-option
                            v-for="item in signup"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="minDetail">
                        <span>缴费</span>
                        <el-select v-model="payValue">
                            <el-option
                            v-for="item in pay"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="minDetail">
                        <span>作品</span>
                        <el-select v-model="workValue">
                            <el-option
                            v-for="item in work"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="minDetail">
                        <span>身份</span>
                        <el-select v-model="indetityValue">
                            <el-option
                            v-for="item in indetity"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="countData">
                        <el-button type="primary" @click="countData" :loading="loading">搜索</el-button>
                        <el-button @click="resetData">重置</el-button>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>

            <div class="notice">
                <i class="el-icon-info"></i>累积已发送短信<span>{{content.messageNum||0}}</span>条，已发送邮箱信息<span>{{content.emailNum||0}}</span>条
            </div>

            <el-table :data="tableData" border style="width: 100%"  @selection-change="handleSelectionChange" v-loading="loading">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="团队名" width="200" prop="groupName"></el-table-column>
                <el-table-column label="姓名" width="85" prop="userName"> </el-table-column>
                <el-table-column label="身份" width="85" prop="roleName">
                    <template slot-scope="scope">
                        <p v-if="scope.row.roleName==2">
                            指导老师 
                        </p>
                        <p v-else-if="scope.row.roleName==3">
                            队长
                        </p>
                        <p v-else-if="scope.row.roleName==5">
                            学生
                        </p>
                    </template>
                </el-table-column>
                <el-table-column label="学校" width="200" prop="schoolName"> </el-table-column>
                <el-table-column label="手机号" width="140" prop="contactPhone"> </el-table-column>
                <el-table-column label="邮箱" width="170" prop="email"> </el-table-column>
                <el-table-column label="赛项" width="170" prop="matchItem"> </el-table-column>
                <el-table-column label="作品是否上传" width="170" prop="resourceName">
                    <template slot-scope="scope">
                        <p v-if="scope.row.resourceName">
                            {{scope.row.resourceName}}
                        </p>
                        <p v-else>
                            未提交 
                        </p>
                    </template>    
                </el-table-column>
                <el-table-column label="是否付款" width="85" prop="payStatus">
                     <template slot-scope="scope">
                        <p v-if="!scope.row.payStatus">
                            未付款
                        </p>
                        <p v-else>
                            {{scope.row.payStatus}}
                        </p>
                    </template>  
                </el-table-column>
                <el-table-column label="报名材料是否提交" width="170" prop="poolStatus">
                    <template slot-scope="scope">
                        <p v-if="scope.row.poolStatus==0">
                            未提交
                        </p>
                        <p v-else>
                            已提交
                        </p>
                    </template>  
                </el-table-column>
            </el-table>

            <el-pagination background 
                class="page"
                layout="prev, pager, next" 
                :total="totalPage" 
                :page-size="pageSize" 
                :current-page.sync="pageNum"
                @current-change="handleCurrentChange">
            </el-pagination>

        </div>
        
    </div>
</template>

<script>
import network from "@@/api/jxapi/index"
import { mapMutations,mapState,mapActions } from 'vuex'
export default {
    data(){
        return{
            allChecked:false,
            value:'',
            options: [
                {
                    value: '0',
                    label: '完善资料',
                    name:'欢迎使用摩课云竞赛服务平台，为保障您后续竞赛流程不受影响，请尽快登录 https://cc.moocollege.com完善个人资料，我们将对您个人隐私进行保护；'
                }, 
                {
                    value: '1',
                    label: '提交报名表',
                    name:'欢迎使用摩课云竞赛服务平台，您参加的 XX竞赛尚未提交报名材料，请尽快登录 https://cc.moocollege.com 进行提交，保障后续竞赛流程的顺利进行，谢谢配合；'
                }, 
                {
                    value: '2',
                    label: '提交作品',
                    name:'欢迎使用摩课云竞赛服务平台，您参加的 XX竞赛尚未提交竞赛作品，请尽快登录 https://cc.moocollege.com 进行提交，保障后续竞赛流程的顺利进行，谢谢配合；'
                }, 
                {
                    value: '3',
                    label: '竞赛缴费',
                    name:'欢迎使用摩课云竞赛服务平台，您参加的 XX竞赛尚未缴纳竞赛费用，请尽快登录 https://cc.moocollege.com 进行缴纳，保障后续竞赛流程的顺利进行，谢谢配合；'
                }
            ],
            confirmValue:'',
            searchName:'',
            signup:[
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: '0',
                    label: '报名材料未提交'
                },
                {
                    value: '1',
                    label: '报名材料已提交'
                },
            ],
            signupValue:'',
            pay:[
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: '0',
                    label: '作品未付款'
                },
                {
                    value: '1',
                    label: '作品已付款'
                },
            ],
            payValue:'',
            work:[
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: '0',
                    label: '未提交作品'
                },
                {
                    value: '1',
                    label: '已提交作品'
                },
            ],
            workValue:'',
            indetity:[
                {
                    value: '',
                    label: '全部'
                },
                {
                    value: '2',
                    label: '指导老师'
                },
                {
                    value: '3',
                    label: '队长'
                },
                {
                    value: '5',
                    label: '学生'
                },
            ],
            indetityValue:'',
            competitionChild:[],
            cid:'',
            show:false,
            tableData:[  ],
            id:'',
            user:{},  
            chooseTable:[], // 选择的发送短信对象
            content:{}, // 已发送短信数和邮件数
            pageNum:1,
            pageSize:10,
            totalPage:0,
            loading:false
        }
    },
    created(){
        // 2020-6-9  数据通过路由传过来的id获取，不从缓存中获取
        this.id = this.$route.query.id;
        if(!this.id) return this.$router.back(-1);
        this.getCompetitionChild();
        this.getCountSmsByUser();
        this.$store.dispatch('AuthoritySetSend')
    },
    mounted(){
    },
    computed:{
        ...mapState({
        authority:state => state.authorityManagement,
        })
    },
    methods:{
        handleCurrentChange(){
            this.countData();
        },
        async getCountSmsByUser(){
            let result = await network.getCountSmsByUser();
            if(result=='error') return;
            this.content = result
        },
        async getCompetitionChild(){
            let child = await network.getChild({competitionId:this.id});
            if(child=='error') return;
            if(child.length<1){
                this.competitionChild = []
                let res = await network.getCompetitionDetail({id: this.id})
                if(res=='error') return
                this.user = res
                this.competitionChild.push(this.user)
            }else{
                this.competitionChild = []
                this.competitionChild = child
            }
        },
        async countData(){
            this.loading = true;
            let params = {
                competitionId: this.cid?this.cid:this.id,
                search:this.searchName,
                poolStatus: this.signupValue,
                payStatus:this.payValue,
                resourceStatus:this.workValue,
                roleType:this.indetityValue,
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            }
            this.tableData = []
            let lists = await network.querySendTarget({data:params});
            this.loading = false;
            if(lists=='error') return;
            this.tableData = lists.list;
            this.totalPage = lists.total
        },
        resetData(){
            this.signupValue = "";
            this.payValue = "";
            this.workValue = "";
            this.indetityValue = "";
            this.searchName = "";
            this.cid = "";
        },
        chooseValue(val){
            let mess = this.options[val].name
            let competition = this.user.name
            this.confirmValue = "确定发送消息至选中用户？消息内容如下:" + mess.replace(" XX竞赛", competition);
        },
        submit(type){
            if(!this.value) return this.$message.warning("请选择用途");
            let arr = []
            if(!this.allChecked){
                if(this.chooseTable.length<1)  return this.$message("请选择要发送的对象");
                for(let i  in this.chooseTable){
                    arr.push(this.chooseTable[i].userId)
                }
            }
            this.$confirm(this.confirmValue, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                // 备注：全选时通过competitionId后台查询，非全选时通过userIds
                let params = {
                    userIds:arr,
                    competitionId:this.id,
                    model:this.value, // 0 完善资料  1 提交报名表 2 作品提交 3 竞赛缴费
                    type:type, // 0 邮箱 1 短信
                    userId:'' //用户Id 貌似没有什么作用
                }
                let res = await network.sendEmailMessage({data:params});
                if(res=='error') return;
                this.getCountSmsByUser();
                
            }).catch(() => {    
                    
            });
        },
        handleSelectionChange(val){
            this.chooseTable = val
        }
    }
}
</script>


<style lang="less" scoped>
.sendMes{
    padding: 0 30px;
    width: 1200px;
    margin: 0 auto;
    text-align: left;
    .header{
        font-size: 14px;
        color: #4A4A4A;
        line-height: 40px;
        cursor: pointer;
    }
    .main{
        background: #ffffff;
        min-height: calc(100vh - 5rem - 266px - 70px);
        padding:15px 30px;
        .top{
            margin-bottom: 20px;
            .submit{
                margin-left: 20px;
            }
        }
        .detail{
            position: relative;
            
            >p{
                width: 78px;
                height: 40px;
                line-height: 40px;
                background: #F5F7FA;
                position: absolute;
                top: -40px;
                right: 0;
                text-align: center;
                border-radius: 4px 4px 0 0;
                cursor: pointer;
            }
            
            .detailMain{
                border-radius: 4px 0 4px 4px;
                background: #F5F7FA;
                padding: 20px 20px 0;
                .minDetail{
                    display: inline-block;
                    margin-right: 27px;
                    margin-bottom: 20px;
                    float: left;
                }
            }

            .detailMain.hidden{
                display: none;
            }
        }
        .detail.show{
            margin-bottom: 40px;
        }
        .notice{
            background: rgba(65,153,255,0.10);
            border: 1px solid #4199FF;
            border-radius: 5px;
            margin: 20px 0;
            line-height: 36px;
            font-size: 14px;
            color: #000033;
            i{
                color: #1890FF;
                margin: 0 10px;
            }
            span{
                color: #1890FF;
            }
        }
        .countData{
            float: right;
        }
        .clear{
            clear: both;
        }
        .page{
            text-align: center;
            margin: 20px auto;
        }
    }
}
</style>

<style lang="less">
.searchName.el-input{
    width: 234px;
    margin-right: 27px;
    margin-bottom: 20px;
    float: left;
}
.sendMes .top .el-checkbox{
    margin-right: 15px;
}
</style>
