<template>
    <div class="import">
        <ImportFile :type= 2 ></ImportFile>
    </div>
</template>

<script>
import ImportFile from '@@/components/fileImport'
export default {
    components:{
        ImportFile
    },
    data(){
        return{
            
        }
    },
}
</script>

<style lang="less" scoped>
.import{
    width: 1200px;
    margin: 0 auto;
    .el-menu-demo{
        background: rgb(246,248,250);

    }
}
    
</style>

