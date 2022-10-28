<template>
    <!-- 使用 -->
    <!-- <privacySetting :id='compety.competitionId' :disabled='true'/> -->
    <div class="setting">
        <span @click="showEdit" class="title" :class="{'disable': disabled}">隐私设置</span>

        <el-dialog title="隐私设置" :modal-append-to-body="false" :append-to-body='true'
            :close-on-click-modal= false :visible.sync="show" >
            <el-form ref="form" :model="form" label-position="left" label-width="140px" class="form">
                <el-form-item label="竞赛隐私设置: ">
                    <el-switch 
                        v-model="form.competitionPrivateLevel"
                        :active-value="2"
                        :inactive-value="1"
                        active-text="公开"
                    ></el-switch>
                </el-form-item>
                <el-form-item label="作品公示: ">
                    <el-switch 
                        v-model="form.poolPromoted" 
                        active-text="公开"
                        :active-value="1"
                        :inactive-value="0"
                    ></el-switch>
                </el-form-item>
            </el-form>
            <!-- 竞赛特殊设置，改版时隐藏20201028 -->
            <!-- <el-form ref="form1" :model="form1" label-position="left" label-width="140px" class="form">
                <el-form-item label="当前报名状态：">
                    <el-tooltip slot="label">
                        <div slot="content">
                        在竞赛进入下一个
                        <br>日程时会自动更新为日程设置内容
                        </div>
                        <p>当前报名状态<i class="el-icon-warning"></i>：</p>
                    </el-tooltip>
                    <el-checkbox-group v-model="form1.type">
                        <el-checkbox label="1" name="type">开放报名</el-checkbox>
                        <el-checkbox label="2" name="type">可修改</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="当前作品状态：">
                    <el-tooltip slot="label">
                        <div slot="content">
                        在竞赛进入下一个
                        <br>日程时会自动更新为日程设置内容
                        </div>
                        <p>当前作品状态<i class="el-icon-warning"></i>：</p>
                    </el-tooltip>
                    <el-checkbox-group v-model="form1.type">
                        <el-checkbox label="3" name="type">开放上传</el-checkbox>
                        <el-checkbox label="4" name="type">可修改</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form> -->
            <div slot="footer" class="dialogFooter">
                <!-- v-if="authority.delCompetitionInfo" -->
                <el-button type="danger" size="small" :disabled="finish"  @click="delCompetition">删除竞赛</el-button>
                <div>
                    <el-button size="small" @click="show=false">取消</el-button>
                    <el-button type="primary" @click="onSubmit" size="small">确定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import network from '@/api/jxapi'
export default {
    props:['disabled', 'id', 'close', 'finish'],
    data(){
        return{
            show: false,
            form: {
                poolPromoted: 0,
                competitionPrivateLevel: 1
            },
            form1:{
                type: []
            }
        }
    },
    methods:{
        async init(){
            let res = await network.getCompetitionDetail({ id: this.id });
            if (res == "error") return;
            this.form.poolPromoted = res && res.poolPromoted || 0;
            this.form.competitionPrivateLevel = res && res.competitionPrivateLevel || 1;
        },
        showEdit(){
            if(this.disabled) return;
            if(!this.id) return this.close && this.close();
            this.init()
            this.show = true
        },
        delCompetition() {
            if(!this.id) return this.$message.warning("未找到需要删除的竞赛");
            this.$confirm('删除该竞赛后不可恢复，确定要删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await network.deleteCompetition({competitionId:this.id});
                if(res=='error') return;
                this.show = false
                this.$message.info('删除成功');
                this.close && this.close('del');
            }).catch(() => {
                this.$message.info('已取消删除');
            });
        },
        async onSubmit() {
            const res = await network.updateCompetitionPrivate({ data: {
                id: this.id,
                ...this.form
            } });
            if(res=='error') return;
            this.show = false
            this.$message.success('操作成功');
        }
    }
}
</script>

<style lang='less' scoped>
.setting{
    display: inline-block;
    vertical-align: middle;
    text-align: left;
    .title{
        font-size: 14px;
        font-weight: 500;
        color: #0078E2;
        line-height: 20px;
        margin-right: 5px;
        cursor: pointer;
        &.disable{
            color: #D6D6D6;
            cursor: no-drop;
        }
    }
}
.form{
    width: 450px;
    margin: 0 auto;
}
.dialogFooter{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #dedede;
    padding-top: 10px;
}
</style>