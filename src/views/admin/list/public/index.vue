<template>
    <div>
        <!-- 暂时隐藏 -->
        <notice :status='status' :opinion='opinion' v-if="status"/>
        <!-- 20201112去掉竞赛官方名称 -->
        <!-- status 0 未发布 1 审核中  2 审核未通过  5 发布   审核中和发布 不能进行发布-->
        <el-button :disabled="disabled || status==5 || status==1" 
            type="primary" size="mini" v-loading='publicloading' @click="publish">发布竞赛</el-button>
        
    </div>
</template>

<script>
import network from '@/api/jxapi/index'
import notice from './notice'
export default {
    props: ['competitionId', 'close', 'disabled'],
    data(){
        return{
            status: '',
            opinion: null,
            publicloading: false, // 发布时loading
        }
    },
    components:{
        notice
    },
    methods:{
        async publish(){
            this.publicloading = true
            let res = await network.competitionPublish({data:{
                competitionId: this.competitionId
            }});
            this.publicloading = false
            if(res=="error") return;
            this.$message.success('提交成功');
            this.close ? this.close() : this.$router.push('/admin/list')
        },
    }
}
</script>

<style lang='less' scoped>

</style>