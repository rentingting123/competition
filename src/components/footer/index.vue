<template>
    <div id="footer">
        <footNav />
        <div class="footer">
            <span>竞赛内容版权归内容提供者（机构）所有 技术支持：杭州简学科技有限公司 浙公网安备：33010602004724号 </span>
        </div>
    </div>
</template>


<script>
import footNav from './footerNav'
export default {
    name: 'Footer',
    components:{
        footNav
    }
}
</script>


<style lang="less" scoped>
.footer{
    background: #151515;
    width:100%;
    height:36px;
    text-align:center;
    line-height: 36px;
    font-size: 12px;
    color: #C9C9C9;
    a{
        color: #C9C9C9;
    }
}
</style>

