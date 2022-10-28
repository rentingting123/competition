
<template>
    <div class="news">
        <div>
            <h2>
                推荐文章
                <i class="el-icon-bottom-right h2right"></i>
                
            </h2>
            <left :newsList='newsList' />
        </div>
        <div>
            <h2>
                通知动态
                <i class="el-icon-bottom-right h2right"></i>
                <p style="float:right" >
                    <i @click="onPre0" :class="{'disabled': pageNum0<=1}" class="el-icon-arrow-left left"></i> 
                    <i @click="onNext0" :class="{'disabled': pageNum0>=this.totalPage0 }" class="el-icon-arrow-right right"></i>
                </p>
            </h2>
            <right :newsList='news0' />
        </div>
        <div>
            <h2>
                新闻动态
                <i class="el-icon-bottom-right h2right"></i>
                <p style="float:right" >
                    <i @click="onPre1" :class="{'disabled': pageNum1<=1}" class="el-icon-arrow-left left"></i> 
                    <i @click="onNext1" :class="{'disabled': pageNum1>=this.totalPage1 }" class="el-icon-arrow-right right"></i>
                </p>
            </h2>
            <right :newsList='news1' />
        </div>
    </div>
</template>

<script>
import network from '@@/api/jxapi'
import moment from 'moment'
import left from './newlist1'
import right from './newlist2'
export default {
    props: ['newsList'],
    data(){
        return{
            news0: [],
            pageNum0: 1,
            pageSize0: 9,
            totalPage0: 100,
            news1: [],
            pageNum1: 1,
            pageSize1: 9,
            totalPage1: 100,
        }
    },
    components:{
        left,
        right,
    },
    created(){
        this.getNews0()
        this.getNews1()
    },
    methods:{
        onPre0(){
            if(this.pageNum0>1){
                this.pageNum0--
                this.getNews0()
            }
        },
        onNext0(i){
            if(this.pageNum0<this.totalPage0){
                this.pageNum0++
                this.getNews0()
            }
        },
        async getNews0(){
            let params={
                pageNum: this.pageNum0,
                pageSize: this.pageSize0,
                delStatus: 1,
                type: 0
            }
            let res = await network.getFirstNews({data:params});
            if(res=='error') return;
            this.news0 = res || []
        },
        onPre1(){
            if(this.pageNum1>1){
                this.pageNum1--
                this.getNews1()
            }
        },
        onNext1(i){
            if(this.pageNum1<this.totalPage1){
                this.pageNum1++
                this.getNews1()
            }
        },
        async getNews1(){
            let params={
                pageNum: this.pageNum1,
                pageSize: this.pageSize1,
                delStatus: 1,
                type: 1
            }
            let res = await network.getFirstNews({data:params});
            if(res=='error') return;
            this.news1 = res || []
        },
    },
    filters:{
        date(val){
            if(!val) return '';
            return moment(parseInt(val)).format('YYYY-MM-DD');
        }
    }
}
</script>

<style lang='less' scoped>
.news{
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    >div{
        width: 380px;
        height: auto;
        h2{
            font-size: 16px;
            font-weight: bold;
            color: #264282;
            line-height: 1;
            text-align: left;
            padding: 11px 0;
            margin-bottom: 11px;
            border-bottom: 1px solid #E4E4E4;
            i{
                color: #D6D5D5;
            }
            p{
                i{
                    background: #efefef;
                    cursor: pointer;
                }
                i.disabled{
                    cursor: not-allowed;
                }
            }
        }
    }
    
}
</style>