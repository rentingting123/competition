<template>
    <div class="voteset">

        <span class="title" @click="getpings">
            <i class="iconfont">&#xe655;</i>
            投票设置
        </span>

        <el-dialog
            title="投票设置"
            :append-to-body="true"
            :modal-append-to-body="false"
            :visible.sync="voteShow"
            :close-on-click-modal="false"
            width="800px"
            style="box-shadow: 0 4px 8px 0 rgba(0,0,0,0.50);border-radius: 10px;"
            >
            <div style="width:520px;margin:0 auto;padding-left:20px;text-align:left;">
                <el-form ref="form" :model="form"  label-width="120px">

                    <el-form-item label="投票角色: " prop="scope" :rules="{required: true, message: '请选择投票角色', trigger: 'change'}">
                        <el-checkbox-group v-model="form.scope">
                            <el-checkbox label="4" >领队</el-checkbox>
                            <el-checkbox label="1" >成员</el-checkbox>
                            <el-checkbox label="2" >指导老师</el-checkbox>
                            <el-checkbox label="3" >评审专家</el-checkbox>
                            <el-checkbox label="5" >普通人</el-checkbox>
                        </el-checkbox-group>
                        <!-- 1 成员 ，2 指导老师 3 评审专家 4 领队  5 普通人  -->
                    </el-form-item>

                    <el-form-item label="单作品次数: " prop="upperLimit" 
                            :rules="[{required: true, message: '请输入单作品次数', trigger: 'change'},
                                    { type: 'number', min: 1, message: '请输入数字', trigger: 'change'}]" >
                        <el-input v-model.number="form.upperLimit" size="small" style="width:53px;margin:0 11px;"></el-input>次 
                    </el-form-item>

                    <el-form-item label="总投票次数: " prop="allPoolLimit" 
                            :rules="[{required: true, message: '请输入总投票次数', trigger: 'change'},
                                    { type: 'number', min: 1, message: '请输入数字', trigger: 'change'}]" >
                        <el-input v-model.number="form.allPoolLimit" size="small" style="width:53px;margin:0 11px;"></el-input>次 
                    </el-form-item>

                    <el-form-item label="同校投票上限: " prop="schoolLimit" :rules="[{required: true, message: '请输入同校投票上限', trigger: 'change'},
                                                            {type: 'number', min: 1, message: '请输入数字', trigger: 'change'}]" >
                        <el-input v-model.number="form.schoolLimit" size="small" style="width:53px;margin:0 11px;"></el-input>次 
                        <el-checkbox-group v-model="form.schoolAvoid" style="display:inline-block;margin-left:20px">
                            <el-checkbox label="1" >同队规避</el-checkbox>
                            <!-- 0 否  1 是  同校规避 -->
                        </el-checkbox-group>
                    </el-form-item>

                    <el-form-item label="投票隐私: " prop="privacy" :rules="{required: true, message: '请选择投票隐私', trigger: 'change'}" >
                        <el-radio-group v-model="form.privacy">
                            <el-radio :label="0" >显示投票数量</el-radio>
                            <el-radio :label="1" >不显示投票数量</el-radio>
                            <!-- 0 显示  1 不显示   投票隐私 -->
                        </el-radio-group>
                    </el-form-item>

                    <!-- 20201013cn暂时不加 -->
                    <!-- <el-form-item label="作品下载: " prop="download" :rules="{required: true, message: '请选择作品下载', trigger: 'change'}">
                        <el-radio-group v-model="form.download" >
                            <el-radio :label="0" >
                                投票角色
                                <el-tooltip class="question" content="包括评审专家，选择了海选互评的参赛选手" placement="bottom">
                                    <i class="el-icon-question"></i>
                                </el-tooltip>
                            </el-radio>
                            <el-radio :label="1" >任何人</el-radio>
                            <el-radio :label="2" >不可下载</el-radio>
                        </el-radio-group>
                    </el-form-item> -->
                    <!-- 作品下载  0 投票角色 1 任何人 2 不可下载 -->

                </el-form>

                <div class="group_btn">
                    <el-button size="small" @click="voteShow=false">取消</el-button>
                    <el-button size="small" type="primary" @click="submitsetPS('form')">确定</el-button>
                </div> 
            </div>
        </el-dialog>

    </div>
</template>

<script>
import network from '@@/api/jxapi/index'
import util from '@/utils/util'
export default {
    props:{
        rowId:String,
        competitionId:Number
    },
    data(){
        return{
            voteShow: false,
            form:{
                scope: [],
                schoolAvoid: [],
                schoolLimit: 3,
                upperLimit: 10,
                allPoolLimit: 10,
            }
        }   
    },
    mounted(){
        // this.getpings()
    },
    methods:{
        async getpings(){
            const res = await network.getWorksVote({data:{competitionId:this.competitionId,rowId:this.rowId}});
            if(res=='error') return ;
            this.voteShow = true
            if(!res) return;
            res.scope = res.scope && res.scope.split(',') || []
            res.schoolAvoid = res.schoolAvoid && (res.schoolAvoid+'').split(',') || []
            this.form = res
        },
        // 提交设置
        async submitsetPS(formname) {
            this.$refs[formname].validate(async (valid)=>{
                if(!valid) return;
                if(this.form.allPoolLimit<this.form.upperLimit){
                    return this.$message.warning('单作品次数需要比总投票次数少')
                }
                if(this.form.allPoolLimit<this.form.schoolLimit){
                    return this.$message.warning('同校投票上限需要比总投票次数少')
                }
                let params = {
                    ...this.form,
                    scope: this.form.scope.join(','),
                    schoolAvoid: this.form.schoolAvoid.join(',') || 0
                }
                let save = await network.setWorksVote( {data: params} )
                if(save=='error') return;
                return this.voteShow=false
            })

        }
    },
}
</script>


<style lang="less" scoped>
.group_btn{
    text-align: right;
}
.voteset{
    display: inline-block;
    vertical-align: middle;
    margin-left: 305px;
    .title{
        cursor: pointer;
    }
}
</style>