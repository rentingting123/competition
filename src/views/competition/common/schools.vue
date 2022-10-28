<template>
    <div class="schools">
        <titles :title="$t('nav.university')" />
        <ul>
            <li v-for="item in lists" :key="item.name" @click="toUrl(item)">
                {{item.name | name}}
            </li>
        </ul>
    </div>
</template>

<script>
import network from '@@/api/jxapi'
import titles from './title'
export default {
    components:{
        titles
    },
    data(){
        return{
            lists: []
        }
    },
    async created(){
        let res = await network.selectSchoolDomain();
        if(res=='error') return;
        this.lists = res || []
    },
    methods:{
        toUrl(item){
            if(item && item.url){
                window.open('http://'+item.url)
            }
        }
    },
    filters:{
        name(val){
            if(!val) return;
            return val.replace('数据中心', '').replace('竞赛', '')
        }
    }
}
</script>

<style lang='less' scoped>
.schools{
    width: 1230px;
    height: auto;
    margin: 18px auto;
    text-align: left;

    ul{
        padding: 20px;
        background: #FFFFFF;
        li{
            width: 192px;
            height: auto;
            margin-top: 15px;
            display: inline-block;
            vertical-align: top;
            cursor: pointer;
            &:nth-child(1),&:nth-child(2),&:nth-child(3),&:nth-child(4),&:nth-child(5),&:nth-child(6){
                margin-top: 0;
            }
            &:hover{
                color: #6283FF;
            }
        }
    }
}
</style>