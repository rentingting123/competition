<template>
  <div class="publicstatusmain">
        <!-- status 0 未发布 1 审核中  2 审核未通过  5 发布 -->
        <span  v-if="status==0" >未发布</span>
        <span class="publicstatus" v-if="status==1" @click="showmess(1)">审核中</span>
        <span class="publicstatus red" v-if="status==2"  @click="showmess(2)">审核未通过</span>
        <span class="publicstatus" v-if="status==5" @click="showmess(5)">发布成功</span>

        <el-dialog
          :visible.sync="show" 
          width="30%" 
          :modal-append-to-body="false"
          :close-on-press-escape="false"
          :close-on-click-modal= false>
          <span slot="title" class="dialog-title">
            <span v-if="status==0">
              <i class="iconfont" style="color:#52C41A">&#xe63f;</i>
              未发布
            </span>
            <span v-if="status==1">
              <i class="iconfont" style="color:#FAAD14">&#xe643;</i>
              审核中
            </span>
            <span v-if="status==2">
              <i class="iconfont" style="color:#F5222D">&#xe641;</i>
              审核未通过
            </span>
            <span v-if="status==5">
              <i class="iconfont" style="color:#52C41A">&#xe63f;</i>
              发布成功
            </span>
          </span>

          <span>{{mess}}</span>

          <span slot="footer" class="dialog-footer">
            <el-button @click="show = false">关 闭</el-button>
          </span>

        </el-dialog>

  </div>
</template>

<script>
export default {
    props:['opinion','status','parentName'],
    data(){
      return{
        show: false,
        mess: '',
      }
    },
    methods:{
      showmess(type){
        if(type==0){
          this.mess = '竞赛由上级审核成功后自动生效。'
        }else if(type==1){
          this.mess = `竞赛由上级单位（${this.parentName}）审核成功后自动生效,审核过程中不影响数据上传、信息修改等操作.`
        }else if(type==2){
          this.mess = '上级意见：' + (this.opinion || '')
        }else if(type==5){
          this.mess = '上级意见：' + (this.opinion || '')
        }
        this.show = true
      }
    }
}
</script>

<style lang="less" scoped>
.publicstatusmain{
    display: inline-block;
    .publicstatus{
        font-size:14px;
        font-weight:500;
        color:rgba(0,120,226,1);
        text-decoration: underline;
        cursor: pointer;
        &.red{
          color: #CB5268;
        }
    }
    /deep/.el-dialog__body{
      text-align: left;
    }
}
</style>