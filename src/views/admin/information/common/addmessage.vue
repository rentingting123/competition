<template>
    <div>
        <el-dialog title="发布消息" :visible.sync="addmessagedialog" :append-to-body='true'>
            <el-form :model="form" ref='form' :rules="rules" label-width="120px">
                 <el-form-item label="推送渠道" prop="type" required="">
                     <el-radio-group v-model="form.type">
                       <el-radio :label="1">站内信</el-radio>
                       <el-radio :label="2">邮箱</el-radio>
                     </el-radio-group>
                </el-form-item>
                <el-form-item label="通知标题" prop="title">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                    <el-form-item label="通知内容" prop="content" style="text-align:left;" required>
                      <el-input type="textarea" v-model="form.content"></el-input>
                    </el-form-item>
                    <el-form-item prop="labelsType" label="目标用户" required>
                        <el-select v-model="form.labelsType" placeholder="请选择" >
                            <el-option label="选择标签" :value="1"></el-option>
                            <el-option label="选择用户" :value="2"></el-option>
                        </el-select>
                         <el-select
                         v-if="form.labelsType == 1"
                      v-model="form.tabs"
                      filterable
                      clearable
                      multiple 
                      remote
                      reserve-keyword
                      placeholder="输入标签名称"
                      :remote-method="gettabsname"
                      :loading="comloading">
                      <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id">
                      </el-option>
                         </el-select>
                          <el-select
                       v-if="form.labelsType == 2"
                      v-model="form.users"
                      filterable
                      clearable
                      multiple 
                      remote
                      reserve-keyword
                      placeholder="输入用户名"
                      :remote-method="getusersname"
                      :loading="comloading">
                      <el-option
                        v-for="item in options1"
                        :key="item.id"
                        :label="item.le"
                        :value="item.id">
                      </el-option>
                    </el-select>
                        <el-button type="text" @click="addtab()">+创建标签</el-button>
                      </el-form-item>
                       <el-form-item label="推送时间" prop="sendType">
                     <el-radio-group v-model="form.sendType">
                           <el-radio :label="1">立即推送</el-radio>
                           <el-radio :label="2">定时推送</el-radio>
                         </el-radio-group>
                          <el-date-picker
                          :rules='form.sendType == 2 ?[{ required: true, message: "请选择推送时间", trigger: "blur" }]:[ {required: false,}]'
                          v-if="form.sendType == 2"
                           v-model="form.sendTime"
                           value-format="yyyy-MM-dd HH:mm:ss"
                           type="datetime"
                           placeholder="选择日期时间"
                           required>
                         </el-date-picker>
                    </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addmessagedialog = false">取 消</el-button>
                <el-button type="primary" @click="tocreate('form')">确 定</el-button>
            </div>
        </el-dialog>
         <addTabs v-if="addtablog" :close="closetab"/>
    </div>
</template>



<script>
import util from '@@/utils/util'
import moment from 'moment'
import network from '@@/api/jxapi'
import { getUserInfo } from "Lib/commons";
import addTabs from "./addtab"
export default {
    components:{
        addTabs
    },
    props:['close'],
    data(){
        return{
            options1:[],
            comloading:false,
            dialogVisible:false,
            addmessagedialog: true,
            addtablog:false,
            form:{
                type:1,
                labelsType:1,
                sendType:1
            },
            formtableData:[],
            options:[],
            loading:false,
            rules:{
                title: [
                    { required: true, message: '请输入通知标题', trigger: 'blur' }
                ],
                labelsType: [
                    { required: true, message: '请选择', trigger: 'blur' }
                ],
                content: [
                    { required: true, message: '请输入通知内容', trigger: 'blur' },
                ],
                sendType: [
                    { required: true, message: '请选择推送方式', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '请选择推送渠道', trigger: 'blur' },
                ],
            },
            user:''
        }
    },
    created(){
        this.user = getUserInfo()
    },
    methods:{
         async gettabsname(query){
            if(query !== ''){
                this.comloading = true
                 let res = await network.getMessageLabelList({
                data: {
                  label: query,
                  pageSize:30,
                  pageNum:1,
                }
              });
               if (res == "error") return;
               this.options = res.list
               this.comloading = false
            }
        },
        async getusersname(query){
            if(query !== ''){
                this.comloading = true
                 let res = await network.getAllUserList({
                data: {
                  key: query,
                  pageSize:30,
                  pageNum:1,
                }
              });
               if (res == "error") return;
               res.list.forEach(item => {
                   if(item.loginPhonenumber){
                       if(item.school){
                           item.le = `${item.idcardName}(${item.loginPhonenumber})(${item.school})`
                       }else{
                           item.le = `${item.idcardName}(${item.loginPhonenumber})`
                       }
                   }else{
                       if(item.school){
                           item.le = `${item.idcardName}(${item.school})`
                       }else{
                           item.le = `${item.idcardName}`
                       }
                   }
               })
               this.options1 = res.list
               this.comloading = false
            }
        },
        addtab(){
            this.addtablog = true
        },
         closetab(){
            this.addtablog = false;
        },
        handleDelete(index,row){
            // todo 删除
            this.formtableData.splice(index,1)
        },
        remoteMethod(query){
            console.log(query);
        },
        handleadd(){
            this.formtableData.push({
                name: '',
                key:util.randomChar(6),
                require: false
            })
        },
        tocreate(formName){
            let that = this
            this.$refs[formName].validate(async (valid) => {
                if(!valid) return;
                if(that.form.labelsType == 1){
                    that.form.labels = that.form.tabs.join(',')
                }else{
                    that.form.labels = that.form.users.join(',')
                }
                let params = {
                    type:that.form.type,
                    title:that.form.title,
                    content:that.form.content,
                    labelsType:that.form.labelsType,
                    labels:that.form.labels,
                    sendType:that.form.sendType,
                    sendTime:that.form.sendTime,
                }
                let res = await network.addTask({data:params});
                if(res=='error') return;
                this.$message.success('发布成功')
                 this.addmessagedialog = false;
            })
        }
    },
    watch:{
        addmessagedialog(val){
            if(!val){
                return this.close && this.close();
            }
        }
    }
}
</script>
