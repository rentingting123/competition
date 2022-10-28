<template>
    <div>
        <li  class="addAdvisers" @click="add = true">
            <div class=""><i class="iconfont">&#xe61c;</i></div>
            <span>{{$t('teamDetail.add')}}</span>
        </li>

        <!--添加成员模态框-->
        <el-dialog
            :title="$t('teamDetail.addTeamNumber')"
            :visible.sync="add"
            :close-on-click-modal= false
            width="60%">
            <div class="oneApplyContent">
                <div class="nameDialog">
                    <div class="player">
                        <p>{{$t('teamDetail.name')}}</p>
                        <el-input v-model.trim="name" :placeholder="$t('teamDetail.enter')" style="width:100%;"></el-input>
                    </div>
                    <div class="player">
                        <p><span>*</span>{{$t('teamDetail.phone')}}</p>
                        <el-form :model="phoneData" ref="numberValidateForm">
                            <el-form-item 
                            prop="phone" 
                            :rules="[
                                { required: true, message: $t('teamDetail.phoneMess1')},
                            ]">
                                <el-input v-model.trim="phoneData.phone" :placeholder="$t('teamDetail.enter')" style="width:100%;"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
                <p>{{$t('teamDetail.identity')}}</p>
                <template >
                    <el-radio v-if='applyType == 2' v-model="captainRadio" label="5" style="margin-top:10px;margin-bottom:15px;">
                        {{$t('teamDetail.teamMember')}}
                    </el-radio>
                    <el-radio v-model="captainRadio" label="2" style="margin-top:10px;margin-bottom:15px;">
                        {{$t('teamDetail.teacher')}}
                    </el-radio>
                    <el-radio v-model="captainRadio" label="23" style="margin-top:10px;margin-bottom:15px;">
                        {{$t('teamDetail.componeyTeacher')}}
                    </el-radio>
                    
                    <!-- 暂时隐藏 -->
                    <!-- <el-radio v-if='applyType == 2' v-model="captainRadio" label="3" style="margin-top:10px;margin-bottom:15px;">
                        {{$t('teamDetail.teamLeader')}}
                    </el-radio> -->
                </template>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="add = false">{{$t('teamDetail.cancel')}}</el-button>
                <el-button type="primary" :loading='loading'  @click="addMember">{{$t('teamDetail.addMember')}}</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import jxapi from '@@/api/jxapi/index'
export default {
    props: ['applyType', 'groupId', 'close'],
    data(){
        return{
            add: false, // 添加成员模态框
            loading: false,
            name: "",
            phoneData: {
                phone: "",
            },
            captainRadio: "2", // 成员类型radio
            competitionId: '', //竞赛id
        }
    },
    created(){
        this.competitionId = this.$route.params.competitionId
    },
    methods:{
        addMember() {
            this.phoneData.phone = this.phoneData.phone.trim();
            if (this.phoneData.phone=='') {
                this.$message.error(this.$t('teamDetail.phoneMess'))
                return
            }
            this.name = this.name.trim();
            if (this.name=='') {
                this.$message.error(this.$t('teamDetail.nameMess'))
                return
            }
            
            
            this.$refs.numberValidateForm.validate(async (valid) => {
                if(!valid) return;

                let param = {
                    groupId: this.groupId,
                    competitionId: this.competitionId,
                    loginPhonenumber: this.phoneData.phone,
                    idcardName: this.name,
                    roleId: this.captainRadio
                }
                this.loading = true;
                let data = await jxapi.addMember({data:param})
                this.loading = false
                this.add = false
                this.phoneData.phone = ''
                this.name = ''
                if(data=='error') return;
                // this.$emit('saveEdits')
                this.close && this.close(data);
                
                
            })
        },
    }
}
</script>

<style lang='less' scoped>
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
        color: #4A4A4A;
    }
}
// 添加成员模态框
.oneApplyContent{
    width: 400px;
    margin:50px auto 80px;
    text-align: left;
    p{
        font-size: 14px;
        color: #4A4A4A;
        letter-spacing: 1px;
        line-height: 26px;
        position: relative;
        >span{
            position: absolute;
            left: -10px;
            top: 3px;
            color:red;
        }
    }
    .nameDialog{
        width: 400px;
        margin: 0px auto 20px;
        display: flex;
        justify-content: space-between;
        .player{
            width: 180px;
            position: relative;
            i{
                position: absolute;
                right: -25px;
                bottom:8px;
                cursor: pointer;
            }
            i:hover{
                color:red;
            }
        }
    }
}
</style>