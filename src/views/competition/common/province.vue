<template>
    <div class="province">
        <ul class="names" v-loading='loading'>
            <li v-for="item in provinceLists" :key="item.provinceId" 
                @click="changeProvince(item)" 
                :class="{'on': active.provinceId==item.provinceId, 'disabled':!item.competitionNum}">
                <span>{{item.province | small}}</span>
                <i>({{item.competitionNum || 0}})</i>
            </li>
        </ul>
        <div class="titles">
            <p class="line"></p>
            <span>{{active && active.province}}赛直通车</span>
            <div class="button" v-if="active && active.url" @click="toProvinceCompetition(active.url)">
                <i class="iconfont">&#xe6f9;</i>
                {{$t('nav.go')}} 
            </div>
        </div>
        <ul class="competitionList" v-loading='listloading'>
            <li v-for="item in competitionLists" :key="item.id" @click="toCompetition(item)">
                <competitionType :type='item.isfinish'/>
                <p class="textOverflow" :title="item.name">{{item.name}}</p>
            </li>
        </ul>
        <div class="el-page">
            <el-pagination
                background
                :page-size="pagesize"
                layout="prev, pager, next"
                :current-page.sync="page"
                :total="total"
                :hide-on-single-page='true'
                @current-change="currentChange"
                style="margin-top:30px"
            ></el-pagination>
        </div>

    </div>
</template>

<script>
import network from '@@/api/jxapi'
import competitionType from './competitionType'
export default {
    components:{
        competitionType
    },
    data(){
        return{
            page: 1,
            total: 0,
            pagesize: 18,
            provinceLists: [],
            active: {},
            competitionLists: [],
            loading: false,
            listloading: false,
        }
    },
    created(){
        this.init()
    },
    methods:{
        async init(){
            this.loading = true
            let res = await network.getProvinceInfo()
            this.loading = false
            
            let arr = res.filter(item=>{
                return item.province !='澳门特别行政区' 
                && item.province !='香港特别行政区'
                && item.province !='中国' 
                && item.province !='国际' 
                && item.province !='亚太' 
                && item.province !='台湾省' 
            })
            
            this.provinceLists = arr || []
            res.length>0 && this.changeProvince(res[0])
        },
        async changeProvince(obj, page){
            if(!obj.competitionNum) return;
            this.active = obj
            this.listloading = true
            let res = await network.selectProvinceCompetitions({data:{
                provinceName: '省赛,'+ obj.province,
                pageNum: page || this.page,
                pageSize: this.pagesize
            }})
            this.listloading = false
            if(res=='error') return;
            this.competitionLists = res && res.list || [];
            this.total = res && res.total || 0
        },

        toProvinceCompetition(url){
            if(!url) return;
            url = url.indexOf('http') == -1 ? 'http://' + url : url
            window.open(url)
        },
        toCompetition(item){
            if(item && item.url){
                let url = item.url.indexOf('http') == -1 ? 'http://' + item.url : item.url
                window.open(url)
            }else if(item && item.id){
                this.$router.push('details?id='+item.id)
            }
        },
        currentChange(val){
            this.changeProvince(this.active, val)
        }
    },
    filters:{
        small(val){
            if(!val) return '';
            if(val.indexOf('自治区')!=-1){
                return val.slice(0,2)
            }else{
                return val.slice(0,3)
            }
        }
    }
}
</script>

<style lang='less' scoped>
.province{
    width: 1190px;
    height: auto;
    background: #FFFFFF;
    margin: 18px auto 0;
    padding: 24px 20px 30px;
    .names{
        text-align: left;
        border-bottom: 1px solid #EAEAEA;
        li{
            display: inline-block;
            vertical-align: top;
            width: 108px;
            overflow: hidden;
            height: 15px;
            font-size: 14px;
            font-weight: 400;
            color: #4A4A4A;
            line-height: 1;
            letter-spacing: 1px;
            margin-bottom: 18px;
            cursor: pointer;
            i{
                display: inline-block;
                font-style: normal;
            }
            &.on{
                color: #6283FF;
            }
            &:hover{
                color: #6283FF;
            }
            &.disabled{
                cursor: no-drop;
            }
            &.disabled:hover{
                color: #4A4A4A;
            }
        }
    }
    .titles{
        text-align: left;
        margin-top: 19px;
        p{
            width: 8px;
            height: 24px;
            background: #6283FF;
            display: inline-block;
            vertical-align: top;
            margin-right: 12px;
        }
        span{
            width: auto;
            line-height: 24px;
            font-size: 20px;
            font-weight: 500;
            color: #4A4A4A;
            letter-spacing: 1px;
            margin-right: 24px;
        }
        .button{
            display: inline-block;
            vertical-align: top;
            width: 97px;
            height: 23px;
            border-radius: 3px;
            border: 1px solid #6283FF;
            line-height: 23px;
            text-align: center;
            font-size: 14px;
            font-weight: 400;
            color: #6283FF;
            letter-spacing: 1px;
            cursor: pointer;
        }

    }
    .competitionList{
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        flex-wrap: wrap;
        li{
            width: 396px;
            text-align: left;
            margin-top: 21px;
            cursor: pointer;
            p{
                max-width: 300px;
                font-size: 14px;
                font-weight: 400;
                color: #4A4A4A;
                line-height: 21px;
                letter-spacing: 1px;
                display: inline-block;
                vertical-align: top;
            }
        }
    }
    .el-page{
        text-align: center;
    }
}
</style>