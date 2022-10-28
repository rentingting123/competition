<template>
    <ul>
       <li  v-for="item in list" :key="item.id">
          
           <el-link class="downList" :href="item.url">
            <i class="el-icon-download"></i>
               <span style="margin-left:8px">{{item.title}}</span>
               </el-link>
       </li>
    </ul>
</template>

<script>
export default {
    props:['list']
}
</script>
<style lang="less" scoped>
.downList{
    display: flex;
    margin:16px;
    align-items: center;
    justify-content: left;
}
</style>
