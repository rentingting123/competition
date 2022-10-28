<template>
    <div style="background:#fff;">
        <div class="search">

            <el-select v-model="year" placeholder="请选择" @change="getLists">
                <el-option v-for="item in yearList" :key="item" :label="item" :value="item"></el-option>
            </el-select>

            <el-input  placeholder="搜索竞赛" @keyup.enter.native="getLists"  v-model="searchName">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>

            <!-- 提交上级证书审核 -->
            <sendCertificate :year='year' :chief='chief' :close='close'/>
        </div>
        <div class="listmain">
            <el-table :data="tableData" border style="width: 90%;margin:0 auto 20px;">
                <el-table-column  type="index" align="center" min-width="55"> </el-table-column>
                <el-table-column  prop="competitionName" label="竞赛名称" min-width="180"></el-table-column>
                <el-table-column label="状态" align="center" min-width="80">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status==0">未设置</div>
                        <div v-if="scope.row.status==1 && scope.row.checkStatus!=3">已设置</div>
                        <div v-if="scope.row.status==1 && scope.row.checkStatus==3">已生成竞赛证书</div>
                    </template>
                </el-table-column>

                <el-table-column label="上级审核状态" align="center" min-width="80">
                    <template slot-scope="scope">
                        <!-- 查看证书审核状态 -->
                        <lookCertificate :chief='chief' :type='scope.row.status' :data='scope.row' :year='year'></lookCertificate>
                    </template>
                </el-table-column>

                <el-table-column  label="操作" min-width="250">
                    <template slot-scope="scope">
                        <!-- // auditStatus：-1：未提交审核  0：待审核 1：审核通过 2：审核拒绝
                            // status              0：未设置证书 1：已经设置证书
                            // checkStatus ：0：未操作 1：可以点生成 2：生成中  3：生成完成 -->
                        <div class="operate">
                            <el-button size="mini" type="primary" :disabled="scope.row.auditStatus==1 || scope.row.checkStatus==2 || scope.row.checkStatus==3" v-if="scope.row.status==0" @click="edit(scope.row,1)">模板设置</el-button>
                            <el-button size="mini" type="primary" :disabled="scope.row.auditStatus==1 || scope.row.checkStatus==2 || scope.row.checkStatus==3" v-else @click="edit(scope.row,1)">模板修改</el-button>
                            <el-button size="mini" type="primary" :disabled="true" v-if="scope.row.checkStatus==2">生成中</el-button>
                            <el-button size="mini" type="primary" :disabled="scope.row.checkStatus!=1 || scope.row.status==0 || scope.row.auditStatus==0 || scope.row.auditStatus==1 " v-else @click="createCore(scope.row)">生成</el-button>
                            <el-button size="mini" type="primary" :disabled="scope.row.checkStatus!=3" @click="downloadCore(scope.row)">批量下载证书</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
import network from '@@/api/jxapi'
import {getGroupId} from '@@/utils/commons'
import sendCertificate from "./common/sendCertificate";
import lookCertificate from "./common/lookCertificate";
export default {
    components:{
        sendCertificate,
        lookCertificate
    },
    data(){
        return{
            searchName:'',
            tableData:[],
            year: '',
            yearList:[],
            chief: '',
        }
    },
    created(){
        this.queryUpGroup()
        this.init()
    },
    methods:{
        async queryUpGroup(){
            let groupId = getGroupId()
            let res = await network.queryUpGroup({data:{
                groupId: groupId
            }})
            if(res=='error') return
            this.chief = res[0].groupName
        },
        edit(row, type){
            this.$router.push({path:'/admin/cert/update',query:{
                competitionId: row.id,
                type: type,
            }})
        },
        async downloadCore(row){
            let res = await network.downloadCore({data:{
                competitionId: row.id,
                competitionName: row.competitionName
            },config:{responseType:'arraybuffer'}});
            if(res=='error') return;
        },
        createCore(row){
            this.$confirm('证书生成后不可修改，且无法提交上级证书审核，确定生成吗？', '提示', {
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
        async getLists(){
            if(!this.year) return this.$message.warning('请选择年份');
            let res = await network.getCompetitionList({data:{
                competitionYear: this.year,
                competitionName: this.searchName
            }});
            if(res=='error' || !res) return;
            // auditStatus：-1：未提交审核  0：待审核 1：审核通过 2：审核拒绝
            // status              0：未设置证书 1：已经设置证书
            // checkStatus：0：未操作 1：可以点生成 2：生成中  3：生成完成
            this.tableData = res
        },
        async init(){
            let res =await network.getCompetitionYears()
            if(res=='error') return;
            if(!res) return this.$message.warning('未查询到竞赛年份，请核查');
            this.yearList = res;
            this.year = res[0]
            this.getLists()
        },
        close(){
            this.getLists()
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
    margin-top: 100px;
    .el-input{
        width: 300px;
    }
    .toCreate{
        float: right;
    }
}
.listmain{
    .el-button--mini{
        padding: 7px 10px;
    }
}
.operate{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
}
</style>
