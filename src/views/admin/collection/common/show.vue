<template>
    <el-dialog title="问卷信息查看"  :visible.sync="show" :append-to-body='true'>
        <h1>{{lists.name}}</h1>
        <el-form label-position="top">
            <el-form-item v-for="list in lists.html" :prop="list.key" :required="list.require" :key="list.key" :label="list.name">
                <el-input disabled></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer"  class="dialog-footer">
            <el-button @click="show = false">确 认</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props:['lists','close'],
    data(){
        return{
            show: true
        }
    },
    watch: {
        show(val){
            if(!val){
                return this.close && this.close();
            }
        }
    }
}
</script>

<style lang="less" scoped>
h1{
    font-size: 24px;
    margin: 0 0 50px;
    text-align: center;
}
</style>
