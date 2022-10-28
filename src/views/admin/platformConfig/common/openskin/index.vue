<template>
    <div class="domain" v-if="groupId">
        <el-form class="domainForm" :model="ruleForm" ref="ruleForm" label-width="120px" >
            <el-form-item label="名称" prop="name"  :rules="[ { required: true, message: '名称不能为空'}]">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="定制服务" prop="theme" :rules="[ { required: true, message: '定制服务不能为空'}]">
              <el-select v-model="ruleForm.theme" @change="changeurl" placeholder="请选择定制服务">
                  <el-option v-for="item in serviceList" :key="item.theme"
                    :label="item.name" :value="item.theme">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="域名" prop="url" :rules="[ { required: true, message: '域名不能为空'}]">
              <el-input v-model="ruleForm.url">
                  <template slot="prepend">http://</template>
              </el-input>
            </el-form-item>
            <!-- 开通的时候需要，但不需要显示 -->
            <el-form-item hidden label="管理员token" prop="adminToken" :rules="[ { required: true, message: 'token不能为空'}]">
              <el-input v-model="ruleForm.adminToken" readonly></el-input>
            </el-form-item>
            <el-form-item hidden label="指向域名" prop="domain" :rules="[ { required: true, message: '指向域名不能为空'}]">
              <el-input :value="domain" readonly></el-input>
            </el-form-item>
            <el-form-item >
                <el-button v-if="add" type="primary" @click="submitForm('ruleForm')">生成</el-button>
                <el-button v-else type="primary" @click="saveForm('ruleForm')">修改</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import network from "@/api/jxapi/index";
import { getGroupId } from '@/utils/commons'
import util from '@/utils/util'

export default {
  props: ['set'],
  data() {
    return {
      ruleForm: {
        name: "",
        theme: "",
        domain: "",
        url: "",
        skin: '',
        adminToken:''
      },
      serviceList: [],
      competitions:[],
      add:true,
      groupId: '',
    };
  },
  created() {
    this.groupId = getGroupId()
    if(!this.groupId) return;
    this.getServiceList();
    this.init();
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
  methods: {
    async getServiceList(){
      // 4 校皮肤 3 国省系列赛 2 省皮肤   1 一体皮肤和老版本皮肤
      let res  = await network.getSkinList({data:{level:3}})
      if(res == 'error') return;
      this.serviceList = res || []
    },
    async init(){
      let res = await network.getDomain({data:{id:this.groupId}})
      if(res=='error' || !res){
        this.ruleForm = {
          name: "",
          theme: "",
          domain: "",
          url: "",
          skin: '',
          adminToken:''
        }
        return this.add=true;
      }
      this.ruleForm = res;
      this.add=false
      this.set && this.set();
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
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid)  return;
        let obj = {
          ...this.ruleForm,
          competitionId: this.groupId,
          type: 4,
          aviliable: 1
        }
        let setDomain = await network.addDomain({data:obj});
        if(setDomain=='error') return;
        this.$message.success('生成成功！')
        this.add = false;
        this.set && this.set();
      });
    },
    saveForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return;
        let obj = {
          ...this.ruleForm,
          type: 4
        }
        let res = await network.setDomain({data: obj});
        if(res=='error') return;
        this.$message.success('修改成功！')
      });
    },
  }
};
</script>
<style lang="less" scoped>
.domain {
  // 固定头部
  text-align: left;
  background: #ffffff;
  .domainForm {
    border: 1px solid #ccc;
    margin-bottom: 20px;
    padding: 20px;
  }
}
</style>
