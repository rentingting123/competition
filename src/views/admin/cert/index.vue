<template>
    <div class="cert">
        <!-- <div class="top clearfix">
            <div class="button">
                <el-button size="small" v-if="step>1" @click="pre" type="primary">上一步</el-button>
                <el-button size="small" v-if="step==3" @click="preup" type="primary">修改</el-button>
                <el-button size="small" v-if="step<3" @click="next" type="primary">下一步</el-button>
                <el-button size="small" v-if="step==3 && type==1" @click="createCore" type="primary">生成</el-button>
                <el-button size="small" v-if="step==3 && type==2" type="primary">生成中</el-button>
                <el-button size="small" v-if="step==3 && type==3" @click="download" type="primary">下载</el-button>
            </div>
            <ul class="clearfix">
                <li :class="{'on':step>1,'active':step==1}">
                    <span>1</span>
                    <i class="iconfont">&#xe63f;</i>
                    选择模板
                </li>
                <p><i class="el-icon-arrow-right"></i></p>
                <li :class="{'on':step>2,'active':step==2}">
                    <span>2</span>
                    <i class="iconfont">&#xe63f;</i>
                    证书设置
                </li>
                <p><i class="el-icon-arrow-right"></i></p>
                <li :class="{'on':step>3,'active':step==3}">
                    <span>3</span>
                    <i class="iconfont">&#xe63f;</i>
                    证书预览
                </li>
            </ul>
        </div>-->
        <router-view ref="choose"/>

    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed:{
        step:{
            get(){
                return this.$store.state.certStep
            },
            set(val){
                this.$store.state.certStep = val
            }
        },
        type(){
            // 生成证书,0初始化,1可操作,2操作中,3操作完成
            return this.$store.state.certType
        },
        ...mapState({
            authority:state => state.authorityManagement,
        })
    },
    created(){

        if(!this.authority.setCertificate){
            this.$message.error('无权限访问该页面')
            location.href = location.origin;
        }

        let path = this.$route.path
        if(path == '/admin/cert/set'){
            this.step = 2
        }else if(path == '/admin/cert/look'){
            this.step = 3
        }else{
            this.step = 1
        }

        let competitionId = this.$route.query.competitionId;
        let templateId = this.$route.query.templateId;
        if(!competitionId && !templateId && this.step != 1){
            this.$router.push('/admin/cert')
            return this.$store.state.certStep = 1
        }
    },
    methods:{
        next(){
            this.$refs['choose'].setCert();
        },
        pre(){
            this.$refs['choose'].pre();
        },
        preup(){
            this.$refs['choose'].preup();
        },
        createCore(){
            this.$refs['choose'].createCore();
        },
        download(){
            this.$refs['choose'].downloadCore();
        }
    }
}
</script>



<style lang="less" scoped>
.cert{
    background: #ffffff;
    margin: 20px;
    padding: 0 40px;
    overflow: auto;
    min-width: 1250px;
}
.top{
    padding: 16px 0 26px;
    border-bottom: 1px solid #EAEAEA;
    text-align: left;
    .button{
        width: 500px;
        height: 54px;
        float: left;
        margin-top: 11px;
    }
    ul{
        float: left;
        background: #F5F7FA;
        p{
            width: 15px;
            float: left;
            height: 54px;
            line-height: 54px;
            color: #C0C4CC;
            font-size: 30px;
        }
        li{
            float: left;
            width: 240px;
            height: 54px;
            line-height: 54px;
            text-align: center;
            font-size: 16px;
            color: #909399;
            i{
                display: none;
            }
            span{
                display: inline-block;
                width: 24px;
                height: 24px;
                line-height: 24px;
                border: 1px solid #909399;
                border-radius: 100%;
            }
        }
        li.on{
            color: #5CB87A;
            i{
                display: inline-block;
            }
            span{
                display: none;
            }
        }
        li.active{
            color: #303133;
            span{
                border: 1px solid #303133;
            }
        }

    }
}

</style>
