<template>
  <div class="sendCertificate">
      <!-- // auditStatus：-1：未提交审核  0：待审核 1：审核通过 2：审核拒绝 3:已生成可下载
      // status              0：未设置证书 1：已经设置证书
      // checkStatus：0：未操作 1：可以点生成 2：生成中  3：生成完成 -->
      <span class="message" v-if="data.auditStatus==0" @click="show">已提交审核</span>
      <span class="message" v-else-if="data.auditStatus==1 || data.auditStatus==3" @click="show">审核已通过</span>
      <span class="message" v-else-if="data.auditStatus==2" @click="show">审核已拒绝</span>
      <span v-else-if="data.auditStatus==-1">未提交审核</span>

      <el-dialog 
        :title="`查看${chief}证书审核`" 
        :visible.sync="dialogFormVisible"
        :modal-append-to-body="false"
        width="800px"
        :close-on-press-escape="false"
        :close-on-click-modal= false
        >

        <el-form :model="form" class="form" label-width="120px" label-position="left">
          <el-form-item label="公示地址：" prop="showUrl">
            <div>{{form.showUrl || '-'}}</div>
          </el-form-item>
          <el-form-item label="说明：" prop="instructions">
            <div>{{form.instructions || '-'}}</div>
          </el-form-item>
          <el-form-item label="获奖名单：" prop="awardExcels">
            <div v-for="item in form.awardExcels" :key="item.name" class="downloada">
              <a :href="item.url" target="_blank">{{item.name}}</a>
            </div>
          </el-form-item>
          <el-form-item label="审核状态：" prop="type">
            <div>{{form.status | filterStatus}}</div>
          </el-form-item>
          <el-form-item label="审核意见：" prop="opinion">
            <div>{{form.opinion || '-'}}</div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>

  </div>
</template>

<script>
import network from '@@/api/jxapi'
export default {
  props:['type','chief','year','data'],
  data(){
    return{
      dialogFormVisible: false,
      form: {
        address: '',
        message: '',
        file: []
      },
    }
  },
  methods:{
    async show(){
        let res = await network.selectApplyForInfo({data:{
          year: this.year
        }})
        if(res=='error') return ;
        this.form = res || {}
        this.dialogFormVisible = true
    }
  },
  filters:{
    filterStatus(val){
      if(val==0){
          return '待审核'
      }else if(val==1 || val==3){
          return '审核通过'
      }else if(val==2){
          return '审核未通过'
      }else{
          return '-'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sendCertificate{
  display: inline-block;
  vertical-align: top;
  margin: 0 10px;
  .message{
    width:77px;
    height:20px;
    font-size:14px;
    font-weight:500;
    color:rgba(0,120,226,1);
    line-height:20px;
    text-decoration: underline;
    cursor: pointer;
  }
  .form{
    width:587px;
    margin: 0 auto;
    background:rgba(250,250,250,1);
    padding: 20px 30px;
    text-align: left;
  }
  .downloada{
    a{
      color: #409EFF;
    }
  }
}
</style>