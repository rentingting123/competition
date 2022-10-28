<template>
    <div class="table">
        <el-row class="tableTitle">
            <el-col :span="2">类型</el-col>
            <el-col :span="5">竞赛名称</el-col>
            <el-col :span="2" class="center">年份</el-col>
            <el-col :span="2" class="center">届数</el-col>
            <el-col :span="3" class="center">报名/作品/评审</el-col>
            <el-col :span="2" class="center">状态</el-col>
            <el-col :span="8">操作</el-col>
        </el-row>
        <div v-for="(list,index) in data" :key="list.id" class="tablemain">
            <el-row class="tableTitle">
                <el-col :span="2">
                    <div @click="editShow(index)" class="competitionName">
                        <i class="el-icon-caret-bottom" v-if="list.showChild" ></i>
                        <i class="el-icon-caret-right" v-else ></i>
                        <span>{{list.competitionRange && list.competitionRange.split(',')[0]}}</span>
                    </div>
                </el-col>
                <el-col :span="5">
                    <span class="operateButton" @click="detailOrCreate(list, list.id)">{{list.name}}</span>
                </el-col>
                <el-col :span="2" class="center">{{list.competitionYear}}</el-col>
                <el-col :span="2" class="center">
                    <span v-if="list.competitionRound">
                        第 {{list.competitionRound}} 届
                    </span>
                </el-col>
                <el-col :span="3" class="center">
                    <progresses :finish='list.isfinish==0' :signup='list.signUpStatus==1' :work='list.poolStatus==1' :expert='list.reviewStatus==1'/>
                </el-col>
                <el-col :span="2" class="center">
                    <div>
                        <!-- status 0 未发布 1 审核中  2 审核未通过  5 发布   审核中和发布 不能进行发布-->
                        <!-- 需要在列表中新增上级单位名称 2022.2.11 -->
                        <span v-if="list.isfinish==0" class="end">已结束</span>
                        <notice v-else :status='list.status' :opinion='list.opinion' :parentName="list.upGroupName"/>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="public">
                        <div class="flex">
                            <!-- 竞赛信息 -->
                            <span class="operateButton" :class="{'disabled': list.isSelf==2 || list.isfinish==0}" @click="toDetail(list.id, list.isSelf==2 || list.isfinish==0)">竞赛信息</span>
                            <!-- 报名设置 -->
                            <specialset :disabled='list.isSelf==2 || list.isfinish==0' :id='list.id' :close="getList"/> 
                            <!-- 日程设置 -->
                            <scheduleSet :disabled='list.isSelf==2 || list.isfinish==0' :id='list.id' :close="getList"/>
                            <!-- 隐私设置 -->
                            <privacySetting :disabled='list.isSelf==2' :id='list.id' :finish='list.isfinish==0' :close='getList' />
                            <!-- 发布动态 -->
                            <span class="operateButton" :class="{'disabled': list.isSelf==2}" @click="toIssue(list.id, list.isSelf==2)">发布动态</span>
                        </div>
                        <!-- 20201126 省厅试用，要求修改 -->
                        <!-- 发布竞赛 -->
                        <announce v-if="list.status==0" :competitionId='list.id' :close='getList' :disabled='list.isSelf==2' />
                    </div>
                </el-col>
            </el-row>
            <div class="childrenmain" v-if="list.showChild">
                <div>
                    <el-row class="tableTitle" v-for="item in list.childCompetitions" :key="item.id" >
                        <el-col :span="2" style="opacity: 0.5;">
                            <div class="competitionName"><i>&nbsp;</i> 赛项</div>
                        </el-col>
                        <el-col :span="5">
                            <span class="operateButton" @click="detailOrCreate(list,item.id)">{{item.name}}</span>
                        </el-col>
                        <el-col :span="2" class="center">{{item.competitionYear}}</el-col>
                        <el-col :span="2" class="center">
                            <span v-if="item.competitionRound">
                                第 {{item.competitionRound}} 届
                            </span>
                        </el-col>
                        <el-col :span="3" class="center">
                            <progresses :finish='item.isfinish==0' :signup='item.signUpStatus==1' :work='item.poolStatus==1' :expert='item.reviewStatus==1'/>
                        </el-col>
                        <el-col :span="2" class="center">
                            <div>
                                <!-- status 0 未发布 1 审核中  2 审核未通过  5 发布   审核中和发布 不能进行发布-->
                                <span v-if="item.isfinish==0" class="end">已结束</span>
                                <notice v-else :status='item.status' :opinion='item.opinion'/>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <div class="public">
                                <div class="flex">
                                    <!-- 竞赛信息 -->
                                    <span class="operateButton" :class="{'disabled': list.isSelf==2 || item.isfinish==0}" @click="toDetail(item.id, list.isSelf==2 || item.isfinish==0)">竞赛信息</span>
                                    <!-- 报名设置 -->
                                    <specialset :disabled='list.isSelf==2 || item.isfinish==0' :id='item.id' :close="getList"/> 
                                    <!-- 日程设置 -->
                                    <scheduleSet :disabled='list.isSelf==2 || item.isfinish==0' :id='item.id' :close="getList"/>
                                    <!-- 隐私设置 -->
                                    <privacySetting :disabled='list.isSelf==2' :id='item.id' :close='getList' />
                                    <!-- 发布动态 -->
                                    <span class="operateButton" :class="{'disabled': list.isSelf==2}" @click="toIssue(item.id, list.isSelf==2)">发布动态</span>
                                </div>
                                <!-- 发布竞赛 -->
                                <announce v-if="item.status==0" :competitionId='item.id' :close='getList' :disabled='list.isSelf==2' />
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="point" v-if="list.isSelf==1 && list.isfinish!=0">
                    <el-col :span='2'>&nbsp;</el-col>
                    <point :id='list.id' :close='getList'/>
                </div>
            </div>
        </div>
        <div class="notablemain" v-if="data && data.length<1">
            暂无竞赛
        </div>
    </div>
