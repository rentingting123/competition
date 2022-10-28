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
                <el-table-column  label="状态" align="center" min-width="80">
                    <template slot-scope="scope">
                        <div v-if="scope.row.status==1">已设置</div>
                        <div v-else>未设置</div>
                    </template>
                </el-table-column>
                <el-table-column  label="操作" min-width="220" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" v-if="scope.row.status==0 && scope.row.complete!=2 && scope.row.complete!=3" @click="edit(scope.row,1)">设置</el-button>
                        <el-button size="mini" type="primary" v-if="scope.row.status==1" :disabled="scope.row.complete==2 || scope.row.complete==3" @click="edit(scope.row,1)">修改</el-button>
                        <el-button size="mini" type="primary" v-if="scope.row.status==1" @click="edit(scope.row,3)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <!-- <div class="cha-pagination">
                <el-pagination
                        class="cha-page"
                        background
                        @current-change="handleCurrentChange"
                        :current-page.sync="page"
                        :page-size="pagesize"
                        layout="prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div> -->
        </div>

    </div>
</template>

<script>
import network from '@@/api/jxapi'
export default {
    data(){
        return{
            pagesize: 15,
            page: 1,
            total: 1,
            searchName:'',
            tableData:[]
        }
    },
    created(){
        this.getLists()
    },
    methods:{
        handleCurrentChange(){

        },
        edit(row, type){
            this.$router.push({path:'/admin/cert/update',query:{
                competitionId: row.id,
                type: type,
            }})
        },
        async getLists(){
            let res = await network.getCertSetList({data:{
                competitionName: this.searchName
            }})
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
