<template>
    <div>
        <ul class="organizer">
            <li v-for="list in lists" :key="list.id"  class="organizerli" :style="{'background-image':`url(${list.bg})`}">
                <div class="img">
                    <img :src="list.activityBanner" width="100%" height="100%">
                </div>
                <div class="main">
                    <h3 class="ellipsis">{{list.activityTitle}}</h3>
                    <time>{{list.startTime | time}} ~ {{list.endTime | time}}</time>
                    <p></p>
                </div>
                <div class="button">
                    <el-button type="primary" @click="edit(list)">修改</el-button>
                    <el-button type="error" @click="del(list)">删除</el-button>
                </div>

            </li>
            <li class="add" @click="add">+</li>
        </ul>
        <activeEdit :obj='obj' v-if="show" :id='id' :close='close'/>
    </div>
</template>

<script>
import network from '@@/api/jxapi'
import activeEdit from './activeEdit'
import moment from 'moment'
export default {
    props: ['id'],
    components:{
        activeEdit
    },
    data(){
        return{
            lists: [],
            show: false,
            obj: '',
        }
    },
    methods:{
        async init(){
            if(!this.id) return;
            let res = await network.selectCompetitionActivity({data:{
                competitionId: this.id,
                flag: true, //只查询审核中和审核通过的
            }});
            if(res=='error') return;
            this.lists = res || []
        },
        add(){
            if(!this.id) return this.$message.warning('请选择竞赛');
            this.obj = {
                activityTitle:"",
                bannerUrl:"",
                skipUrl:"",
                city:"",
                startTime:"",
                endTime:"",
            }
            this.show = true
        },
        edit(item){
            this.obj = item;
            this.show = true
        },
        async del(item){
            this.$confirm("删除后无法恢复，请确认是否删除?", "提示", {
                confirmButtonText: "确认",
                cancelButtonText: "取消",
                type: "warning"
            }).then(async () => {
                let res = await network.saveCompetitionActivity({data:{
                    ...item,
                    status: 0
                }})
                if(res=='error') return;
                this.$message.success('删除成功')
                this.init();
            })
        },
        close(){
            this.show = false
            this.obj = ''
            this.init();
        }
    },
    filters:{
        time(val){
            if(!val) return;
            return moment(val).format('YY-MM-DD HH:mm')
        }
    },
    watch:{
        id:{
            immediate: true,
            handler(val){
                if(!val) return;
                this.init()
            }
        }
    }
}
</script>

<style lang='less' scoped>
.organizer{
    width: 1240px;
    text-align: left;
    li{
        display: inline-block;
        vertical-align: top;
        margin-top: 22px;
        width: 278px;
        height: 324px;
        background: #FFFFFF;
        box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.08), 0px 0px 8px 0px rgba(0, 0, 0, 0.03);
        border-radius: 3px;
        margin-right: 42px;
        cursor: pointer;
        .img{
            width: 278px;
            height: 194px;
            overflow: hidden;
            &:hover{
                img{
                    transform: scale(1.01);
                }
            }
        }
        .main{
            padding: 15px;
            h3{
                font-size: 16px;
                font-weight: 500;
                color: #000000;
                line-height: 24px;
                height: 48px;
                margin-bottom: 12px;
            }
            time{
                font-size: 14px;
                font-weight: 400;
                color: #A2A4B7;
                line-height: 1;
            }
            p{
                font-size: 14px;
                font-weight: 400;
                color: #A2A4B7;
                line-height: 1;
                margin-top: 6px;
            }
        }
        &:nth-child(4n){
            margin-right: 0;
        }
        &:nth-child(1),&:nth-child(2),&:nth-child(3),&:nth-child(4){
            margin-top: 0;
        }
        &.add{
            width: 100px;
            height: 100px;
            line-height: 100px;
            text-align: center;
            font-size: 48px;
            border: 1px solid #eee;
        }
    }
    .organizerli{
        position: relative;
        .button{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.5);
            display: none;
            justify-content: center;
            align-items: center;
        }
        &:hover{
            .button{
                display: flex;
            }
        }
    }
}
</style>
