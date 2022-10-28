<template>
    <ul>
        <li v-for="list in newsList" :key="list.id" @click="$router.push({path:'/issue/detail',query:{id:list.id}})">
            <h3 class="textOverflow" :title="list.newsTitle"><span></span>{{list.newsTitle}}</h3>
        </li>
    </ul>
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
ul{
    width: 380px;
    max-height: 212px;
    overflow: hidden;
    li{
        width: 100%;
        margin-bottom: 11px;
        text-align: left;
        cursor: pointer;
        h3{
            width: 100%;
            font-size: 13px;
            color: #4A4A4A;
            font-weight: normal;
            line-height: 1;
            span{
                display: inline-block;
                vertical-align: middle;
                width: 4px;
                height: 4px;
                background: #cccccc;
                border-radius: 100%;
                margin-right: 5px;
            }
        }
        &:first-child{
            h3{
                font-weight: bold;
                font-size: 14px;
            }
        }
        &:last-child{
            margin-bottom: 0;
        }
    }
}
</style>