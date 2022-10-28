<template>
    <ul class="detailss">
        <li v-for="(item, index) in lists" :key="index">
            <img :src="item.head || 'https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png'">
            <div class="teamMember">
                <p>
                    <span>
                        {{item.name}}
                        <small style="color:red;margin-left:5px" v-if="item.complete==0">未完善个人信息</small>
                        <small style="color:red;margin-left:5px" v-if="!(item.sort || item.sort===0)">未排序</small>
                    </span>
                    <!-- 210705 要求不能切换身份，只能删除后重新添加 -->
                    <!-- <i v-if="authority.auditTeamInfo && edit && type!='2'">|</i>
                    <el-select
                        v-model="item.roleId"
                        v-if="authority.auditTeamInfo && edit && type!='2'"
                        :placeholder="$t('teamDetail.choose')" 
                        style="width:100px;" >
                        <el-option
                            v-for="role in roleList"
                            :key="role.value"
                            :label="$t(role.label)"
                            :value="role.value"
                            @click.native="changeMember(item,role.value)">
                        </el-option>
                    </el-select> -->
                </p>
                <p>{{item.college}}</p>
                <p>{{item.major}} <span v-if="item.major && item.academy">·</span> {{item.academy}}</p>
            </div>
            <div class="opMeber" v-if="isAdmin && edit && type!='1'">
                <span  @click="delMember(item)">
                    <i class="iconfont">&#xe62a;</i>
                    {{$t('teamDetail.del')}}
                </span>
                <span v-show="index!=0" @click="moveForwardMember(item,index,item.sort)">
                    <i class="iconfont">&#xe6ba;</i>
                    {{$t('teamDetail.up')}}
                </span>
                <span v-show="index!=lists.length-1" @click="bcackwardShiftMember(item,index,item.sort)">
                    <i class="iconfont">&#xe6b9;</i>
                    {{$t('teamDetail.down')}}
                </span>
            </div>
        </li>
        <slot></slot>
    </ul>
</template>

<script>
import { mapState } from 'vuex';
export default {
    props: [
        'lists',
        'isAdmin', 
        'edit',
        'changeMember',
        'delMember',
        'moveForwardMember',
        'bcackwardShiftMember',
        'type', // 1为队长 2为指导老师  3为团队成员
    ],
    data(){
        return{
            roleList:[
                {
                    label: 'teamDetail.roleList1',
                    value: 2
                },{
                    label: 'teamDetail.roleList2',
                    value: 3
                },{
                    label: 'teamDetail.roleList3',
                    value: 5
                }
            ],

        }
    },
    computed:mapState({
        authority: state=>state.authorityManagement
    }),
    methods:{
        // back(item,index,sort){
        //     this.$emit('bcackwardShiftMember',item,index,sort)
        // }
    }
}
</script>

<style lang='less' scoped>
.detailss{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
        width: 400px;
        padding: 20px 30px 25px 0;
        box-sizing: border-box;
        display: flex;
        >img{
            width: 80px;
            height: 80px;
            border-radius: 100%;
        }
        .teamMember{
            width: 200px;
            height: 100px;
            text-align: left;
            font-size: 14px;
            line-height: 26px;
            margin-left: 20px;
            p:nth-child(1){
                display: flex;
                align-items: center;
                font-size: 15px;
                i{
                    margin: 0 10px;
                }
                em{
                    font-style: normal;
                    font-size: 12px;
                    color: #89ACD5;
                }
                /deep/ .el-input__inner{
                    height: 26px;
                    line-height: 26px;
                    padding: 0 8px;
                }
                /deep/ .el-input__icon{
                    line-height: 26px;
                }
            }
        }
        .opMeber{
            span{
                padding-top: 3px;
                font-size: 14px;
                color: #4AA1F2;
                display: block;
                cursor: pointer;
                &:first-child{
                    color: #d5606f;
                }
                i{
                    margin-right:4px;
                }
            }
        }
        >span{
            display: flex;
            padding-top: 3px;
            font-size: 14px;
            color:#D5606F;
            img{
                width: 16px;
                height: 20px;
                margin-right: 6px;
            }
        }
    }
}
</style>