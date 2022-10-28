<template>
    <el-dialog :close-on-click-modal= false :visible.sync="dialogFormVisible" :fullscreen="true">
        <div class="main">
            <div>
                <h1>信息已提交</h1>
                <p>工作人员审核后将与您联系<br>请保持电话畅通<br><br>若有疑问，请联系客服<br>手机号：15381072855（微信同号）</p>
            </div>
            <img src="./common/pic.png" width="650" height="397">
        </div>
    </el-dialog> 
</template>
<script>
export default {
    props:['close'],
    data(){
        return{
            dialogFormVisible: true
        }
    },
    watch:{
        dialogFormVisible(val){
            if(!val) return this.close && this.close();
        }
    }
}
</script>
<style lang="less" scoped>
.main{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 1000px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    >div{
        width: 320px;
        height: 397px;
        margin-right: 30px;
        text-align: left;
        h1{
            margin-top: 128px;
            font-size: 50px;
            color: #2998FF;
            letter-spacing: 6.67px;
        }
        p{
            font-size: 18px;
            color: #4A4A4A;
            letter-spacing: 1.12px;
            line-height: 27px;
            margin-top: 25px;
        }
    }
}
</style>