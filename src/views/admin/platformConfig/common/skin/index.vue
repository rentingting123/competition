<template>
    <div class="domain" >
        <el-form class="domainForm" :model="ruleForm" ref="ruleForm" label-width="120px" >
            <el-form-item  label="竞赛" prop="competitionId" :rules="[ { required: true, message: '竞赛不能为空'}]">
                <el-select v-model="ruleForm.competitionId" @change="competitionChange" placeholder="请选择竞赛">
                    <el-option v-for="competition in competitions" :key="competition.id" 
                        :label="competition.name"  :value="competition.id" >
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称" prop="name"  :rules="[ { required: true, message: '名称不能为空'}]">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="定制服务" prop="skin" :rules="[ { required: true, message: '定制服务不能为空'}]">
                <el-select v-model="ruleForm.theme" @change="changeurl" placeholder="请选择定制服务">
                  <el-option v-for="item in serviceList" :key="item.theme" :label="item.name" :value="item.theme">
                  </el-option>
                </el-select>
            </el-form-item>
            
            <el-form-item label="域名" prop="url" :rules="[ { required: true, message: '域名不能为空'}]">
                <el-input v-model="ruleForm.url">
                    <template slot="prepend">http://</template>
                </el-input>
            </el-form-item>
            <el-form-item hidden label="管理员token" prop="adminToken" :rules="[ { required: true, message: 'token不能为空'}]">
                <el-input v-model="ruleForm.adminToken" readonly></el-input>
            </el-form-item>
            <el-form-item hidden label="指向域名" prop="domain" :rules="[ { required: true, message: '指向域名不能为空'}]">
                <el-input :value="domain" readonly></el-input>
            </el-form-item>
 
            <el-form-item >
                <el-button v-if="add" type="primary" @click="submitForm('ruleForm')">生成</el-button>
                <el-button v-else type="primary" @click="saveForm('ruleForm')">修改</el-button>
                <el-button v-if="!add" type="primary" @click="tUpdate">前往修改皮肤</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import network from "@/api/jxapi/index";
import util from '@/utils/util'
import { getGroupId } from '@/utils/commons'
export default {
    data(){
        return{
            ruleForm: {
                name: "",
                skin: "",
                theme: "",
                domain: "",
                url: "",
                competitionId:"",
                adminToken:''
            },
            serviceList: [],
            competitions:[],
            add:true,
        }
    },
    computed:{
        domain(){
            if(this.ruleForm.domain && this.ruleForm.skin){
                let _indexul=location.hostname.split(".")
                return this.ruleForm.domain+'.'+this.ruleForm.skin+'.'+_indexul[_indexul.length-2]+"."+_indexul[_indexul.length-1]
            }else{
                return ''
            }
        }
    },
    created() {
        this.getServiceList();
        this.init();
    },
    methods:{
        async getServiceList(){
            // 4 校皮肤 3 国省系列赛 2 省皮肤   1 一体皮肤和老版本皮肤
            let res  = await network.getSkinList({data:{level:1}})
            if(res == 'error') return;
            this.serviceList = res || []
        },
        async init(){
            let groupId = getGroupId()
            if(!groupId) return ;
            let res = await network.queryCompetitionList({ data:{
                groupId: groupId
            }});
            if(res=='error') return;
            // status 0 未发布 1 审核中  2 审核未通过  5 发布   审核中和发布 不能进行发布
            // isfinish  0 已结束  
            let arr = res || []
            
            this.competitions = arr.filter((res)=>{
                return res.isfinish==0 || res.status==5
            })

        },
        getUrl(){
            let _indexul=location.hostname.split(".")
            return this.ruleForm.domain+'.'+this.ruleForm.skin+'.'+_indexul[_indexul.length-2]+"."+_indexul[_indexul.length-1]
        },
        changeurl(val){
            // 获取skin
            this.serviceList.map(item =>{
                if(item.theme == val){
                    this.ruleForm.skin = item.urlkey
                }
            })

            if(!this.ruleForm.adminToken){
                this.ruleForm.adminToken = util.randomChar(10)
            }
            if(!this.ruleForm.domain){
                this.ruleForm.domain = util.randomChar(12)
            }
            if(!this.ruleForm.url){
                this.ruleForm.url = this.getUrl()
            }
        },
        async competitionChange(val){
            let form = await network.getDomain({data:{id:val}})
            if(form=='error' || !form){
                this.ruleForm = {
                    name: "",
                    skin: "",
                    theme: "",
                    domain: "",
                    url: "",
                    competitionId: val,
                    adminToken:''
                }
                
                return this.add=true;
            }
            this.ruleForm = form;

            this.add=false
        },
        tUpdate(){
            let url = 'http://'+this.ruleForm.url+"?token="+this.ruleForm.adminToken;
            window.open(url);
        },
        submitForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (!valid) return;
                let obj = {
                    ...this.ruleForm,
                    type: 1,
                }
                let setDomain = await network.addDomain({data:obj});
                if(setDomain=='error') return;
                this.$message.success('生成成功！')
                this.add = false;
            });
        },
        saveForm(formName) {
            this.$refs[formName].validate(async valid => {
                if (!valid) return;
                let obj = {
                    ...this.ruleForm,
                    type: 1,
                }
                let setDomain = await network.setDomain({data:obj});
                if(setDomain=='error') return;
                this.$message.success('修改成功！')
            });
        },
    }
}
</script>

<style lang='less' scoped>
.domainForm {
    border: 1px solid #ccc;
    margin-bottom: 20px;
    padding: 20px;
}
</style>