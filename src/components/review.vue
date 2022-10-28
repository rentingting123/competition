<template>
<!--评审-->
    <div id="review">
        <el-collapse accordion>
            <div class="judge">
                <img v-if="data.icon" :src="data.icon">
                <img v-else="" src="https://web.moocollege.com/mooc/hzq/competition/user_center/head1.png">
                <div class="judge_top">
                    <p>{{data.expertName}}</p>
                    <!--<p>浙江大学人工智能院长</p>-->
                </div>
                <span>{{date}}</span>
            </div>
            <div class="judgeContent" >
                <p v-for="(item, index) in data.scores" :key="index">
                    <span>{{item.name}}</span>
                    <span>{{item.score}}/{{item.maxScore}}分</span>
                </p>
                <div class="judge_txt" v-if="data.comment">
                    点评：{{data.comment}}
                </div>
            </div>
            <el-collapse-item v-if="data.reviewStandards">
                <div slot="title" >
                    <p class="goal">
                        <span>得分 </span>
                        <span>{{data.total}}/100分</span>
                    </p>
                </div>

                <div v-for="(item,index) in data.reviewStandards" :key="index" class="score">
                    <h3 v-if="item.weight">{{item.attachName}} ({{item.weight}}%)</h3>
                    <ul>
                        <li v-for="(score,i) in item.reviewScores" :key="i">
                            {{score.title}}({{score.weight}})  <span>{{score.score}}分 ／ 100分</span>
                        </li>
                    </ul>
                </div>
                <p style="background-color:#F9F9F9;padding:10px;" class="mb" v-if="data.reportInstructions">
                 <span>违规意见 : </span>
                 <span>{{data.reportInstructions}}</span>
             </p>
             <div class="img-cell-wrap1 " >
                 <img @click="bigimg(its)" style="cursor: pointer;" :src="its" alt="图片" v-for="(its,index) of data.reportInfo" :key="index">
             </div>
            </el-collapse-item>
            
            <!--<div class="grade" v-else>-->
                <!--<span class="grade">已打分</span>-->
            <!--</div>-->
        </el-collapse>
        <el-dialog
          title=""
          :visible.sync="dialogVisible"
          width="700px">
          <img style="width: 100%;" :src="url" alt="">
        </el-dialog>
    </div>
</template>


<script>
    import moment from 'moment'
    export default {
        props:{
            data:{
                
                comment: Object,
                required: true
            }
        },
        data(){
            return {
                url:undefined,
                dialogVisible:false,
            }
        },
        methods: {
            bigimg(url){
                this.url = url
                this.dialogVisible = true
            }
        },
        computed: {
            // 计算属性的 getter
            date: function () {
                // `this` 指向 vm 实例
                return moment(this.data.updateTime).format('YYYY.MM.DD')
            }
        }
    }
</script>


<style lang="less" scoped>
#review{
    width: 100%;
    border-radius: 5px;
    .el-collapse-item{
        position: relative;
        /deep/ .el-collapse-item__arrow{
            position: relative;
            right:20px;
        }
        /deep/ .el-collapse-item__header{
            border-bottom: none;
        }
    }
    .el-collapse{
        border-top: none;
        border-bottom: none;
    }
    .goal{
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ebeef5;
        padding-right: 15px;
        padding-left: 15px;
        box-sizing: border-box
    }
    .judge{
        display: flex;
        padding:15px;
        padding-bottom: 0;
        >img{
            width: 30px;
            height: 30px;
            border-radius: 100%;
            margin-right: 10px;
        }
        .judge_top{
            width: 300px;
            font-size: 14px;
            line-height: 22px;
            margin-right: 30px;
            >p{
                font-size: 14px;
            }
        }
        >span{
            font-size: 12px;
            color: #C8C8C8;
            letter-spacing: 0.2px;
            float: right;
        }
        
        
    }
    .judgeContent{
        width: 100%;
        padding: 10px 15px;
        box-sizing: border-box;
        // padding-left: 40px;
        >p{
            display: flex;
            justify-content: space-between;
            font-size: 14px;
            color: #4A4A4A;
            margin-bottom: 8px;
        }
        .judge_txt{
            width: 100%;
            padding: 10px;
            min-height: 100px;
            box-sizing: border-box;
            line-height: 20px;
            font-size: 12px;
            color: #4A4A4A;
            background: #F9F9F9;
            border-radius: 5px;
            overflow: hidden;
        }
    }
    /deep/ .el-collapse-item__content{
        width: 100%;
        padding-bottom: 0px;
    }
    /deep/ .el-collapse-item__wrap{
        // position: absolute;
        // z-index: 2;
    }
    .grade{
        width: 100%;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        color: #4A4A4A;
        text-align: right;
        padding-right: 8px;
        box-sizing: border-box;
    }
    .score{
        padding: 15px;
        font-size: 13px;
        ul{
            padding: 0 15px;
            li{
                span{
                    float: right;
                    margin-right: 30px;
                }
            }
        }
    }
}

</style>