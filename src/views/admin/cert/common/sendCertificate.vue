<template>
  <div class="sendCertificate">
      <el-button  type="success" @click="onshow">提交上级证书审核</el-button>

      <el-dialog 
        :title="`提交${chief}证书审核`" 
        :visible.sync="dialogFormVisible"
        :modal-append-to-body="false"
        width="800px"
        :close-on-press-escape="false"
        :close-on-click-modal= false
        >
        <div class="sendtop">
          <div class="title">
            <span><img src="https://web.moocollege.com/mooc/hzq/competition/cert/tips.png" width="100%" height="100%"/></span>
            <p>温馨提示</p>
          </div>
          <div>
            <span></span>
            <p>设置证书模板则使用本竞赛印章和证书背景，{{chief}}审核通过后只会追加{{chief}}印章和证书编号</p>
          </div>
          <div>
            <span></span>
            <p>直接提交审核将使用{{chief}}设置的证书背景和印章</p>
          </div>
        </div>
        <el-form :model="form" ref="form" :rules="rules" class="form">
          <el-form-item label="公示地址" prop="showUrl">
            <el-input v-model="form.showUrl" placeholder="请填写结果公示地址"></el-input>
          </el-form-item>
          <el-form-item label="说明" prop="instructions">
            <el-input v-model="form.instructions" placeholder="请填写说明内容" type="textarea" autosize></el-input>
          </el-form-item>
          <el-form-item label="上传获奖名单：" prop="awardExcels">
            <upload
                class="upload-demo"
                :drag="true"
                action="/"
                :onSuccess="OnSuccess"
                :showlist="false"
                accept=".doc, .docx, .xls, .xlsx"
                :config="{temp:true}"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  将文件拖到此处，或
                  <em>点击上传</em>
                </div>
                <div class="el-upload__tip" slot="notice">
                  支持扩展名：doc docx xls xlsx
                </div>
              </upload>
                <span class="file-list">
                    <div
                        :style="{marginBottom: '10px', width: '360px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}"
                        v-for="(item, j) in form.awardExcels"
                        :key="j"
                        >
                        <div>
                            <el-input :style="{width: '200px'}" v-model="item.name"></el-input>
                        </div>
                        <span :style="{cursor: 'pointer'}" @click="delFileFun(j)" >
                            <el-icon class="el-icon-close"></el-icon>
                        </span>
                    </div>
                </span>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('form')">确 定</el-button>
        </div>
      </el-dialog>

  </div>
</template>

<script>
import upload from "@@/components/fileUpload/index";
import network from '@/api/jxapi'
export default {
  props:['year','chief','close'],
  components:{
    upload
  },
  data(){
    return{
      dialogFormVisible: false,
      form: {
        showUrl: '',
        instructions: '',
        awardExcels: []
      },
      rules: {
          showUrl: [
            { required: true, message: '请填写结果公示地址', trigger: 'change' }
          ],
          instructions: [
            { required: true, message: '请填写说明内容', trigger: 'change' }
          ],
          awardExcels: [
             { required: true, message: '请上传获奖名单', trigger: 'change' }
          ]
      },
    }
  },
  methods:{
    async onshow(){
      let res = await network.selectAuditPermission({data:{
        competitionYear: this.year
      }})
      if(res=='error') return
      this.dialogFormVisible = true
    },
    OnSuccess(file, filelist){
      this.form.awardExcels.push({
          name:filelist.name,
          url:file.location
      })
    },
    delFileFun(j){
      this.form.awardExcels.splice(j,1)
    },
    submitForm(formName){
      this.$refs[formName].validate(async (valid) => {
          if (!valid)  return;
          let res = await network.setApplyForAudit({data:{
            year: this.year,
            ...this.form
          }})
          if(res=='error') return;
          this.close && this.close();
          this.$message.success('提交成功')
          this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.sendCertificate{
  display: inline-block;
  vertical-align: top;
  margin: 0 10px;
  .sendtop{
    width:589px;
    height:147px;
    border-radius:2px;
    border:1px solid rgba(0,120,226,1);
    margin: 0 auto 35px;
    padding: 15px 22px 18px 14px;
    >div{
      margin-bottom: 12px;
      display: flex;
      justify-content: flex-start;
      align-content: flex-start;
      span{
        width:6px;
        height:6px;
        border-radius: 100%;
        background:rgba(74,161,242,1);
        display: block;
        margin-top: 8px;
        margin-right: 10px;
      }
      p{
        width:537px;
        height:auto;
        font-size:16px;
        font-weight:400;
        color:rgba(74,74,74,1);
        line-height:22px;
      }
      &.title{
        span{
          width: 11px;
          height: 11px;
          background: none;
          border-radius: 0;
          margin-top: 5px;
          img{
            vertical-align: top;
          }
        }
        p{
          font-weight:bold;
          color:rgba(74,161,242,1);
        }

      }
    }
  }
  .form{
    width:587px;
    margin: 0 auto;
  }
}
</style>