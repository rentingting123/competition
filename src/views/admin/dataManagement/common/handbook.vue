<template>
  <div class="handbook">
    <div @click="show = true" ><i class="el-icon-download"></i>竞赛手册</div>

    <el-dialog title="竞赛手册" width="600px" :visible.sync="show" style="margin-top:10px;">

      <img src="https://web.moocollege.com/mook/hzq/rankadmin/assets/handbook.gif" width="450px" height="auto" style="margin: 20px auto;display:block;">

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  methods: {
    cancel() {
      this.show = false;
    },
  },
};
</script>

<style lang="less" scoped>
.handbook{
  /deep/.el-dialog__body{
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
}
</style>
