<template>
    <el-row>
        <el-col :xs="2" :sm="2" :md="6" :lg="6" :xl="6">&nbsp;</el-col>
        <el-col :xs="20" :sm="20" :md="12" :lg="12" :xl="12">
            <div class="collection">
                <h1>{{name}}</h1>
                <el-form label-position="top" :model="form" ref="form">
                    <el-form-item v-for="(list,index) in html" :key="list.key" :prop="index+'@'+list.key"
                     :label="list.name"
                        :rules="[{ required: list.require, message: '请输入'+list.name}]"
                    >
                        <el-input size="large" v-model="form[index+'@'+list.key]"></el-input>
                    </el-form-item>
                </el-form>
                <div class="button">
                    <el-button v-if="enable==1" type="primary" @click="submit('form')">确 认</el-button>
                    <el-button v-else disabled type="primary" >未开放</el-button>
                </div>
            </div>
        </el-col>
        <el-col :xs="2" :sm="2" :md="6" :lg="6" :xl="6">&nbsp;</el-col>
    </el-row>
</template>


<script>
import network from '@@/api/jxapi'
import { mapState } from 'vuex'
export default {
    data(){
        return{
            userId: '',
            id:'',
            name:'',
            html: '',
            form:{},
            enable:1,
        }
    },
    computed:{
        ...mapState({
            authority:state => state.authorityManagement,
        })
    },
    created(){
        // 问卷调查无需加入权限判断
        // if(!this.authority.manageQuestionnaire){
        //     this.$message.error('无权限访问该页面')
        //     location.href = location.origin
        // }
    },
    mounted(){
        document.getElementById('app').style.minWidth = '1px'
        this.userId = this.$route.params.userId
        this.id = this.$route.params.id
        this.init()
    },
    methods:{
        async init(){
            let res = await network.getForrankGet({data:{
                userId: this.userId,
                formId: this.id
            }});
            if(res=='error') return
            this.name = res.name
            this.html = res.html
            this.enable = res.enable
        },
        submit(formName){
            this.$refs[formName].validate(async (valid) => {
                if(!valid) return;
                let arr = []
                Object.keys(this.form).forEach((key)=>{
                    let keys = key.split("@");
                    arr.push({
                        name:this.html[keys[0]].name,
                        key:keys[1],
                        value:this.form[key]
                    })
                })
                let res = await network.getForrankApply({data:{
                    formId: this.id,
                    form: arr
                }});
                if(res=='error') return;
                this.$message.success('提交成功！')
                this.form = {}
            })
        }
    }
}
</script>


<style lang="less" scoped>
.collection{
    margin: 0 auto;
    text-align: left;
    padding: 30px 0;
    min-height: 100vh;
    h1{
        padding:0 0 50px;
        text-align: center
    }
    .button{
        text-align: center;
        margin-top: 30px;
    }
}
</style>
