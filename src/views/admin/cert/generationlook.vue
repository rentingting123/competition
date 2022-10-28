<template>
    <div style="background:#fff;">
         <div class="search">
            <!--<el-input  placeholder="搜索竞赛" @keyup.enter.native="getLists"  v-model="searchName">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>-->
        </div> 
        <div class="listmain">
            <el-table :data="tableData" border style="width: 90%;margin:0 auto;">
                <el-table-column  type="selection" align="center" min-width="55"> </el-table-column>
                <el-table-column  prop="competitionName" label="竞赛" align="center" min-width="180"></el-table-column>
                <el-table-column  prop="groupName" label="团队" align="center" min-width="80"></el-table-column>
                <el-table-column  prop="awardCode" label="证书编号" align="center" min-width="80"></el-table-column>
                <el-table-column  label="操作" min-width="220" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="toread(scope.row)" type="primary" >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="cha-pagination">
                <el-pagination
                        class="cha-page"
                        background
                        @current-change="handleCurrentChange"
                        :current-page.sync="page"
                        :page-size="pagesize"
                        layout="prev, pager, next, jumper"
                        :total="total">
                </el-pagination>
            </div>
        </div>

        <el-dialog title="查看证书" :visible.sync="showimg" :append-to-body="true" >
            <img :src="imgsrc" width="100%">
        </el-dialog>

    </div>
</template>

<script>
import network from '@@/api/jxapi'
export default {
    data(){
        return{
            competitionId:'',
            pagesize: 15,
            page: 1,
            total: 1,
            searchName:'',
            tableData:[],
            imgsrc:'',
            showimg: false,

        }
    },
    created(){
        this.competitionId = this.$route.query.competitionId;
        this.getLists()
    },
    methods:{
        handleCurrentChange(){
            this.getLists()
        },
        async getLists(){
            let res =  await network.getCertGenerationlook({data:{
                competitionId: this.competitionId,
                pageNum: this.page,
                pageSize: this.pagesize
            }})
            if(res=='error' || !res) return;
            this.total = res.total
            this.tableData = res.pageData
        },
        toread(row){
            this.imgsrc = row.fileUrl;
            this.showimg = true
        }
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
