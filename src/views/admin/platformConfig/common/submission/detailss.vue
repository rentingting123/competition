<template>
    <el-dialog title="投稿详情" :visible.sync="dialogVisible" width="80%" :append-to-body='true'>
        <div class="detail">
            <h2>{{message.title}}</h2>
            <div class="mess">
                <span>类型：{{message.type}}</span>
                <span>投稿人：{{message.contributor}}</span>
                <span>联系电话：{{message.phone}}</span>
                <span>邮箱：{{message.email}}</span>
            </div>
            <div class="main" v-html="message.file.fileUrl"></div>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props:['close','message'],
    created(){
    },
    data(){
        return{
            dialogVisible: true,
        }
    },
    watch:{
        dialogVisible(val){
            if(!val){
                return this.close && this.close()
            }
        }
    }
}
</script>

<style lang="less" scoped>
.detail{
    width: 80%;
    margin: 0 auto;
    h2{
        width: 100%;
        text-align: center;
    }
    .mess{
        text-align: left;
        font-size: 14px;
        margin: 20px auto;
        span{
            margin-right: 10px;
        }
    }
    .main{
        font-size: 16px;
        line-height: 1.5;
    }

}
</style>