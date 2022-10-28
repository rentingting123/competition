<template>
    <ul class="clearfix wow slideInUp">
        <li v-for="(url,i) in urls" :key="i" :style="`background-image :url(${url})`"></li>
    </ul>
</template>

<script>
import {WOW} from 'wowjs'
export default {
    props:['urls'],
    mounted(){
        new WOW().init()
    }
}
</script>

<style lang="less" scoped>
    ul{
        width: 1248px;
        margin: 0 auto;
        padding-bottom: 150px;
        li{
            width: 400px;
            height: 200px;
            background-size: cover;
            background-position: center;
            margin-right: 24px;
            float: left;
        }
        :nth-child(3n){
            margin-right: 0;
        }
        li:hover{
            background-size: 110%;
        }
    }
</style>

