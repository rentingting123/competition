<template>
    <ul>
        <li v-for="question in questions" @click="question.close=!question.close" :class="{'on':question.close}" :key="question.id" >
            <h1>{{question.title}}</h1>
            <p v-html="question.message"></p>
        </li>
    </ul>
</template>

<script>
import mock from '@@/mock/qa.js'
export default {
    props:['type'],
    data(){
        return{
            questions:[],
        }
    },
    created(){
        this.init()
    },
    methods:{
        init(){
            this.questions = mock[this.type-2]
        }
    },
    watch:{
        type(){
            this.init()
        }
    }
}
</script>

<style lang="less" scoped>
ul{
    width: 760px;
    margin: 15px auto;
    text-align: left;
    li{
        cursor: pointer;
        h1{
                font-size: 14px;
                color: #0078E2;
                margin: 10px 0;
        }
        p{
                width: 728px;
                background: #F5FAFF;
                border: 1px solid #DBE7FF;
                padding: 15px;
                margin: 13px 0 20px;
                font-size: 14px;
                color: #4A4A4A;
                line-height: 30px;
                display: none;
        }
    }
    li.on{
        p{
            display: block;
        }
    }

}
</style>
