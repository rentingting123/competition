<template>
    <div>
        <div class="top">
            <el-select v-model="competitionId" @change="getList" placeholder="请选择竞赛">
                <el-option v-for="competition in competitions" :key="competition.competitionId" 
                :label="competition.name" 
                :value="competition.competitionId"
                >
                </el-option>
            </el-select>
            <el-input placeholder="请输入内容" v-model="searchname" style="width: 300px;margin-bottom:20px;" class="input-with-select">
                <el-button @click="getList" slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>

        <el-table :data="tableData" border style="width: 100%" @filter-change="filterHandler" :filter-multiple="false" >
            <el-table-column prop="title" label="标题" min-width="180"></el-table-column>
            <el-table-column prop="status" label="状态" min-width="80" column-key="statusSearch" :filter-multiple="false"  :filters="statuslist" >
               <template slot-scope="scope" >
                    <div >
                        <span v-if="scope.row.status==1">未查看</span>
                        <span v-if="scope.row.status==2">已暂存</span>
                        <span v-if="scope.row.status==3">已采纳</span>
                        <span v-if="scope.row.status==4">已拒绝</span>
                    </div>
               </template>
            </el-table-column>
            <el-table-column prop="type" label="投稿类型" min-width="120" column-key="typeSearch" :filter-multiple="false"  :filters="typelist" >
            </el-table-column>
            <el-table-column prop="contributor" label="投稿人" min-width="80"></el-table-column>
            <el-table-column prop="phone" label="联系电话" min-width="120"></el-table-column>
            <el-table-column prop="email" label="邮箱" min-width="120"></el-table-column>
            <el-table-column prop="school" label="所属高校" min-width="180"></el-table-column>
            <el-table-column prop="createTime" label="投稿日期" min-width="100">
                <template slot-scope="scope">
                    {{ scope.row.createTime | date }}
                </template>
            </el-table-column>
            <el-table-column prop="file" label="投稿文件" min-width="100">
                <template slot-scope="scope">
                    <a :href="scope.row.file.fileUrl" style="color:blue;" @click="updateContribute(scope.row,2)" target="_blank">{{scope.row.file.name}}</a>
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="100">
                <template slot-scope="scope"> 
                    <i class="iconfont" @click="operate(scope.row,3)" v-if="scope.row.status==1||scope.row.status==2" title="采纳">&#xe67b;</i>
                    <i class="iconfont" @click="operate(scope.row,4)" v-if="scope.row.status==1||scope.row.status==2" title="丢弃">&#xe635;</i>
                </template>
            </el-table-column>
        </el-table>

        <div style="text-align:center;margin-top:20px;">
            <el-pagination background @current-change="getList" :current-page.sync="pageNum" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
            </el-pagination>
        </div>

        <!-- 查看详情 -->
        <detail v-if="showdetail" :close="close" :message="message"/>

    </div>
</template>

<script>
import moment from 'moment'
import network from '@@/api/jxapi'
import detail from './detailss'
export default {
    components:{
        detail
    },
    async created(){
        let res = await network.getCompetitionss();
        if(res=='error') return;
        this.competitions = res || []
    },
    data(){
        return{
            competitions: [],
            searchname: '',
            statusSearch: null,
            typeSearch: null,
            tableData:[],
            statuslist: [
                {text: '未查看', value: '1'},
                {text: '已暂存', value: '2'},
                {text: '已采纳', value: '3'},
                {text: '已拒绝', value: '4'}
            ],
            typelist:[
                {text:'心路历程',value:'心路历程'},
                {text:'科教协同',value:'科教协同'},
                {text:'研究论文',value:'研究论文'},
                {text:'总结交流',value:'总结交流'},
                {text:'媒体社评',value:'媒体社评'},
                {text:'竞赛简讯',value:'竞赛简讯'},
            ],
            showdetail: false,
            competitionId: '',
            pageNum: 1,
            pageSize: 10,
            total: 0,
            message:{},
        }
    },
    methods:{
        async getList(){
            localStorage.setItem('competitionId', this.competitionId)
            let res = await network.queryContribute({data:{
                competitionId: this.competitionId,
                pageNum: this.pageNum,
                pageSize: this.pageSize,
                search: this.searchname,
                statusSearch: this.statusSearch,
                typeSearch: this.typeSearch
            }});
            if(res=='error') return;
            this.total = res.total;
            this.tableData = res.list;
        },
        async updateContribute(row,status){
            if(row.status==3 || row.status==4) return;
            if(status==2 && row.status!=1) return;
            let res = await network.updateContribute({data:{
                id: row.id,
                status: status,
            }});
            if(res=='error') return false;
        },
        filterHandler(filters){
            if(filters.statusSearch && filters.statusSearch.length>0){
                this.statusSearch = filters.statusSearch[0]
            }else{
                this.statusSearch = null;
            }

            if(filters.typeSearch && filters.typeSearch.length>0){
                this.typeSearch = filters.typeSearch[0]
            }else{
                this.typeSearch = null;
            }
            this.getList()
        },
        async operate(row,status){
            await this.updateContribute(row, status);
            this.getList();
        },
        close(){
            this.message = {}
            this.showdetail = false;
        }
    },
    filters:{
        date(val){
            if(!val) return;
            return moment(val).format('YYYY-MM-DD');
        }
    }
}
</script>

<style lang="less" scoped>
i{
    cursor: pointer;
    font-size: 20px;
}
</style>