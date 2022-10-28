<template>
    <div class="selectExpert">
        <el-button type="primary" size="mini" @click="toShow" class="button">查看专家</el-button>
        
        <el-dialog title="查看专家" :visible.sync="show" :close-on-click-modal="false" :modal-append-to-body="false" width="60%">
            
            <el-table :header-cell-style="{background:'#f3f3f3'}" v-loading="loading" :data="tableData" border>
                <el-table-column label="专家姓名" prop="idcardName"></el-table-column>
                <el-table-column label="手机号" prop="contactPhone" ></el-table-column>
                <el-table-column label="学校" prop="belongSchool" >
                    <template slot-scope="scope">
                        {{scope.row.belongSchool || scope.row.school}}
                    </template>
                </el-table-column>
                <el-table-column label="院系" prop="academy" ></el-table-column>
                <el-table-column label="专业" prop="major" ></el-table-column>
                <el-table-column label="企业" prop="companyName" ></el-table-column>
                <el-table-column label="职称" prop="jobTitle" ></el-table-column>
                <el-table-column label="导入年份" prop="importYear" ></el-table-column>
                <el-table-column label="备注" prop="remark" ></el-table-column>
            </el-table>

            <el-pagination
                background
                hide-on-single-page
                class="pagination"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :current-page.sync="pageNum"
                :total="total"
                @current-change="getLists"
            ></el-pagination>

            
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="download" :loading='downLoading'>导出专家信息</el-button>
                <el-button @click="show = false" :loading='downLoading'>取消</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import network from '@@/api/jxapi'
export default {
    data(){
        return{
            show: false,
            tableData: [],
            loading: false,
            downLoading: false,
            pageNum: 1,
            pageSize: 10,
            total: 0
        }
    },
    created(){
        
    },
    methods:{
        toShow(){
            this.pageNum = 1
            this.show = true
            this.tableData = []
            this.getLists()
        },
        async getLists(){
            this.loading = true
            let res = await network.selectUser({data:{
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                search: ''
            }});
            this.loading = false
            if(res=='error') return;
            this.total = res && res.total || 0
            this.tableData = res && res.list || []
        },
        async download(){
            this.downLoading = true
            let res = await network.exportSpecialist({config: {
                responseType: "arraybuffer",
            }})
            this.downLoading = false
            if(res=='error') return;
        }
    }
}
</script>

<style lang='less' scoped>
.selectExpert{
    display: inline-block;
    vertical-align: top;
    margin-left: 10px;
    .pagination{
        text-align: center;
        margin-top: 20px;
    }
    /deep/.el-dialog__header {
       border-bottom: 1px solid #eee;
    }
    /deep/.el-dialog__footer{
        border-top: 1px solid #eee;
    }
}
</style>