</template>

<script>
import progresses from '../progress'
import announce from '../public'
import notice from '../public/notice'
import specialset from '../specialset'
import privacySetting from '../privacySetting'
import scheduleSet from '../scheduleSet'
import point from '../point'
export default {
    props: ['data'],
    components:{
        progresses,
        announce,
        notice,
        specialset,
        privacySetting,
        scheduleSet,
        point,
    },
    methods:{
        editShow(i){
            this.$set(this.data[i], 'showChild', !this.data[i].showChild)
        },
        detailOrCreate(item, id){
            if(item.isSelf==1){
                this.$router.push({path: '/createNewCompetition', query: {id: id}});
            }else{
                this.$router.push({path: '/details', query: {id: id}});
            }
        },
        toDetail(id, flag){
            if(flag) return;
            this.$router.push({path: '/createNewCompetition', query: {id: id}});
        },
        getList(val){
            this.$parent.getList(val);
        },
        toIssue(id, flag){
            if(flag) return;
            this.$router.push({path:'/issue', query:{cid: id}})
        }

    },
    watch:{
        data(val){
            // 第一个展开，当没有赛项时不展开
            for(let i in val){
                this.$set(val[i],'showChild', false)
                if(i==0 && val[i].childCompetitions.length>0){
                    this.$set(val[i],'showChild', true)
                }
            }
        }
    }
}
</script>

<style lang='less' scoped>
.table{
    width: 100%;
    margin-bottom: 50px;
    border: 1px solid #D4D5D6;
    .el-col{
        padding: 10px 7px;
        text-align: left;
        line-height: 20px;
    }
    .tableTitle{
        width: 100%;
        line-height: 40px;
        font-size: 14px;
        font-weight: bold;
        color: #4a4a4a;
        background: #F0F2F4;
        box-shadow: 0px -1px 0px 0px rgba(185, 185, 185, 0.5);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background: #F0F2F4;
    }
    .notablemain{
        line-height: 80px;
        border-top: 1px solid #d4d5d6;
    }
    .tablemain{
        width: 100%;
        .tableTitle{
            background: #ffffff;
            font-weight: normal;
        }
        .childrenmain{
            background: #F6F8FC;
            .tableTitle{
                font-weight: normal;
                background: #F6F8FC;
                box-shadow: none;
            }
            
        }
    }
    .operateButton{
        font-size: 14px;
        font-weight: 500;
        color: #0078E2;
        line-height: 20px;
        margin-right: 5px;
        cursor: pointer;
        &.disabled{
            color: #D6D6D6;
            cursor: no-drop;
        }
    }
    .center{
        text-align: center;
    }
    .flex{
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }
    .public{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .point{
        text-align: left;
        padding: 5px 0 5px 0;
        color: #D6D6D6;
        overflow: hidden;
    }
    .competitionName{
        cursor: pointer;
        i{
            display: inline-block;
            vertical-align: middle;
            width: 20px;
            text-align: left;
        }
    }
}
</style>