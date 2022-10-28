<template>
    <div class="newlist1" >
        <el-carousel height="212px" indicator-position='none' v-if="newsList && newsList.length>0">
            <el-carousel-item v-for="list in newsList" :key="list.id">
                <div @click="$router.push({path:'/issue/detail',query:{id:list.id}})" class="newlistmain">
                    <img :src="list.newsIcon" width="378px" height="212px" />
                    <p class="textOverflow" :title="list.newsTitle">{{list.newsTitle}}</p>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    props:['newsList'],
    data(){
        return{

        }
    }
}
</script>

<style lang='less' scoped>
.newlist1{
    width:378px;
    max-height: 212px;
    overflow: hidden;
    .newlistmain{
        position: relative;
        cursor: pointer;
        .textOverflow{
            position: absolute;
            bottom: 0;
            left: 0;
            width: calc(100% - 20px);
            height: auto;
            padding: 10px;
            background: rgba(0, 0, 0, 0.3);
            font-size: 13px;
            color: #FFFFFF;
            line-height: 20px;
            text-align: left;
        }
    }
}
</style>