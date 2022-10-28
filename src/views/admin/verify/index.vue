<template>
    <div class="verify">
        <div class="search">

            <el-select v-model="year" placeholder="请选择" @change="getLists">
                <el-option v-for="item in yearList" :key="item" :label="item" :value="item"></el-option>
            </el-select>

            <el-input  placeholder="搜索学校" @keyup.enter.native="getLists" style="width: 200px" v-model="school">
                <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>

        </div>
        <div class="listmain">
            <el-table :data="tableData" border style="width: 100%;margin:0 auto 20px;" @filter-change='filterChange'>
                <el-table-column  type="index" label="#" align="center" min-width="55"> </el-table-column>
                <el-table-column  prop="school" label="学校名称" min-width="120"></el-table-column>
                <el-table-column  prop="academy" label="院系" min-width="100"></el-table-column>
                <el-table-column  prop="schoolCompetitionName" label="竞赛名称" min-width="120"></el-table-column>
                <el-table-column  prop="fromUserName" label="申请人" min-width="60"></el-table-column>
                <el-table-column  prop="phone" label="手机号" min-width="90"></el-table-column>
                <el-table-column  prop="status" label="审核状态"
                    :filters="statusList" :filter-multiple='false' min-width="80">
                    <template slot-scope="scope">
                        <!-- status   0：待审核 1：审核通过 2：审核未通过 -->
                        <span v-if="scope.row.status==0">待审核</span>
                        <span v-else-if="scope.row.status==1">审核通过</span>
                        <span v-else-if="scope.row.status==2">审核未通过</span>
                    </template>
                </el-table-column>
                <el-table-column  prop="materialExcels" label="身份证明材料" min-width="80">
                    <template slot-scope="scope">
                        <div v-for="(list,index) in scope.row.materialExcels" :key="index">
                            <a style="color: -webkit-link;" target="_blank" :href="list.location">{{list.name}}</a>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column  prop="loginName" label="账户名称" :render-header="accountHeader" min-width="80"></el-table-column>
                <el-table-column  prop="operate" label="操作" :render-header="operateHeader" min-width="100">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="pass(scope.row,scope.$index)" v-loading='scope.row.loading' :disabled="scope.row.status!=0">通过</el-button>
                        <el-button type="danger" size="small" @click="open(scope.row,scope.$index)" v-loading='scope.row.loading' :disabled="scope.row.status!=0">反馈</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <el-pagination
                background
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :current-page.sync="pageCurrent"
                :total="total"
                @current-change="currentPage"
            ></el-pagination>

        </div>
    </div>
</template>

<script>
import network from '@@/api/jxapi'
import { mapState } from 'vuex'
export default {
    data(){
        return{
            year: '',
            yearList: [],
            school: '',
            tableData: [],
            status: '',
            pageSize: 20,
            pageCurrent: 1,
            total: 0,
            statusList: [
                // {text: '全部', value: '4'},
                {text: '待审核', value: '0'},
                {text: '已通过', value: '1'},
                {text: '已拒绝', value: '2'},
            ],
        }
    },
    computed:{
        ...mapState({
            authority:state => state.authorityManagement,
        })
    },
    created(){
        if(!this.authority.managePlatform){
            this.$message.error('无权限访问该页面')
            location.href = location.origin;
        }
        this.getYear()
    },
    methods:{
        pass(row,index){
            let data = {
                id: row.id,
                opinion: '',
                status: 1
            }
            this.updateApplyFor(data,index)
        },
        // 页码改变
        currentPage(e) {
            this.pageCurrent = e;
            this.getLists();
        },
        async updateApplyFor(data,index){
            // status  1：审核通过 2：审核未通过
            this.$set(this.tableData[index],'loading',true)
            let res = await network.updateApplyFor({data:data})
            this.$set(this.tableData[index],'loading',false)
            if(res=='error') return;
            this.getLists();
        },
        open(row,index){
            this.$prompt('反馈意见', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(({ value }) => {
                let data = {
                    id: row.id,
                    opinion: value,
                    status: 2
                }
                this.updateApplyFor(data,index)
            })
        },
        filterChange(name){
            this.status = name['el-table_1_column_6'][0] || '';
            this.getLists()
        },
        accountHeader(h, param){
            return(
                h('el-tooltip',[
                    h('div',{
                        slot: 'content'
                    },'默认密码为帐号名称后六位，比如js002938,密码为002938。审核通过后将会将账户名及密码发送给申请人'),
                    h('span',[
                        h('span','账户名称'),
                        h('i',{
                            class: 'el-icon-warning'
                        },'')
                    ])
                ])
            )
        },
        operateHeader(h, param){
            return(
                h('el-tooltip',[
                    h('div',{
                        slot: 'content'
                    },'审核结果将以短信形式发送给申请人'),
                    h('span',[
                        h('span','操作'),
                        h('i',{
                            class: 'el-icon-warning'
                        },'')
                    ])
                ])
            )
        },
        async getYear(){
            this.year = ''
            let res = await network.getCompetitionYears()
            if(res=='error') return;
            if(!res) return this.$message.warning('未查询到竞赛年份，请核查');
            this.yearList = res;
            this.year = res[0];
            this.getLists()
        },
        async getLists(){
            if(!this.year) return this.$message.warning('请先选择年份');
            let params = {
                pageNum: this.pageCurrent || 1,
                pageSize: this.pageSize,
                year: this.year
            }
            if(this.school){
                params.school = this.school
            }
            if(this.status===0 || this.status){
                params.status = this.status
            }
            let res = await network.selectSchoolCompetitionAudit({data:params});
            if(res=='error' || !res) return;
            this.tableData = res && res.list;
            this.total = res && res.total || 0;
        }
    }
}
</script>

<style lang='less' scoped>
    .verify{
        background: #ffffff;
        box-shadow:0px 1px 2px 0px rgba(210,207,207,0.5);
        padding: 27px 21px;
        .search{
            text-align: left;
            margin-bottom: 44px;
            .el-select{
                margin-right: 20px;
            }
        }

    }
</style>
