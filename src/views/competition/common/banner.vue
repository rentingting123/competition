<template>
    <div class="first_part">
        <el-carousel height="450px"  indicator-position="none" >
            <el-carousel-item v-for="(item, index) in slideshowList" :key="'banner_' + index">
                <div class="bannerImgall" >
                    <div class="bannerImgout" :style="{backgroundImage: 'url(' + item.url + ')'}" @click="gotoDetail(item)"></div>
                    <div class="bannerImg" :style="{backgroundImage: 'url(' + item.url + ')'}" @click="gotoDetail(item)"></div>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    props: ['slideshowList'],
    methods:{
        gotoDetail (item) {
            if(!item.href) return;
            let url = item.href.indexOf('http') == -1 ? 'http://' + item.href : item.href
            location.href = url
        },
    }
}
</script>

<style lang='less' scoped>
.bannerImgall{
      position: relative;
      width: 100%;
      height: 450px;
      min-width: 1200px;
      overflow: hidden;
    .bannerImgout{
        width: 120%;
        height: 140%;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        filter: blur(60px);
        z-index: 1;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .bannerImg{
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        vertical-align: middle;
        width: 100%;
        min-width: 1200px;
        max-width: 1920px;
        height: 450px;
        cursor: pointer;
        background-position: center;
        background-size: auto;
        background-repeat: no-repeat;
        z-index: 2;
        opacity: 1;
    }
}

.el-carousel__item:nth-child(2n) {
    background-color: linear-gradient(to bottom, #d4e0ec 0%, #D7E4F2 5%, #fff 95%, #FDFDFD 100%);
    // height: 38.125rem;
}
.el-carousel__item:nth-child(2n+1) {
    background-color: linear-gradient(to bottom, #d4e0ec 0%, #D7E4F2 5%, #fff 95%, #FDFDFD 100%);
    // height: 38.125rem;
}
</style>