<template>
  
  <div>
      <span class="title" @click="getpings">
            <i class="iconfont">&#xe655;</i>
            评审设置
        </span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.reviewset{
    display: inline-block;
    vertical-align: middle;
    .title{
        cursor: pointer;
    }
}
</style>