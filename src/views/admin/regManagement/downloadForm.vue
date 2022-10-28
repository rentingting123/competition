<template>
    <div class="selectExpert">
        <el-button type="primary" size="mini" @click="download" v-loading='loading' class="button">下载汇总表</el-button>
    </div>
</template>

<script>
import network from '@@/api/jxapi'
export default {
    props: ['competitionId'],
    data(){
        return{
            show: false,
            loading: false
        }
    },
    methods:{
        async download(){
            let userId = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).id

            if(!this.competitionId) return this.$message.warning('请选择竞赛！')
            // let res = await network.checkdownload();
            // if(res=='error') return;
            // await network.downloadFrom();
            // 
            // window.open(`/api/web/signup/downloadSignUpFile?competitionId=${this.competitionId}&userId=${userId}`)
            this.loading = true
            let res = await network.downloadSignUpFile({data:{
                competitionId: this.competitionId,
                userId: userId
            }})
            this.loading = false
            if(res=='error') return;
            if(!res) return ;
            window.open(res);
        }
    }
}
</script>

<style lang='less' scoped>
.selectExpert{
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
}
</style>