<template>
    <div class="base allP">
        <div class="basemain">
            <p class="basetitle">联系电话</p>
            <el-input class='input' v-model="base.phone" placeholder="请输入联系电话"/>
        </div>
        <div class="basemain">
            <p class="basetitle">QQ</p>
            <el-input class='input' v-model="base.qq" placeholder="请输入QQ"/>
        </div>
        <div class="basemain">
            <p class="basetitle">微信</p>
            <el-input class='input' v-model="base.wechat" placeholder="请输入微信"/>
        </div>
        <div class="basemain">
            <p class="basetitle">email</p>
            <el-input class='input' v-model="base.email" placeholder="请输入邮箱"/>
        </div>
        <div class="basemain">
            <p class="basetitle">浙公网安备号</p>
            <el-input class='input' v-model="base.recordZJ" placeholder="请输入浙公网安备号"/>
        </div>
        <div class="basemain">
            <p class="basetitle">浙ICP备号</p>
            <el-input class='input' v-model="base.recordICP" placeholder="请输入浙ICP备号"/>
        </div>
    </div>
</template>

<script>
export default {
    props: ['base'],
}
</script>

<style lang='less' scoped>
.base{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .basemain{
        width: 50%;
        height: auto;
        .basetitle{
            font-size: 17px;
            color: #4a4a4a;
            letter-spacing: 1.21px;
            margin: 20px 0 10px;
        }
        .input{
            width: 200px;
        }
    }
}
</style>