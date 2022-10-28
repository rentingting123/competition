<template>
  <div>
    <el-popover  @show="getSendMail" placement="left-start" width="280" v-model="visible">
      <div>
        <el-form>
          <el-form-item
            :rules="[{ required: true, validator: checkEmails, trigger: 'blur'}]"
            label="收件人"
          >
            <el-input v-model="toEmail" placeholder="请输入收件人"></el-input>
          </el-form-item>
          <el-form-item label="抄送人">
            <el-input v-model="copyEmail" placeholder="请输入抄送人','分割"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div style="text-align: right; margin: 0">
        <el-button size="mini" type="text" @click="visible = false">取消</el-button>
        <el-button type="primary" :loading="loading" size="mini" @click="send">发送</el-button>
      </div>
      <el-button type="button"  size="mini" slot="reference">邮件分享</el-button>
    </el-popover>
                <el-alert
                  effect="dark"
                  :closable="false"
                  v-if="poolUrl==1"
                  title="生成中"
                  type="info"
                  show-icon
                ></el-alert>
                 <el-alert
                  effect="dark"
                  :closable="false"
                  v-else-if="poolUrl"
                  title="发送成功"
                  type="success"
                  show-icon
                ></el-alert>
  </div>
</template>

<script>
import jxapi from "@/api/jxapi/index";
import {setItem,getItem} from "@/utils/commons"
import { checkEmail } from "@/utils/util"
export default {
  props: ["pool"],
  data() {
    return {
      visible: false,
      toEmail: "",
      copyEmail: "",
      loading:false,
      poolUrl:this.pool.poolUrl
    };
  },
  methods: {
    getSendMail(){
        console.log('12345')
        let sendmail = getItem("sendedMail")||{}
        this.toEmail = sendmail.toEmail
        this.copyEmail = sendmail.copyEmail
    },
    async send() {
        this.loading = true
      let mail = await jxapi.sendMail({
        data: {
          toEmail: this.toEmail,
          copyEmail: this.copyEmail,
          poolId: this.pool.poolId,
        },
      });
      this.$message.info('邮件请求已发送，首次分享需要打包作品，时间受作品大小影响！！')
       this.loading = false
       this.visible = false
       this.poolUrl = 1
       setItem('sendedMail',{toEmail:this.toEmail,copyEmail:this.copyEmail})
    },
    checkEmails(rule, value, callback) {
      if (!value) {
        return callback(new Error(this.$t("profile.emailMess")));
      }
      setTimeout(() => {
        if (checkEmail(value)) {
          callback();
        } else {
          callback(new Error(this.$t("profile.emailMessRight")));
        }
      }, 100);
    },
  },
};
</script>