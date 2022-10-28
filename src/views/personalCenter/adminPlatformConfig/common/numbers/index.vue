<template>
    <div>
        <h3 style="margin: 20px 0">
            设置显示数量
            <el-button type="primary" size="mini" @click="getObj">查询实际数量</el-button>
        </h3>
        
        <el-form label-position="right" label-width="120px" :model="numbers">
            <el-form-item label="参与高校数">
                <el-input style="width:250px" v-model="numbers.school"></el-input>
                <span>实际数量: {{obj.school || 0}}</span>
            </el-form-item>
            <el-form-item label="举办竞赛数">
                <el-input style="width:250px" v-model="numbers.competition"></el-input>
                <span>实际数量: {{obj.competition || 0}}</span>
            </el-form-item>
            <el-form-item label="参赛人数">
                <el-input style="width:250px" v-model="numbers.person"></el-input>
                <span>实际数量: {{obj.person || 0}}</span>
            </el-form-item>
            <el-form-item label="提交作品数">
                <el-input style="width:250px" v-model="numbers.works"></el-input>
                <span>实际数量: {{obj.works || 0}}</span>
            </el-form-item>
            <el-form-item label="参赛队伍数">
                <el-input style="width:250px" v-model="numbers.teams"></el-input>
                <span>实际数量: {{obj.teams || 0}}</span>
            </el-form-item>
        </el-form>
        

        <div>
            <el-button type="primary" @click="save" class="submit">保存</el-button>
        </div>

    </div>
</template>

<script>
import network from "@/api/jxapi/index";
import { getGroupId } from '@@/utils/commons'
export default {
    data(){
        return{
            numbers: {
                school: '',
                competition: '',
                person: '',
                works: '',
                teams: ''
            },
            obj: {},
        }
    },
    created(){
        this.init()
    },
    methods:{
        async init(){
            this.groupId = getGroupId();
            if (!this.groupId) return;
            const data = await network.getPageSetting({ groupId: this.groupId });
            if (data == "error") return;
            let arr = {
                school: '',
                competition: '',
                person: '',
                works: '',
                teams: ''
            }
            this.numbers = data && data.numbers || arr
        },
        async getObj(){
            // todo 获取实际数量 暂未开发
            // let res = await network.getObj();
            // if(res=='error') return this.obj = {};
            // this.obj = res || {}
        },
        async save(){
            let param = {
                objectId : this.groupId,
                numbers: this.numbers,
            }
            const list = await network.savePageSetting({ data: param });
            if (list == "error") return;
            this.$message.success('保存成功')
        },
        
    }
}
</script>

<style lang='less' scoped>
.submit{
    display: block;
    margin: 0 auto;
    margin-top: 20px;
}
</style>