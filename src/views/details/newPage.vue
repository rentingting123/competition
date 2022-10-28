<template>
    <!--新增页面-->
    <div id="newPage">
        <div class="title">
            <el-input v-show="titleEdit" v-model="title" autofocus ref="titleEdit" size="small" style="width:300px" @blur="titleEdit=false"/>
            <h1 v-show='!titleEdit'>{{title}}</h1>
            <i v-if="flag" class="el-icon-edit-outline" @click="toTitleEdit"></i>
        </div>
        <div v-if="flag">
            <!--富文本编辑器-->
            <editor class="m-text" :setDate="setRichText" :stateData="info"/>
            <div class="btn">
                <el-button size="medium">取消</el-button>
                <el-button type="primary" @click="submit" size="medium">保存</el-button>
            </div>
        </div>
        <div v-else>
            <show :data='info' />
        </div>
        
    </div>
</template>


<script>
import network from '@@/api/jxapi'
import editor from '@@/components/editor/index'
import show from '@@/components/editor/show' 
    export default {
        name: 'newPage',
        components:{
            editor,
            show
        },
        data(){
            return {
                title:'新增页面',
                info:'',
                titleEdit: false,
                tabName: '',
                id: '',
                flag: true,
            }
        },
        created(){
            this.getInfo()
        },
        methods: {
            async getInfo(){
                this.tabName = this.$route.query.type
                this.id = this.$route.query.id
                this.flag = this.$route.query.flag
                let res = await network.getTabInfo({data:{
                    competitionId: this.id,
                    tabName: this.tabName
                }})
                if(res=='error') return;
                this.title = res && res.title || ''
                this.info = res && res.info || ''
            },
            async submit(){
                if(!this.title) return this.$message.warning('请填写标题')
                if(!this.info) return this.$message.warning('请填写内容')
                if(!this.id || !this.tabName) return this.$message.warning('请确认路径是否正确')
                let res = await network.saveTabInfo({data:{
                    competitionId: this.id,
                    title: this.title,
                    tabName: this.tabName,
                    info: this.info
                }})
                if(res=='error') return;
                this.$message.success('保存成功')
            },
            toTitleEdit(){
                this.titleEdit = true
                this.$nextTick(()=>{
                    this.$refs.titleEdit.$refs.input.focus()
                })
            },
            setRichText(val){
                this.info = val
            }
        },
        watch:{
            $route(to, from){
                this.getInfo();
            }
        }
    }
</script>


<style lang="less" scoped>
#newPage{
    width: 1040px;
    margin: auto;
    background-color: #fff;
    padding: 30px 55px;
    text-align: start;
    overflow: hidden;
    box-sizing: border-box;
    .title{
        display: flex;
        align-items: center;
        h1{
            font-size: 30px;
            border-left: 4px solid #1D86FF;
            padding-left: 16px;
            font-weight: 500;
            margin-left: 5px;
        }
        i{
            cursor: pointer;
            margin-left: 10px;
        }
    }
    .m-text {
        width: 100%;
        margin: 35px 0;
    }
    .btn{
        text-align: right;
        button{
            margin-right: 20px;
        }
    }
    /deep/ .ql-editor{
        min-height: 300px;
    }
}
</style>
