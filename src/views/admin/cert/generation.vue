<template>
    <div style="background:#fff;">
        <div class="search">
            <el-input  placeholder="搜索竞赛" @keyup.enter.native="getLists"  v-model="searchName">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
        </div>
        <div class="listmain">
            <el-table :data="tableData" border style="width: 90%;margin:0 auto 20px;">
                <el-table-column  type="index" align="center" min-width="55"> </el-table-column>
                <el-table-column  prop="competitionName" label="竞赛名称" align="center" min-width="180"></el-table-column>
                <!-- <el-table-column label="状态" align="center" min-width="80">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status==1">已生成</div>
                        <div v-else>未生成</div>
                    </template>
                </el-table-column> -->
                <el-table-column  label="操作" min-width="220" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" v-if="scope.row.complete==3"  @click="toRead(scope.row)">查看</el-button>
                        <el-button size="mini" type="primary" v-if="scope.row.complete==3" @click="downloadCore(scope.row)">下载</el-button>
                        <el-button size="mini" type="primary" v-if="scope.row.complete==1 || scope.row.complete==0" :disabled="scope.row.complete==0"  @click="createCore(scope.row)">生成</el-button>
                        <el-button size="mini" type="primary" v-if="scope.row.complete==2">生成中</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
import network from '@@/api/jxapi'
export default {
    data(){
        return{
            searchName:'',
            tableData:[]
        }
    },
    created(){
        this.getLists()
    },
    methods:{
        async downloadCore(row){
            let res = await network.downloadCore({data:{competitionId:row.id},config:{responseType:'arraybuffer'}});
            if(res=='error') return;
        },
        createCore(row){
            this.$confirm('证书生成后不可修改，确定生成吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await network.createCore({data:{
                    competitionId: row.id
                }})
                if(res=='error') return;
                this.$message.success('证书正在生成，请耐心等待')
                this.getLists()
            })
        },
        toRead(row){
            this.$router.push({path:'/admin/cert/generationlook',query:{competitionId:row.id}})
        },
        async getLists(){
            let res = await network.getCertGenerationList({data:{
                competitionName: this.searchName
            }});
            if(res=='error' || !res) return;
            this.tableData = res
        },
    }
}
</script>

<style lang="less" scoped>
.search{
    width: 90%;
    margin: 0 auto;
    padding: 30px 0 20px;
    text-align: left;
    .el-input{
        width: 300px;
    }
    .toCreate{
        float: right;
    }
}
</style>
